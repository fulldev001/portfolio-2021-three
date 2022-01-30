import { gsap } from 'gsap'

export const cursorSettings = {
	moved: false,
	clientX: 0,
	clientY: 0,
	scaleUp: false
}

export const initCursor = () => {
	window.addEventListener('mousemove', followMouse)
	window.addEventListener('touchmove', followMouse)
}
export const followMouse = (e) => {
	cursorSettings.moved = true
	if (e.clientX) {
		cursorSettings.clientX = e.clientX
		cursorSettings.clientY = e.clientY
		if (e.target.nodeName == 'A') {
			cursorSettings.scaleUp = true
		} else if (e.target.closest('a')) {
			cursorSettings.scaleUp = true
		} else if (e.target.classList.contains('mobile-trigger')) {
			cursorSettings.scaleUp = true
		} else{
			cursorSettings.scaleUp = false
		}
		animateMouse()
	} else if (e.targetTouches) {
		cursorSettings.clientX = e.targetTouches[0].clientX
		cursorSettings.clientY = e.targetTouches[0].clientY
	}
}

export const animateMouse = () => {
	gsap.to('.cursor', {
		x: cursorSettings.clientX + 10,
		y: cursorSettings.clientY + 10,
		duration: 0.4,
		opacity: cursorSettings.moved ? 1 : 0,
		scale: cursorSettings.scaleUp ? 1 : 0.2,
		ease: 'circ.out'
	})
}
