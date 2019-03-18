export default class SlidePanels {
  constructor(el) {
    this.el = el
    this.init()
    this.bindEvents()
  }

  init() {
    this.hero   = this.el.querySelector('.hero')
    this.panels = [].slice.call(this.el.getElementsByClassName('panel'))
    this.map    = {}
    this.currId

    this.panels.forEach((panel, i) => this.map[i] = panel)
  }

  bindEvents() {
    this.panels.forEach(panel => panel.addEventListener('click', this.onClick))
    this.hero.addEventListener('click', this.reset)
  }

  onClick = (e) => {
    let newId = parseInt(e.target.dataset.id)

    if (this.exists(newId) && newId !== this.currId) {
      this.movePanels(newId)

      this.map[newId].classList.add('-active')
      this.hero.classList.add('-active')
      this.currId = newId
    }
  }

  movePanels(newId) {
    for (var i in this.map) {
      let direction = i <= newId ? '-slide-up' : '-slide-down'
      this.map[i].classList.add(direction)
      this.map[i].class = direction
    }
  }

  reset = () => {
    if (this.exists(this.currId)) {
      this.map[this.currId].scrollTo({top: 0})

      for (var i in this.map) {
        this.map[i].classList.remove(this.map[i].class)
      }

      this.map[this.currId].classList.remove('-active')
      this.hero.classList.remove('-active')
      this.currId = -1
    }
  }

  exists(id) {
    return id >= 0
  }
}
