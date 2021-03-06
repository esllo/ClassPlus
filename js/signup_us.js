(() => {
  const PROTOCOL = location.protocol
  const HOST = location.host
  const BASE_URL = `${PROTOCOL}//${HOST}/report/ubcompletion/user_progress.php`

  function timeToDecimal(time) {
    if (time.indexOf(':') === -1) return (Number(time) || 0)
    const splitted = time.split(':')
    return splitted.reduce((previous, current) => {
      return previous * 60 + (Number(current) || 0)
    }, 0)
  }

  function checkLangKor(){
    return document.querySelector('.user-info-shortcut > li > a').textContent === '파일 관리'
  }

  function insertSignupLabel(parent, id) {
    const numId = id.split('=')[1]
    const elementId = `cp-signup-${numId}`
    const before = document.getElementById(elementId)
    if (before) {
      parent.removeChild(before)
    }
    return fetch(`${BASE_URL}${id}`).then(e => e.text()).then(text => {
      let textValue = checkLangKor() ? '미수강 영상 : ' : 'Not Watched : '
      let isAccent = false
      if (text.indexOf('요구시간') !== -1 || text.indexOf('Required</th>') !== -1) {
        let divider = '요구시간'
        if(text.indexOf('Required</th>')!==-1){
          divider = 'Required</th>'
        }
        const splitted = text.split(divider)[1].split('<tbody>')[1]

        let body = splitted.split('</tbody>')[0]
        const trs = body.split('<tr>')
        let notSignedUp = 0
        trs.forEach(tr => {
          const tds = tr.split(/\<td[^\>]*\>/)
          if (tds.length > 1) {
            const ln = tds.length
            const requestText = ((tds[ln - 2] || '').match(/[0-9:]{0,10}/) || ['0'])[0]
            const watchedText = ((tds[ln - 1] || '').match(/[0-9:]{0,10}/) || ['0'])[0]
            const requestTime = timeToDecimal(requestText)
            const watchedTime = timeToDecimal(watchedText)
            if (requestTime > watchedTime) notSignedUp++
            console.log(requestText, watchedText)
          }
        })
        textValue += notSignedUp
        isAccent = notSignedUp > 0
      } else {
        textValue += '-'
      }
      const p = document.createElement('p')
      p.className = `cp-signup-label`
      if (isAccent) {
        p.classList.add('accent')
      }
      p.textContent = textValue
      const prof = parent.querySelector('.prof')
      const left = prof.offsetLeft + 116
      p.style.left = `${left}px`
      return [parent, p]
    })
  }

  function applySignups() {
    const courses = [...document.querySelectorAll('.course_box > a')]
    // Promise.allSettled(courses.map(({ parentElement, href }) => {
    //   const match = href.match(/\?id=[0-9]{1,7}/g)
    //   if (match) {
    //     const [id] = match
    //     return insertSignupLabel(parentElement, id)
    //   }
    // })).then((res) => res.forEach(({ value: [parent, p] }) => parent && parent.appendChild(p)))
    courses.forEach(({ parentElement, href }) => {
      const match = href.match(/\?id=[0-9]{1,7}/g)
      if (match) {
        const [id] = match
        insertSignupLabel(parentElement, id).then(([parent, p]) => {
          if (parent) {
            parent.appendChild(p)
          }
        })
      }
    })
  }

  if ((location.pathname || " ").substr(1).indexOf("/") === -1) {
    applySignups()
    console.log("Signup Plugin!")
  }
})()