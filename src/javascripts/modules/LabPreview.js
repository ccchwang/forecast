export default class SlidePanels {
  constructor(el) {
    if (window.innerWidth >= 500) {
      this.el = el
      this.init()
      this.bindEvents()
    }
  }

  init() {
    this.figures = [].slice.call(this.el.getElementsByClassName('lab-figure'))
  }

  bindEvents() {
    this.figures.forEach((figure, i) => {
      var onMouseOver = function() {
        var video = document.createElement("video")
    
        video.setAttribute("src", `/preview${i}.mov`)
        video.setAttribute("class", "lab-video")
        video.setAttribute("autoplay", "true")
        video.setAttribute("loop", "true")
    
        this.appendChild(video)
        this.removeEventListener('mouseover', onMouseOver)
      }
      
      figure.addEventListener('mouseover', onMouseOver)
    })
  }
}
