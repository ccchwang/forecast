import './modules'

console.log(`app.js has loaded!`)

let panels = [].slice.call(document.getElementsByClassName('panel'))

let panelsMap = {},
    currentPanel;

panels.forEach((panel, i) => {
  panelsMap[i] = panel

  if (panel.classList.contains('-open')) {
    currentPanel = panel.dataset.id
  }
})


panels.forEach(panel => {
  panel.addEventListener('click', function(e) {
    let panelId = e.target.dataset.id

    if (panelId && panelId !== currentPanel) {
      let moveLeft = panelId > currentPanel

      if (moveLeft) {
        for (let i=0; i<panelId; i++) {
          panelsMap[i].classList.add('-moved')
        }
      }
      else {
        for (let i=5; i>=panelId; i--) {
          panelsMap[i].classList.remove('-moved')
        }
      }

      panel.classList.add('-open')
      panelsMap[currentPanel].classList.remove('-open')

      currentPanel = panelId
    }
  })
})
