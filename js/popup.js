(() => {
  let _data = {
    table_us: true,
    video_us: false,
  }
  let _disabled = {
    table_us: false,
    video_us: true,
  }
  const table_us = document.getElementById('table_us')
  const video_us = document.getElementById('video_us')
  table_us.disabled = _disabled.table_us
  video_us.disabled = _disabled.video_us

  function setData(data) {
    chrome.storage.sync.set({ data })
  }

  function getData() {
    chrome.storage.sync.get("data", (data) => {
      _data = data.data
      _disabled.table_us && (table_us.checked = _data.table_us)
      _disabled.video_us && (video_us.checked = _data.video_us)
    })
  }

  table_us.onclick = (e) => {
    if (_disabled.table_us) return
    _data.table_us = e.target.checked
    setData(_data)
  }
  video_us.onclick = (e) => {
    if (_disabled.video_us) return
    console.log('work on')
    _data.video_us = e.target.checked
    setData(_data)
  }

  getData()
})()