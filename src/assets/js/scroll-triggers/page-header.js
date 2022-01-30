import { gsap } from 'gsap'


export const initPageHeaderTriggers = () => {
	const pageHeader = document.querySelector('.page-header')

	if (pageHeader) {
		const imageTrigger = {
			trigger: pageHeader,
			scroller: '.smooth-scroll',
			scrub: 0.5,
			start: 'top',
			end: 'top+=50%',
		}

		gsap.to('.page-header', 2, {
			scrollTrigger: imageTrigger,
			immediateRender: false,
			'--percentage': 0
		})
		const titleWidth = document.querySelector('.page-header__title').offsetWidth
		if (titleWidth > window.innerWidth) {
			gsap.to('.page-header__title', 2, {
				scrollTrigger: imageTrigger,
				x: -(titleWidth - window.innerWidth)
			})
		}
	}
}
