(() => {
  const _labels = ['table_us', 'video_us', 'short_us']
  let _data = {
    table_us: true,
    video_us: false,
    short_us: true,
  }
  const _disabled = {
    table_us: false,
    video_us: true,
    short_us: false,
  }
  const _us = {}

  function setData(data) {
    chrome.storage.sync.set({ data })
  }

  function getData() {
    chrome.storage.sync.get("data", (data) => {
      _data = data.data
      Object.keys(_us).forEach(label => {
        if (!_disabled[label]) {
          _us[label].checked = _data[label]
        }
      })
    })
  }

  _labels.forEach(label => {
    _us[label] = document.getElementById(label)
    _us[label].disabled = _disabled[label]
    _us[label].onclick = ({ target }) => {
      if (_disabled[label]) return
      _data[label] = target.checked
      setData(_data)
    }
  })

  getData()
})()