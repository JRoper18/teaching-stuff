import Command from './command.js'
export default class MathboxEditor{
	constructor(mathbox, element){
		this.mathbox = mathbox;
		this.element = element;
		this.json = this.getJSON();
		this.idOffset = 0;
	}
	refreshMathbox(){
		//this.mathbox.three.Loop.stop();
		//First, we generate a list of addElement commands from our json.
		let commands = []
		//You want to add the elements in order. Do that with their IDs	
		let outOfIds = false;
		let index = 1;
		while(!outOfIds){
			const objectWithId = this.searchJSON(this.json.root, index);
			if(objectWithId === null){ //Reached the last ID
				this.idOffset += index-1;
				outOfIds = true;
			}
			else{
				const type = objectWithId.name;
				let data = objectWithId.obj["@attributes"];
				commands.push(new Command(type, data, objectWithId.parent));
				index++;				
			}
		}	
		//Empty out the mathbox.
		this.mathbox = null
		window.three.uninstall();
		this.mathbox = mathBox({
			width: 10,
			element: document.getElementById("slide-display")
		});
		if (this.mathbox.fallback) throw "WebGL not supported";
		this.mathbox.set("id", "1");
		//Now for each command, apply it back onto the mathbox. 
		for(let index = 1; index<commands.length; index++){ //The first is root, skip it.
			commands[index].execute(this.mathbox, this.idOffset);
		}
		window.three.Loop.start();
		console.log(this.mathbox);		
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
	getJSON(xml = this.mathbox.toMarkup()){
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
		return obj;
	}
}