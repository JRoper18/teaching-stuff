export default class Slide{
  constructor(onPlay){ //Where onPlay and onTransition are arrays of commands.
    this.commands = onPlay;
  }
  play(mathbox){
    let present = mathbox.select("present");
    let slide = present.slide().reveal({
      duration : 2
    }).end().slide().reveal()
  	for(let index in this.commands){
  		this.commands[index].execute(slide);
  	}
  }
}
