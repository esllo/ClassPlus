(() => {
  let _data = {
    table_us: true,
    video_us: true,
  }
  const table_us = document.getElementById('table_us')
  const video_us = document.getElementById('video_us')

  function setData(data) {
    chrome.storage.sync.set({ data })
  }

  function getData() {
    chrome.storage.sync.get("data", (data) => {
      _data = data.data
      table_us.checked = _data.table_us
      video_us.checked = _data.video_us
    })
  }

  table_us.onclick = (e) => {
    _data.table_us = e.target.checked
    setData(_data)
  }
  video_us.onclick = (e) => {
    _data.video_us = e.target.checked
    setData(_data)
  }

  getData()
})()