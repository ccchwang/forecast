export default class SlidePanels {
  constructor(el) {
    this.el = el
    this.init()
    this.bindEvents()
  }

  init() {
    this.intro  = this.el.getElementsByClassName('intro')[0]
    this.panels = [].slice.call(this.el.getElementsByClassName('panel'))
    this.map    = {}
    this.currId

    this.panels.forEach((panel, i) => this.map[i] = panel)
  }

  bindEvents() {
    this.panels.forEach(panel => panel.addEventListener('click', this.onClick))
    this.intro.addEventListener('click', this.reset)
  }

  onClick = (e) => {
    let newId = parseInt(e.target.dataset.id)

    if (this.exists(newId) && newId !== this.currId) {
      this.movePanels(newId)
      this.currId = newId
      this.intro.classList.add('-active')
    }
  }

  movePanels(newId) {
    for (var i in this.map) {
      let direction = i <= newId ? '--slide-up' : '--slide-down'
      this.map[i].style.setProperty('transform', `translateY(var(${direction}))`)
    }
  }

  reset = () => {
    if (this.exists(this.currId)) {
      this.map[this.currId].scrollTo({top: 0})

      for (var i in this.map) {
        this.map[i].style.removeProperty('transform')
      }

      this.currId = -1
      this.intro.classList.remove('-active')
    }
  }

  exists(id) {
    return id >= 0
  }
}
