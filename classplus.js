const ClassPlus = (() => {
  // const lnb = document.getElementById('page-lnb')
  // if (lnb) {
  //   const div = document.createElement('div')

  //   Object.assign(div.style, {
  //     width: getComputedStyle(lnb, null).width || '60px',
  //     height: '58px',
  //     background: 'rgba(0, 0, 0, 0.3)',
  //     position: 'fixed',
  //     left: 0,
  //     bottom: 0,
  //     display: 'flex',
  //     userSelect: 'none',
  //     cursor: 'default',
  //     margin: '10px 0',
  //     alignItems: 'center'
  //   })
  //   const logo = document.createElement('img')
  //   logo.src = chrome.runtime.getURL('images/TR_GR.png')
  //   Object.assign(logo.style, {
  //     width: '40px',
  //     height: '40px',
  //     margin: '4px 12px'
  //   })
  //   div.appendChild(logo)
  //   if (div.style.width === '190px') {
  //     const textWrap = document.createElement('div')
  //     Object.assign(textWrap.style, {
  //       display: 'flex',
  //       flexDirection: 'column',
  //       justifyContent: 'center'
  //     })
  //     const text = document.createElement('h1')
  //     text.textContent = 'Class Plus'
  //     Object.assign(text.style, {
  //       fontSize: '14px',
  //       color: '#588044',
  //       margin: 0
  //     })
  //     textWrap.appendChild(text)
  //     const author = document.createElement('span')
  //     Object.assign(author.style, {
  //       fontSize: '13px',
  //       color: '#ddd'
  //     })
  //     author.textContent = 'by ESLLO'
  //     textWrap.appendChild(author)
  //     div.appendChild(textWrap)
  //   }

  //   document.body.appendChild(div)
  // }
  console.log('%cClass Plus! %cby ESLLO', 'color:#588044; font-size: 20px; padding: 10px; font-family:roboto', 'font-size: 12px; ')

  const style = document.createElement('link')
  style.rel = 'stylesheet'
  style.href = chrome.runtime.getURL('css/classplus.css')
  document.head.appendChild(style)
  const loading = document.createElement('script')
  loading.id = 'cp-load'
  loading.src = chrome.runtime.getURL('js/loading.js')
  document.body.appendChild(loading)
})()
