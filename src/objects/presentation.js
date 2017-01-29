class Presentation{
  constructor(selector, slides){ //Where selector is the html element to act on and slides in an array of slide objects
    this.selector = selector;
    this.slides = slides;
    this.index = 0;
    this.element = document.querySelector(this.selector);
    startPresentation();
  }
  startPresentation(){
    this.element.innerHTML = this.getSlide();
  }
  getSlide(){
    return this.slides[this.index] ;
  }
  next(){
    this.slides[index].transition();
    this.index++;
    this.element.innerHTML = this.getSlide();
  }
  previous(){

  }

}
