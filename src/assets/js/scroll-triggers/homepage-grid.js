import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { locoScroll, isTouch } from '../base/scroll.js'

let clipped = false
let lastY = 0

export const initHomepageGridTriggers = () => {
	const homepageGrid = document.querySelector('.home .homepage-grid')
	if (homepageGrid && !isTouch()) {
		const gridRow = homepageGrid.querySelector('.homepage-grid__row')
		gsap.to(gridRow, {
			scrollTrigger: {
				trigger: homepageGrid,
				scroller: '.smooth-scroll',
				scrub: true,
				start: 'top',
				end: 'bottom-='+ window.innerHeight,
			},
			x: -gridRow.offsetWidth + window.innerWidth,
			ease: 'none'
		})
	}
}
