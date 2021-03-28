chrome.runtime.onInstalled.addListener((details) => {
  switch (details.reason) {
    case "install":
      const data = {
        table_us: true,
        video_us: false,
        short_us: true,
        report_us: true,
        signup_us: true,
      }
      chrome.storage.sync.set({ data })
      break
    case "update":
      break
  }
})

const TAG_API = 'https://api.github.com/repos/esllo/classplus/tags'
function checkUpdate() {
  fetch(TAG_API).then(res => res.json()).then(json => {
    console.log(json)
  })
}