class Slide{
  constructor(mathbox, endTransition){ //Where transition is a callback to execute on the mathobject when slides are switched.
    this.math = mathbox;
    this.transition = endTransition;
  }
  doTransition(){
    this.transition(this.math);
  }
}
