export default class SlidePanels {
  constructor(el) {
    this.el = el
    this.init()
    this.bindEvents()
  }

  init() {
    this.hero   = document.getElementById('hero')
    this.panels = [].slice.call(this.el.getElementsByClassName('panel'))
    this.map    = {}
    this.currId
    this.activeClass = '-active'

    this.backLink = document.getElementById('back-link')
    this.navLinks = [].slice.call(document.getElementsByClassName('nav__link'))
  }

  bindEvents() {
    this.backLink.addEventListener('click', this.reset)
    this.navLinks.forEach((link, i) => link.addEventListener('click', () => this.changeSection(i)))

    this.panels.forEach((panel, i) => {
      this.map[i] = panel
      panel.addEventListener('click', () => this.onClick(i))
    })
  }

  onClick(newId) {
    if (this.exists(newId) && newId !== this.currId) {
      this.movePanels(newId)

      this.map[newId].classList.add(this.activeClass)
      this.hero.classList.add(this.activeClass)
      this.currId = newId
    }
  }

  movePanels(newId) {
    for (var i in this.map) {
      let direction = parseInt(i) === newId ? 'active' : (i < newId ? 'up' : 'down')

      this.map[i].style.setProperty('animation', `var(--slide-${direction})`)
    }
  }

  reset = () => {
    if (this.exists(this.currId)) {
      for (var i in this.map) {
        this.map[i].style.removeProperty('animation')
      }

      this.map[this.currId].classList.remove(this.activeClass)
      this.hero.classList.remove(this.activeClass)
      this.currId = -1
    }
  }

  changeSection(newId) {
    if (this.currId > newId) {
      for (let i = this.currId; i > newId; i--) {
        this.map[i].style.setProperty('animation', 'var(--slide-down)')
      }
    }

    // remove active class off current
    this.map[this.currId].classList.remove(this.activeClass)

    // set new active
    this.map[newId].style.setProperty('animation', 'var(--slide-active)')
    this.map[newId].classList.add(this.activeClass)
    this.currId = newId
  }

  exists(id) {
    return id >= 0
  }
}
