import CheckSafari from '../utils/CheckSafari'

export default class SlidePanels {
  constructor(el) {
    this.el = el
    this.init()
    this.bindEvents()
  }

  init() {
    this.isSafari = CheckSafari()
    this.panels   = [].slice.call(this.el.getElementsByClassName('panel'))
    this.map      = {}
    this.currId
    this.activeClass = '-active'

    this.body     = document.body
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
      this.body.classList.add('active', `active-${newId}`)
      this.currId = newId
    }
  }

  movePanels(newId) {
    if (this.isSafari) {
      window.scrollTo({ top: 0 })
      this.body.style.setProperty('overflow', 'hidden')

      for (var i in this.map) {
        if (parseInt(i) !== newId) {
          this.map[i].style.setProperty('opacity', '0')
        }
      }
    }
    else {
      for (var i in this.map) {
        let direction = parseInt(i) === newId ? 'active' : (i < newId ? 'up' : 'down')

        this.map[i].style.setProperty('animation', `var(--slide-${direction})`)
      }
    }
  }

  reset = () => {
    if (this.exists(this.currId)) {
      let propToRemove = 'animation'

      if (this.isSafari) {
        this.map[this.currId].scrollTo({ top: 0 })
        this.body.style.removeProperty('overflow')
        propToRemove = 'opacity'
      }

      for (var i in this.map) {
        this.map[i].style.removeProperty(propToRemove)
      }

      this.map[this.currId].classList.remove(this.activeClass)
      this.body.classList.remove('active', `active-${this.currId}`)
      this.currId = -1
    }
  }

  changeSection(newId) {
    // update body
    this.body.classList.remove(`active-${this.currId}`)
    this.body.classList.add(`active-${newId}`)

    // set new active
    if (this.isSafari) {
      this.map[this.currId].style.setProperty('opacity', '0')
      this.map[newId].style.removeProperty('opacity')
    }
    else {
      if (this.currId > newId) {
        for (let i = this.currId; i > newId; i--) {
          this.map[i].style.setProperty('animation', 'var(--slide-down)')
        }
      }

      this.map[newId].style.setProperty('animation', 'var(--slide-active)')
    }

    this.map[this.currId].classList.remove(this.activeClass)
    this.map[newId].classList.add(this.activeClass)
    this.currId = newId
  }

  exists(id) {
    return id >= 0
  }
}
