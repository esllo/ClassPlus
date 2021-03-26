(() => {
  function checkCourseMos() {
    return [...document.querySelectorAll('script')].some(e => e.src.indexOf('coursemos') !== -1)
  }

  function insertJS(src) {
    const before = document.getElementById('cp-control')
    if (before) {
      document.body.removeChild(before)
    }
    const script = document.createElement('script')
    script.id = 'cp-control'
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
      console.log('cosmos detected.')

      chrome.storage.sync.get("data", (data) => {
        data = data.data
        console.log(data, data.table_us)
        if (data.table_us) {
          insertCSS(chrome.runtime.getURL('css/table_us.css'))
          insertJS(chrome.runtime.getURL('js/table_us.js'))
        }
      })
    }
  }

  init()
})()