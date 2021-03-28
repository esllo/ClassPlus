const ClassPlus = (() => {
  const loadingElement = document.createElement('div')
  let loadingText = ''

  function initLoading() {
    loadingElement.id = 'cp-loading'
    document.body.appendChild(loadingElement)
  }

  function showLoading(text) {
    loadingText = text
    while (loadingElement.firstChild) {
      loadingElement.removeChild(loadingElement.lastChild)
    }
    [...loadingText].forEach((char, index) => {
      const letter = document.createElement('div')
      if (char === ' ') {
        char = '   '
      }
      letter.textContent = char
      letter.className = 'cp-letter'
      letter.style.animationDelay = (index * 0.1) + 's'
      loadingElement.appendChild(letter)
    })
    loadingElement.classList.add('show')
  }

  function hideLoading() {
    while (loadingElement.firstChild) {
      loadingElement.removeChild(loadingElement.lastChild)
    }
    loadingElement.classList.remove('show')
  }
  initLoading()

  function blurPrivate() {
    [...document.querySelectorAll('.course_box > a'), ...document.querySelectorAll('.cp-table-item > h2'), document.querySelector('.user_department')].forEach(e => e.style.filter = 'blur(4px)')
  }

  return {
    showLoading,
    hideLoading,
    blurPrivate,
  }
})()