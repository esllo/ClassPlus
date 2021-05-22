(() => {
  function checkCourseMos() {
    return [...document.getElementsByTagName('script')].map(e => e.src).some(e => e.indexOf('coursemos') != -1)
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

  function init() {
    if (checkCourseMos()) {
      chrome.storage.sync.get("data", (data) => {
        data = data.data
        if (data.video_us) {
          insertJS(chrome.runtime.getURL('js/video_us.js'))
        }
      })
    }
  }

  init()
})()