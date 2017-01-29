export default class Slide{
  constructor(onPlay, onTransition){ //Where onPlay and onTransition are arrays of commands.
    this.play = onPlay;
    this.transition = onTransition;
  }
  play(mathbox){
  	for(command in this.play){
  		command.execute(mathbox);
  	}
  }
  transition(mathbox){
  	for(command in this.transition){
  		command.execute(mathbox);
  	}
  }
}
