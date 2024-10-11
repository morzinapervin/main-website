const TRANSITION_DURATION = 500 // mili-seconds
const TRANSITION_EASING = 'ease'

function setTransition(element, duration = TRANSITION_DURATION, easing = TRANSITION_EASING) {
  element.style.transition = `${duration}ms ${easing}`
}

function clearTransition(element) {
  element.style.removeProperty('transition')
}

function slideUp(element, duration = TRANSITION_DURATION) {
  setTransition(element, duration)
  let display = window.getComputedStyle(element).display
  element.style.display = display
  element.style.height = element.scrollHeight + 'px'
  element.offsetHeight // force repaint
  element.style.overflow = 'hidden'
  element.style.minHeight = 0
  element.style.height = 0
  element.style.paddingTop = 0
  element.style.paddingBottom = 0
  element.style.marginTop = 0
  element.style.marginBottom = 0

  window.setTimeout(() => {
    element.style.display = 'none'
    element.style.removeProperty('min-height')
    element.style.removeProperty('height')
    element.style.removeProperty('padding-top')
    element.style.removeProperty('padding-bottom')
    element.style.removeProperty('overflow')
    element.style.removeProperty('margin-top')
    element.style.removeProperty('margin-bottom')
    clearTransition(element)
  }, duration) // match the CSS transition time
}

function slideDown(element, duration = TRANSITION_DURATION) {
  setTransition(element, duration)
  element.style.removeProperty('display')
  let display = window.getComputedStyle(element).display
  if (display === 'none') display = 'block'
  element.style.display = display

  const height = element.scrollHeight // height of the content

  element.style.overflow = 'hidden'
  element.style.minHeight = 0
  element.style.height = 0
  element.style.paddingTop = 0
  element.style.paddingBottom = 0
  element.style.marginTop = 0
  element.style.marginBottom = 0
  element.offsetHeight // force repaint

  element.style.height = height + 'px'
  element.style.paddingTop = ''
  element.style.paddingBottom = ''
  element.style.marginTop = ''
  element.style.marginBottom = ''

  window.setTimeout(() => {
    element.style.removeProperty('height')
    element.style.removeProperty('overflow')
    clearTransition(element)
  }, duration) // match the CSS transition time
}
