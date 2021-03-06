export default class Command{
	constructor(type, parameters, id = 0){
		this.type = type;
		this.parameters = parameters;
		this.id = id;
		if(this.type == "interval"){
			if(this.parameters.expr){ //Parse functions as acutal functions, not just strings
				this.parameters.items = this.parameters.expr.length;
				let withEmitCall = [];
				for(let index in this.parameters.expr){
					withEmitCall.push("emit(" + this.parameters.expr[index] + ")");
				}
				const combinedStr = withEmitCall.join(";\n");
				this.parameters.expr = new Function("emit", "x", "i", "t", combinedStr);
			}
		}

	}
	execute(mathbox){
		let toAdd = (this.id == 0)? mathbox : mathbox.select("#" + this.id);
		let added = toAdd[this.type](this.parameters);
	}
}