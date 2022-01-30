import { gsap } from 'gsap'
import { H } from '../index.js'
import Splitting from 'splitting'

import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'

export const initPageHeader = () => {
	const pageHeader = document.querySelector('.page-header')
	if (pageHeader) {
		headerObserver.observe(pageHeader)
		Splitting({target: '.page-header h1'})
		splitText()
	}
	const singleGrid = document.querySelector('.single .homepage-grid')
	if (singleGrid) {
		gridObserver.observe(singleGrid)
	}
}

export const splitText = () => {
	const headings = document.querySelectorAll('.page-header h1')
	gsap.to('.page-header__title', 0.4, {
		opacity: 1
	})
	headings.forEach(heading => {
		gsap.to(heading.querySelectorAll('.char'), 0.4, {
			opacity: 1,
			y: 0,
			rotate: 0,
			stagger: {
				amount: 0.6,
			},
			delay: 0.4
		})
	})
}

export const headerObserver = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		const background = document.querySelector('main').getAttribute('data-background')
		const color = document.querySelector('main').getAttribute('data-color')
		if (entry.isIntersecting) {
			gsap.to('nav', 0.4, {
				'--background-color': background,
				'--color': color
			})
			gsap.to('body', 0.4, {
				'--background-color': background,
				'--color': color
			})
			gsap.to('[data-router-view]', 0.4, {
				'--background-color': background,
				'--color': color
			})
		} else {
			gsap.to('nav', 0.4, {
				'--background-color': '#fff',
				'--color': background
			})
			gsap.to('body', 0.4, {
				'--background-color': '#fff',
				'--color': '#101010'
			})
			gsap.to('[data-router-view]', 0.4, {
				'--background-color': '#fff',
				'--color': '#101010'
			})
		}
	})
})

export const gridObserver = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			gsap.to('nav', 0.4, {
				'--background-color': '#101010',
				'--color': '#fff',
			})
			gsap.to('body', 0.4, {
				'--background-color': '#101010',
				'--color': '#fff',
			})
			gsap.to('[data-router-view]', 0.4, {
				'--background-color': '#101010',
				'--color': '#fff',
			})
		}
	})
})
