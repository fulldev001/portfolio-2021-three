import { gsap } from 'gsap'
// initialize Splitting
import Splitting from 'splitting'

import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'

export const initCaseDetailsTitle = () => {
	const caseDetails = document.querySelector('.case-details')
	if (caseDetails) {
		Splitting({target: '.case-details h2'})
		gsap.to('.case-details h2 .char', 0.6, {
			scrollTrigger: {
				trigger: '.case-details',
				scroller: '.smooth-scroll',
				start: 'top-=50%',
				once: true
			},
			y: 0,
			onStart: () => {
				gsap.to('.case-details h2 .char', 1, {
					backgroundPosition: '0 0',
				})
			}
		})
	}
}
