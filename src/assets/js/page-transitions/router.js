

import Highway from '@dogstudio/highway'
import gsap from 'gsap'
import { locoScroll, stopScroll } from '../base/scroll.js'
import { threeSettings } from '../elements/homepage-grid.js'
import { initPage } from '../index.js'

class TransitionRouter extends Highway.Transition {
	out ({ from, trigger, done }) {
		gsap.to('.header__page-title', {
			y: '110%',
		})
		if (trigger && trigger.classList && trigger.classList.contains('homepage-grid__link')) {
			stopScroll()
			document.querySelector('body').classList.add('overflow-hidden')
			gsap.to('section', {
				opacity: 0
			})
			setTimeout(() =>  {
				done()
			}, 1000)
		} else {
			gsap.fromTo('.page-transition', {
				clipPath: 'inset(101% 0% 0% 0%)',
			}, {
				clipPath: 'inset(0% 0% 0% 0%)',
				onComplete: () => {
					document.querySelector('body').classList.remove('overflow-hidden')
					done()
				}
			})
		}
	}
	in ({ from, to, trigger, done }) {
		window.scrollTo(0, 0)
		from.remove()
		initPage()
		const body = document.querySelector('body')
		const nav = document.querySelector('nav')
		body.classList = document.querySelector('[data-router-view]').classList
		body.style = document.querySelector('[data-router-view]').getAttribute('style')
		nav.style = document.querySelector('[data-router-view]').getAttribute('style')
		const title = document.querySelector('[data-page-title]')
			if (title) {
				const newTitle = title.getAttribute('data-page-title')
				document.querySelector('.header__page-title').innerHTML = newTitle
				if (newTitle) {
					gsap.timeline()
					.set('.header__page-title', {
						y: '-120%'
					})
					.to('.header__page-title', 1, {
						y: 0
					})
				}
			}
		body.classList.remove('overflow-hidden')
		if (to.classList.contains('single')) {
			gsap.to('.page-header', 0.8, {
				'--percentage': 0.6,
				onComplete: () => {
					done()
				}
			})
			gsap.set('.page-transition', {
				clipPath: 'inset(0% 0% 101% 0%)',
			})
		} else {
			gsap.fromTo('.page-transition', {
				clipPath: 'inset(0% 0% 0% 0%)'
			}, {
				clipPath: 'inset(0% 0% 101% 0%)',
				onComplete: () => {
					document.querySelector('body').classList.remove('overflow-hidden')
					done()
				}
			})
		}
	}
}

export default TransitionRouter

const getRandomArbitrary = (min, max) => {
	return Math.random() * (max - min) + min
}
