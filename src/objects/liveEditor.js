import Slide from './slide.js'
import Command from './command.js'
export default class LiveEditor {
	constructor(element, mathbox){
		const schema = {
			title: "Presentation",
			type: "object",
			properties: {
				slide: {
					type: "array",
					
				}
			}
		}
		this.mathbox = mathbox;
		const options = {
			schema: schema
		}
		this.editor = new JSONEditor(element, options);
		this.editor.setValue(this.getJSON(this.mathbox.select("present").toMarkup()));
		this.lastJSON = (this.editor.getValue().present);
	}
	update(){
		//Find the differences between the last json and the new one. 
		let commands = (this.getJSONDiff(this.lastJSON, this.editor.getValue().present));
		for(let index in commands){
			commands[index].execute(this.mathbox)
		}
		this.lastJSON = this.editor.getValue().present
	}
	getJSONDiff(before, after, parentElement = null){
		let commands = []
		if(before == after){
			//Nothing! 
		}
		else if(before.constructor == Array || after.constructor == Array){
			for(let i = 0; i<Math.max(before.length, after.length); i++){
				if(after[i] === undefined){ //We must've removed something. 
					commands.push(new Command("remove", "*", parentElement["@attributes"].id));
				}
				else if(before[i] === undefined){ //Added something
					commands.push(new Command(after.constructor.name, after[i]["@attributes"], parentElement["@attributes"].id))
				}
				else{
					const newCommands = this.getJSONDiff(before[i], after[i]);
					commands = commands.concat(newCommands);
				}
			}
		}
		else if(before.constructor == Array){ //Before is an array but after isn't. Something was removed. 
			for(let i = 1; i<before.length; i++){
				commands.push(new Command("remove", before[i]["@attributes"].id));
			}
		}
		else if(after.constructor == Array){ //After is an array but before isn't. Something was added. 
			for(let i = 1; i<after.length; i++){
				commands.push(new Command(parentElement.constructor.name, after[i]["@attributes"], parentElement["@attributes"].id));
			}
		}
		else { //Neither before or after are arrays. Compare their values
			const beforeAttributes = before["@attributes"];
			const afterAttributes = after["@attributes"];
			let propertiesToChange = {};
			if(beforeAttributes !== undefined && afterAttributes != undefined){
				for(let property in afterAttributes){
					if (afterAttributes.hasOwnProperty(property) && afterAttributes[property] != beforeAttributes[property]) {
						propertiesToChange[property] = afterAttributes[property]
					}		
				}
				if(JSON.stringify(propertiesToChange) != "{}"){
					commands.push(new Command("set", propertiesToChange, beforeAttributes.id));
				}
			}
			for(let child in after){
				if(after.hasOwnProperty(child) && child != "@attributes"){
					const newCommands = this.getJSONDiff(after[child], before[child], after)
					commands = commands.concat(newCommands);
				}
			}
		}
		return commands;
	}
	searchJSON(json = this.json.root, id = 1){ //Searches a json element for something with id: id
		//Check this element
		if(json === null){
			return null;
		}
		if(json["@attributes"] === undefined){ 
			return null;
		}
		if(json["@attributes"].id == id){
			if(id == 1){
				return {
					"parent": null,
					"name" : "root",
					"obj": json
				}
			}
			return { //This is a child, so handle setting the parent from the parent. 
				"parent": null,
				"name" : null,
				"obj": json
			}
		}
		//Check children
		for (let child in json) {
			if (json.hasOwnProperty(child) && (child != "#text" && child != "@attributes")) {			
				if(json[child].constructor == Array){
					//Go through children of array, too
					for(let index in json[child]){
						let current = json[child][index];
						const possible = this.searchJSON(current, id);
						if(possible != null){
							return {
								"parent": json["@attributes"].id,
								"name": child,
								"obj" : possible.obj
							}
						}
					}
				}
				else{		
					const possible = this.searchJSON(json[child], id);
					if(possible != null){
						if(possible.name != null){
							return possible;
						}
						return {
							"parent": json["@attributes"]["id"],
							"name": child,
							"obj" : possible.obj
						}	
					}				
				}
			}
		}
		return null;
	}
	getJSON(xml){
		let stringToParse = xml;
		stringToParse = stringToParse.replace(/{/g, '"');
		stringToParse = stringToParse.replace(/}/g, '"');
		//Now go through and fix any function brackets that were replaced with "", and preset functions so that they can be built later (remove function and args)
		let matchPositions = []
		const regex = /function/g
		let match = regex.exec(stringToParse);
		while (match != null) {
			matchPositions.push(match.index);
			match = regex.exec(stringToParse);
		}
		const unFunctioned = stringToParse;
		for(let index in matchPositions){
			//Remove function, args, and extra quotes. 
			const afterFunctionDeclaration = unFunctioned.substr(matchPositions[index], stringToParse.length);
			const firstQuoteLocation = afterFunctionDeclaration.indexOf('"')
			const functionDelcaration = afterFunctionDeclaration.substr(0, firstQuoteLocation);
			const lastQuoteLocation = afterFunctionDeclaration.substr(firstQuoteLocation + 1, afterFunctionDeclaration.length).indexOf('"');
			const functionBody = afterFunctionDeclaration.substr(firstQuoteLocation + 1, lastQuoteLocation);
			const afterBody = '"' + stringToParse.substr(3 + matchPositions[index] + firstQuoteLocation + lastQuoteLocation, stringToParse.length);	
			stringToParse = stringToParse.substr(0, matchPositions[index]) + functionBody + afterBody;
		}
		//Brackets are fixed! 
		let parser = new DOMParser();
		let xmlDoc = parser.parseFromString(stringToParse, "text/xml");
		return this.xmlToJson(xmlDoc);
	}
	xmlToJson(xml) {
	
		// Create the return object
		var obj = {};

		if (xml.nodeType == 1) { // element
			// do attributes
			if (xml.attributes.length > 0) {
			obj["@attributes"] = {};
				for (var j = 0; j < xml.attributes.length; j++) {
					var attribute = xml.attributes.item(j);
					obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
				}
			}
		} else if (xml.nodeType == 3) { // text
			obj = xml.nodeValue;
		}

		// do children
		if (xml.hasChildNodes()) {
			for(var i = 0; i < xml.childNodes.length; i++) {
				var item = xml.childNodes.item(i);
				var nodeName = item.nodeName;
				if (typeof(obj[nodeName]) == "undefined") {
					obj[nodeName] = this.xmlToJson(item);
				} else {
					if (typeof(obj[nodeName].push) == "undefined") {
						var old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
					obj[nodeName].push(this.xmlToJson(item));
				}
			}
		}
		delete obj["#text"];
		return obj;
	}
	
}