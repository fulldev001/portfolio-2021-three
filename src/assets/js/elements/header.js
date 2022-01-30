import { gsap } from 'gsap'
const header = document.querySelector('.header')
const menuTrigger = document.querySelector('.mobile-trigger')
const headerNav = document.querySelector('.header__navigation')
const headerLinksLeft = document.querySelectorAll('.header__left .header__link')
const headerLinksRight = document.querySelectorAll('.header__right .header__link')

export let menuSettings = {
	open: false
}
export const initHeader = () => {
	gsap.to('.header__page-title', 1, {
		y: 0
	})
	menuTrigger.addEventListener('click', () => {
		menuSettings.open = !menuSettings.open
		if (menuSettings.open) {
			openNav()
		} else {
			closeNav()
		}
		headerLinksLeft.forEach((link) => {
			if (menuSettings.open) {
				let delay = 0.4
				gsap.fromTo(link, {
					y: '150%',
				}, {
					y: 0,
					duration: 0.4,
					delay
				})
			} else {
				gsap.to(link, {
					y: '-150%',
				})
			}
		})
		headerLinksRight.forEach((link) => {
			if (menuSettings.open) {
				let delay = 0.4
				gsap.fromTo(link, {
					y: '-150%',
				}, {
					y: 0,
					duration: 0.4,
					delay
				})
			} else {
				gsap.to(link, {
					y: '150%',
				})
			}
		})
	})
	checkActiveItems()
	if (window.innerWidth > 1024) {
		listenToHover()
	}
}

const listenToHover = () => {
	const links = document.querySelectorAll('.header ul li a')
	links.forEach(link => {
		const item = link.parentNode
		link.addEventListener('mouseenter', (e) => {
			setMedia(item, e)
		})
		link.addEventListener('mousemove', (e) => {
			showImage(item, e)
		})
		link.addEventListener('mouseleave', () => {
			hideImage(item)
		})
	})
}

const openNav = () => {
	menuTrigger.classList.add('mobile-trigger--active')
	headerNav.classList.add('header__navigation--open')
	header.classList.add('header--open')
}

export const closeNav = () => {
	menuTrigger.classList.remove('mobile-trigger--active')
	headerNav.classList.remove('header__navigation--open')
	header.classList.remove('header--open')
}

export const checkActiveItems = () => {
	const items = [...document.querySelectorAll('.header__link')]
	items.forEach(item => {
		item.classList.remove('active')
		if (item.hasAttribute('href') && item.href == window.location.href) {
			item.classList.add('active')
			item.addEventListener('click', () => {
				closeNav()
				menuSettings.open = false
			})
		}
	})
}

const setMedia = (item, e) => {
	if (item.getAttribute('data-type') == 'image') {
		document.querySelector('.header__image').src = item.getAttribute('data-media')
		gsap.set('.header__image', {
			x: e.clientX,
			y: e.clientY,
		})
	} else if (item.getAttribute('data-type') == 'video') {
		document.querySelector('.header__video').src = item.getAttribute('data-media')
		gsap.set('.header__video', {
			x: e.clientX,
			y: e.clientY,
		})
	}
}

const showImage = (item, e) => {
	if (item.getAttribute('data-type') == 'image') {
		document.querySelector('.header__image').src = item.getAttribute('data-media')
		gsap.to('.header__image', {
			opacity: 1,
			ease: 'expo.out'
		})
		gsap.to('.header__image', {
			x: e.clientX,
			y: e.clientY,
			delay: 0.1,
			ease: 'expo.out'
		})
	} else if (item.getAttribute('data-type') == 'video') {
		document.querySelector('.header__video').src = item.getAttribute('data-media')
		gsap.to('.header__video', {
			opacity: 1,
			ease: 'expo.out'
		})
		gsap.to('.header__video', {
			x: e.clientX,
			y: e.clientY,
			delay: 0.1,
			ease: 'expo.out'
		})
	}

}

const hideImage = (item) => {
	gsap.to('.header__image', {
		opacity: 0,
		ease: 'expo.out'
	})
	gsap.to('.header__video', {
		opacity: 0,
		ease: 'expo.out'
	})
}
