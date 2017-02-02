export default class Command{
	constructor(type, parameters, id){
		this.type = type;
		this.parameters = parameters;
		this.id = id;
		if(this.parameters.expr != null){ //Parse functions as acutal functions, not just strings
			//SHUT UP! I know it's super dangerous. But how else am I going to run user-generated code?
			//Side note: How does jsFiddle do it? Maybe I can look at their source code...
			this.parameters.expr = new Function("emit", "x", "i", "t", this.parameters.expr.trim());
			this.parameters.width = parseInt(this.parameters.width);
		}
	}
	execute(mathbox, idOffset = 0){
		const idToAddTo = (this.id == 1) ? "1" : (parseInt(this.id) + idOffset - 1).toString();
		let toAdd = mathbox.select("#" + idToAddTo);
		return toAdd[this.type](this.parameters);
	}
}