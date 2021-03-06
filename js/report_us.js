(() => {
  const PROTOCOL = location.protocol
  const HOST = location.host
  const BASE_URL = `${PROTOCOL}//${HOST}/mod/assign/`

  function checkLangKor(){
    return document.querySelector('.user-info-shortcut > li > a').textContent === '파일 관리'
  }

  function insertReportLabel(parent, id) {
    const numId = id.split('=')[1]
    const elementId = `cp-report-${numId}`
    const before = document.getElementById(elementId)
    if (before) {
      parent.removeChild(before)
    }
    return fetch(`${BASE_URL}${id}`).then(e => e.text()).then(text => {
      const tbody = text.split('tbody')
      let textValue = checkLangKor() ? '미제출 과제 : ' : 'Assignments : '
      let isAccent = false
      if (tbody.length === 3) {
        const [, html] = tbody
        const inProgress = (html.match(/\>(미제출|No\ssubmission)\</g) || []).length
        textValue += inProgress
        isAccent = inProgress > 0
      } else {
        textValue += `-`
      }
      const p = document.createElement('p')
      p.className = `cp-report-label`
      if (isAccent) {
        p.classList.add('accent')
      }
      p.textContent = textValue
      const prof = parent.querySelector('.prof')
      const left = prof.offsetLeft
      p.style.left = `${left}px`
      return [parent, p]
    })
  }

  function applyReports() {
    const courses = [...document.querySelectorAll('.course_box > a')]
    // Async Load All
    // Promise.allSettled(courses.map(({ parentElement, href }) => {
    //   const match = href.match(/\?id=[0-9]{1,7}/g)
    //   if (match) {
    //     const [id] = match
    //     return insertReportLabel(parentElement, id)
    //   }
    // })).then((res) => res.forEach(({ value: [parent, p] }) => parent && parent.appendChild(p))).finally(() => {
    //   ClassPlus?.hideLoading()
    // })
    courses.forEach(({ parentElement, href }) => {
      const match = href.match(/\?id=[0-9]{1,7}/g)
      if (match) {
        const [id] = match
        insertReportLabel(parentElement, id).then(([parent, p]) => {
          if (parent) {
            parent.appendChild(p)
          }
        })
      }
    })
  }

  if ((location.pathname || " ").substr(1).indexOf("/") === -1) {
    // ClassPlus?.showLoading('미제출 과제 로딩중...')
    applyReports()
    console.log('Report Plugin!')
  }
})()