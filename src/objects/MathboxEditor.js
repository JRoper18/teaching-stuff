export default class MathboxEditor{
	constructor(mathbox, element){
		this.mathbox = mathbox;
		this.element = element;
		this.json = this.getJSON();
	}
	addElement(type, data){
		this.mathbox[type](data);
	}
	refreshMathbox(){
		//First, we generate a list of addElement commands from our json.
		let commands = []
		//You want to add the elements in order. Do that with their IDs	
		
	}
	searchJSON(json = this.json.root, id = 0){ //Searches a json element for something with id: id
		//Check this element
		if(json["@attributes"] === undefined){
			return null;
		}
		if(json["@attributes"].id == id){
			return json;
		}
		//Check children
		for (let child in json) {
			if (json.hasOwnProperty(child) && (child != "#text" || child != "@attributes")) {
				if(json[child].constructor === Array ){ //This is for when we have multiple of the same type of object when parsing xml, and it's bundled
					for(let subChild in json[child]){
						if (json[child].hasOwnProperty(subChild) && (subChild != "#text" || subChild != "@attributes")) {
							const possible = this.searchJSON(json[child][subChild], id);
							if(possible != null){
								return possible;
							}
						}
					}
				}
				else{
					const possible = this.searchJSON(json[child], id);
					if(possible != null){
						return possible;
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
		//Now go through and fix any function brackets that were replaced with ""
		let matchPositions = []
		const regex = /function/g
		let match = regex.exec(stringToParse);
		while (match != null) {
			matchPositions.push(match.index);
			match = regex.exec(stringToParse);
		}
		const unFunctioned = stringToParse;
		for(let index in matchPositions){
			//Replace the first " with a {
			let temp = unFunctioned.substr(matchPositions[index], stringToParse.length);
			let badQuoteIndex = matchPositions[index] + temp.indexOf('"');
			stringToParse = stringToParse.substr(0, badQuoteIndex) + "{" + stringToParse.substr(badQuoteIndex+1, stringToParse.length);
			//Replace the next " with a } : assume we have no strings in our function
			temp = unFunctioned.substr(badQuoteIndex + 1, unFunctioned.length);
			badQuoteIndex = badQuoteIndex + temp.indexOf('"') + 1;
			stringToParse = stringToParse.substr(0, badQuoteIndex) + "}" + stringToParse.substr(badQuoteIndex+1, stringToParse.length);
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