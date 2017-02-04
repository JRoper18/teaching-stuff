export default class Command{
	constructor(type, parameters, id){
		this.type = type;
		this.parameters = parameters;
		this.id = id;
		if(this.parameters.expr){ //Parse functions as acutal functions, not just strings
			//SHUT UP! I know it's super dangerous. But how else am I going to run user-generated code?
			//Side note: How does jsFiddle do it? Maybe I can look at their source code...
			this.parameters.expr = new Function("emit", "x", "i", "t", this.parameters.expr);
		}
	}
	execute(mathbox, idOffset = 0){
		let toAdd = mathbox;
		let added = toAdd[this.type](this.parameters);
		if(this.type == "interval"){
			added.set("width", 64);
		}
	}
}