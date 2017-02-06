import Command from './command.js'

export default class Slide{
  constructor(onPlay){ //Where onPlay and onTransition are arrays of commands.
    this.commands = onPlay;
  }
  add(type){
    this.commands.push(new Command(type, this.getDefaultParams(type)));
  }
  play(mathbox = window.mathbox){
    let present = mathbox.select("present");
    let slide = present.slide().reveal({
      duration : 2
    }).end().end().slide()
  	for(let index in this.commands){
  		this.commands[index].execute(slide);
  	}
  }
  getDefaultParams(type){
    switch(type){
      case "line":
        return {
          width: 50,
          color: "red"
        }
      case "grid":
        return {
          axes: [1, 2],
          width: 2,
          color: "black",
          depth: .5
        }
    }
  }
}
