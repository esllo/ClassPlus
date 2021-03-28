(() => {
  if ((location.pathname || ' ').substr(1).indexOf('/') === -1) {
    const DOM = new DOMParser()
    const ATT_COLORS = ['#029400', '#e01414', '#3a7ff0']
    const MINUS = 'https://smartlead.hallym.ac.kr/theme/image.php/coursemosv2/core/1614301062/t/switch_minus'
    const PLUS = 'https://smartlead.hallym.ac.kr/theme/image.php/coursemosv2/core/1614301062/t/switch_plus'
    const pageBlocks = document.getElementById('page-blocks')
    if (!pageBlocks) return

    function insertTableBlock() {
      const block = document.createElement('div')
      block.className = 'block block-coursemos'
      const header = document.createElement('div')
      header.className = 'header'
      const title = document.createElement('div')
      title.className = 'title'
      const action = document.createElement('div')
      action.className = 'block_action'
      const actionToggle = document.createElement('img')
      actionToggle.src = MINUS
      actionToggle.onclick = () => {
        block.classList.toggle('hidden')
        actionToggle.src = block.classList.contains('hidden') ? PLUS : MINUS
      }
      action.appendChild(actionToggle)
      title.appendChild(action)
      const titleText = document.createElement('h2')
      titleText.textContent = '온라인 강의 요약'
      title.appendChild(titleText)
      header.appendChild(title)
      block.appendChild(header)
      const content = document.createElement('div')
      content.className = 'content cp-table'
      block.appendChild(content)
      pageBlocks.insertBefore(block, pageBlocks.firstChild)
      return content
    }

    function insertCourse(text) {
      if (text === null) return
      try {
        const dom = DOM.parseFromString(text, 'text/html')
        const att = dom.querySelector('.att_count')
        if (att) {
          const title = dom.querySelector('.coursename > h1 > a').textContent
          const table = [...dom.querySelectorAll('.att_count > p')].map(({ textContent }, index) => {
            const p = document.createElement('p')
            p.textContent = textContent
            p.style.color = ATT_COLORS[index]
            return p
          })
          const row = document.createElement('div')
          row.className = 'cp-table-item'
          const rowTitle = document.createElement('h2')
          rowTitle.textContent = title
          const rowContent = document.createElement('div')
          row.appendChild(rowTitle)
          table.forEach(att => rowContent.appendChild(att))
          row.appendChild(rowContent)
          row.onclick = () => location.href = href
          content.appendChild(row)
        }
      } catch (e) {
        console.log('skip 1 class')
      }
    }

    function fetchTableInfo(content) {
      if (!DOM) {
        alert('크롬이 최신 기능을 지원하지 않습니다. 크롬을 업데이트 해주세요.')
        return
      }
      while (content.firstChild) {
        content.removeChild(content.lastChild)
      }
      const wait = document.createElement('p')
      wait.textContent = '온라인 클래스를 불러오는 중..'
      content.appendChild(wait)
      const links = [...document.querySelectorAll('.course_link')]
      // // Async Load All
      // Promise.allSettled(links.map(({ href }) => fetch(href)))
      //   .then(results => Promise.all(results.map(({ value }) => value ? value.text() : null)).then(texts => {
      //     texts.forEach(insertCourse)
      //     if (content.children.length !== 1) {
      //       content.removeChild(wait)
      //     } else {
      //       wait.textContent = '온라인 클래스가 없습니다.'
      //     }
      //   }))
      links.forEach(({ href }) => fetch(href).then(res => res.text()).then(insertCourse))
      setTimeout(() => {
        if (!document.querySelectorAll('.cp-table-item').length) {
          wait.textContent = '온라인 클래스가 없습니다'
        } else {
          content.removeChild(wait)
        }
      }, 5000)
    }

    function openAllBlocks() {
      document.querySelectorAll('#page-blocks > div').forEach(({ classList }) => classList.remove('hidden'))
    }

    function closeAllBlocks() {
      document.querySelectorAll('#page-blocks > div').forEach(({ classList }) => classList.add('hidden'))
    }

    closeAllBlocks()
    const content = insertTableBlock()
    fetchTableInfo(content)
    console.log('Table Plugin!')
  }
})()