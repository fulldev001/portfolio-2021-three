
import 'core-js/stable'

import Highway from '@dogstudio/highway/'
import TransitionRouter from './page-transitions/router.js'
import { gsap } from 'gsap'

import { initHeader, closeNav, checkActiveItems, menuSettings } from './elements/header.js'
import { initScroll, locoScroll, stopScroll, checkScroll, isTouch } from './base/scroll.js'
import { initCursor } from './base/cursor.js'
import Sketch from './elements/homepage-grid.js'
import { initSwiper } from './elements/homepage-grid.js'
import { initPageHeader, headerObserver } from './elements/page-header.js'

export let H
export let isHome

const ua = window.navigator.userAgent
const isIE = /MSIE|Trident/.test(ua)


const initApp = () => {
	initPage()
	initScroll()

	initCursor()
	initHeader()
	if (!isIE) {
		H = new Highway.Core({
			transitions: {
				default: TransitionRouter,
			},
		})
		new Sketch({
			domElement: document.getElementById('container')
		})
		if (document.querySelector('.page-header')) {
			gsap.to('.page-header', 0.8, {
				'--percentage': 0.6
			})
		}
		H.on('NAVIGATE_OUT', ({ to, trigger, location }) => {
			if (!isTouch()) {
				locoScroll.scrollTo(0, { duration: 200, disableLerp: true })
			}
			stopScroll()
			if (headerObserver && document.querySelector('.page-header')) {
				headerObserver.unobserve(document.querySelector('.page-header'))
			}
		})
		H.on('NAVIGATE_END', ({ to, from, trigger, location }) => {
			initScroll()
		})
		H.on('NAVIGATE_IN', ({ to, from, trigger, location }) => {
			closeNav()
			menuSettings.open = false
		})
	}

}

export const initPage = () => {

	initPageHeader()
	checkActiveItems()
	initSwiper()
	// setTimeout(() => {
	// 	if (locoScroll) {
	// 		locoScroll.update()
	// 	}
	// }, 1000)

}

document.addEventListener('DOMContentLoaded', initApp)
