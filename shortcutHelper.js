(() => {
  function checkCourseMos() {
    return [...document.querySelectorAll('script')].some(e => e.src.indexOf('coursemos') !== -1)
  }

  function insertJS(src) {
    const before = document.getElementById('cp-short')
    if (before) {
      document.body.removeChild(before)
    }
    const script = document.createElement('script')
    script.id = 'cp-short'
    script.src = src
    document.body.appendChild(script)
  }

  function insertCSS(href) {
    const before = document.getElementById('cp-style')
    if (before) {
      document.head.removeChild(before)
    }
    const style = document.createElement('link')
    style.rel = 'stylesheet'
    style.href = href
    document.head.appendChild(style)
  }

  function init() {
    if (checkCourseMos()) {
      chrome.storage.sync.get("data", (data) => {
        data = data.data
        if (data.short_us) {
          insertCSS(chrome.runtime.getURL('css/short_us.css'))
          insertJS(chrome.runtime.getURL('js/short_us.js'))
        }
      })
    }
  }

  init()
})()