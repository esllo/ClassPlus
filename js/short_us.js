(() => {
  if ((location.pathname || ' ').substr(1).indexOf('/') === -1) {
    const PROTOCOL = location.protocol
    const HOST = location.host
    const BASE_URL = `${PROTOCOL}//${HOST}/`
    const SHORTCUTS = {
      '과제': 'mod/assign/',
      '파일': 'mod/ubfile/',
      '동영상': 'mod/vod/',
      '퀴즈': 'mod/quiz/'
    }

    function insertShortcutButton(parent, id) {
      const numId = id.split('=')[1]
      const elementId = `cp-short-${numId}`
      const before = document.getElementById(elementId)
      if (before) {
        parent.removeChild(before)
      }
      const buttonGroup = document.createElement('div')
      buttonGroup.id = elementId
      buttonGroup.className = 'cp-short-group'
      Object.entries(SHORTCUTS).forEach(([key, value]) => {
        const button = document.createElement('button')
        button.textContent = key
        button.onclick = () => location.href = `${BASE_URL}${value}${id}`
        buttonGroup.appendChild(button)
      })
      parent.appendChild(buttonGroup)
    }

    function applyShortcuts() {
      [...document.querySelectorAll('.course_box > a')].forEach(({ parentElement, href }) => {
        const match = href.match(/\?id=[0-9]{1,7}/g)
        if (match) {
          const [id] = match
          insertShortcutButton(parentElement, id)
        }
      })
    }

    applyShortcuts()
    console.log('Short Plugin!')
  }
})()