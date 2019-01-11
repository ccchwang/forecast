export default class SlidePanels {
  constructor(el) {
    this.el = el
    this.init()
    this.bindEvents()
  }

  init() {
    this.panels    = [].slice.call(this.el.getElementsByClassName('panel'));
    this.panelsMap = {}
    this.currId    = 0

    this.panels.forEach((panel, i) => this.panelsMap[i] = panel)
  }

  bindEvents() {
    this.panels.forEach(panel => panel.addEventListener('click', this.onClick))
  }

  onClick = (e) => {
    let newId = parseInt(e.target.dataset.id)

    if (newId !== this.currId) {
      newId > this.currId ? this.slideOver(newId) : this.slideBack(newId)
      this.setNewPanel(newId)
    }
  }

  slideOver(newId) {
    for (let i = this.currId; i < newId; i++) {
      this.panelsMap[i].classList.add('-slide-over')
    }
  }

  slideBack(newId) {
    for (let i = (this.currId - 1); i >= newId; i--) {
      this.panelsMap[i].classList.remove('-slide-over')
    }
  }

  setNewPanel(newId) {
    this.panelsMap[newId].classList.add('-open')
    this.panelsMap[this.currId].classList.remove('-open')
    this.currId = newId
  }
}
