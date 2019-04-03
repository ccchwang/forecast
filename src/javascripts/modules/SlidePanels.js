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
    this.backLink.addEventListener('click', this.onClickBack)
    this.navLinks.forEach((link, i) => link.addEventListener('click', () => this.onClickNav(i)))

    this.panels.forEach((panel, i) => {
      this.map[i] = panel
      panel.addEventListener('click', () => this.onClick(i))
    })
  }

  /***********************
   * Click Handlers
   ***********************/
  
   onClick(newId) {
    if (this.exists(newId) && newId !== this.currId) {
      requestAnimationFrame(() => this.open(newId))
    }
  }
  
  onClickBack = () => {
    if (this.exists(this.currId)) {
      requestAnimationFrame(this.reset)
    }
  }
  
  onClickNav(newId) {
    if (newId !== this.currId) {
      requestAnimationFrame(() => this.change(newId))
    }
  }
  
  /***********************
   * Core Functionality
   ***********************/
  
  open (newId) {
    this.movePanels(newId)

    this.map[newId].classList.add(this.activeClass)
    this.body.classList.add('active', `active-${newId}`)
    this.currId = newId
  }
  
  reset = () => {
    if (this.isSafari) {
      this.map[this.currId].scrollTo({ top: 0 })

      for (var i in this.map) {
        this.map[i].classList.remove('-hide-safari')
      }
    }
    else {
      this.map[this.currId].style.removeProperty('animation')
    }

    this.map[this.currId].classList.remove(this.activeClass)
    this.body.classList = ""
    this.currId = -1
  }

  change(newId) {
    // update body
    this.body.classList.remove(`active-${this.currId}`)
    this.body.classList.add(`active-${newId}`)

    // set new active
    if (this.isSafari) {
      this.map[this.currId].classList.add('-hide-safari')
      this.map[this.currId].classList.remove(this.activeClass)
      
      this.map[newId].classList.remove('-hide-safari')
      this.map[newId].classList.add(this.activeClass)
      
      this.currId = newId
    }
    else {
      this.map[this.currId].style.setProperty('animation', 'var(--hide)')
      this.map[newId].style.setProperty('animation', 'var(--slide-opened)')
      this.map[newId].classList.add(this.activeClass)
    
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.map[this.currId].classList.remove(this.activeClass)
          this.map[this.currId].style.removeProperty('animation')
          this.currId = newId
        })
      }, 600)
    }
  }
  
  /***********************
   * Helper Functions
   ***********************/
  
   movePanels(newId) {
    window.scrollTo({ top: 0 })
    
    if (this.isSafari) {
      for (var i in this.map) {
        if (parseInt(i) !== newId) {
          this.map[i].classList.add('-hide-safari')
        }
      }
    }
    else { 
      this.map[newId].style.setProperty('animation', 'var(--slide)')
    }
  }

  exists(id) {
    return id >= 0
  }
}
