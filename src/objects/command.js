class Command{
	constructor(type, parameters){
		this.type = type;
		this.parameters = parameters;
	}
	execute(mathbox){
		mathbox[this.type](this.parameters);
	}
}