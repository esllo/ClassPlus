chrome.runtime.onInstalled.addListener((details) => {
  switch (details.reason) {
    case "install":
      const data = {
        table_us: true,
        video_us: true,
      }
      chrome.storage.sync.set({ data })
      break
    case "update":
      break
  }
})