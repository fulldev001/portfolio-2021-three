import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { H } from '../index.js'
import { cursorSettings } from '../base/cursor.js'
import { initScroll, locoScroll, stopScroll, isTouch } from '../base/scroll.js'
import { Swiper } from 'swiper'
import * as THREE from 'three'

import fragment from '../shaders/fragment.glsl'
import vertex from '../shaders/vertex.glsl'

// initialize Splitting
import Splitting from 'splitting'

import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'
let splittedTexts = []

export default class Sketch{
	constructor(options) {
		this.container = options.domElement
		if (isTouch()) {
			return
		}
		this.animationRunning = false
		this.block = document.querySelector('.homepage-grid')

		this.width = this.container.offsetWidth
		this.height = this.container.offsetHeight

		this.camera = new THREE.PerspectiveCamera( 30, this.width/this.height, 10, 1000 )
		this.camera.position.z = 600

		this.camera.fov = 2*Math.atan( (this.height/2)/600 ) * 180/Math.PI
		this.imagesAdded = 0
		this.imageStore = []

		this.scene = new THREE.Scene()

		this.renderer = new THREE.WebGLRenderer( {
			antialias: true,
			alpha: true
		} )
		this.renderer.setPixelRatio(window.devicePixelRatio)

		this.container.appendChild(this.renderer.domElement)
		this.materials = []
		this.rendered = false
		this.time = 0
		if (this.block) {
			this.rendered = true
			this.startAnimations('init')
			this.addObjects()
			this.resize()
			this.addMouseEvents()
			this.render()

			gsap.to('#container', 2, {
				opacity: 1
			})
		}

		this.setupResize()
		if (H) {
			H.on('NAVIGATE_OUT', ({ to, from, trigger, location }) => {
				gsap.to('#container', 1, {
					opacity: 0,
					delay: 1
				})
			})
			H.on('NAVIGATE_IN', ({ to, from, trigger, location }) => {
				this.imageStore.forEach(m=>{
					this.scene.remove(m.mesh)
				})
			})
			H.on('NAVIGATE_END', ({ to, from, trigger, location }) => {
				this.block = document.querySelector('.homepage-grid')

				if (this.block) {
					this.imageStore = []
					this.materials = []
					this.startAnimations('route')
					this.addObjects()
					setTimeout(() => {
						this.resize()
					}, 200)
					this.addMouseEvents()
					if (!this.rendered) {
						this.rendered = true
						this.render()
					}
					gsap.to('#container', 2, {
						opacity: 1
					})
					this.animationRunning = false
				}
			})
		}
	}
	startAnimations(from) {
		const tl = gsap.timeline()
		const intro = document.querySelector('.intro')
		if (intro) {
			Splitting({target: '.intro h1'})
		}
		Splitting({target: '.homepage-grid__description h2'})
		tl.to('.homepage-grid__description', 0.4, {
			opacity: 1,
			onStart: () => {
				gsap.to('.homepage-grid__description h2 .char', 0.8, {
					y: 0
				})
				gsap.to('.homepage-grid__description h2 .char', 1.2, {
					backgroundPosition: '0 0',
				})
			}
		})
		.to('.homepage-grid__meta', 0.8, {
			y: 0,
			opacity: 1,
			ease: 'Expo.out'
		})

	}
	changeCorners(item, amount) {
		let tl = gsap.timeline()
		.to(item.mesh.material.uniforms.uCorners.value,{
			x: amount,
			duration: 1,
			ease: 'Expo.out'
		})
		.to(item.mesh.material.uniforms.uCorners.value,{
			z: amount,
			duration: 1,
			ease: 'Expo.out'
		},0.2)
		.to(item.mesh.material.uniforms.uCorners.value,{
			y: amount,
			duration: 1,
			ease: 'Expo.out'
		},0.3)
		.to(item.mesh.material.uniforms.uCorners.value,{
			w: amount,
			duration: 1,
			ease: 'Expo.out'
		},0.4)
		if (amount == 1) {
			gsap.to('.homepage-grid__meta', 0.4, {
				opacity: 0,
				y: 30
			})
			gsap.to('.homepage-grid__description h2 .char', 0.4, {
				y: '100%'
			})
		}
	}
	addMouseEvents(){
		this.imageStore.forEach((i, ind) => {
			i.link.addEventListener('click', () => {
				this.changeCorners(i, 1)
				this.animationRunning = true
			})

			i.link.addEventListener('mouseenter', () => {
				if (!this.animationRunning) {
					this.changeCorners(i, 0.1)
				}
			})

			i.link.addEventListener('mouseout', () => {
				if (!this.animationRunning) {
					this.changeCorners(i, 0)
				}
			})
			this.changeCorners(i, 0)
		})
	}
	resize(){
		this.width = this.container.offsetWidth
		this.height = this.container.offsetHeight
		this.renderer.setSize( this.width, this.height )
		this.camera.aspect = this.width/this.height
		this.camera.updateProjectionMatrix()

		this.camera.fov = 2*Math.atan( (this.height/2)/600 ) * 180/Math.PI

		this.materials.forEach(m=>{
			m.uniforms.uResolution.value.x = this.width
			m.uniforms.uResolution.value.y = this.height
		})
		this.imageStore.forEach(i=>{
			let bounds = i.img.getBoundingClientRect()
			const scrollPosition = locoScroll ? locoScroll.scroll.instance.scroll.y : 0

			let scrollPositionX = document.querySelector('.home') ? locoScroll.scroll.instance.scroll.x : 0
			let scrollPositionY = document.querySelector('.home') ? 0 : locoScroll.scroll.instance.scroll.y

			i.mesh.scale.set(bounds.width,bounds.height,1)
			i.top = bounds.top + scrollPositionY
			i.left = bounds.left + scrollPositionX
			i.width = bounds.width
			i.height = bounds.height

			i.mesh.material.uniforms.uQuadSize.value.x = bounds.width
			i.mesh.material.uniforms.uQuadSize.value.y = bounds.height

			i.mesh.material.uniforms.uTextureSize.value.x = i.img.getAttribute('width')
			i.mesh.material.uniforms.uTextureSize.value.y = i.img.getAttribute('height')
		})
	}

	setupResize(){
		window.addEventListener('resize',this.resize.bind(this))
	}

	addObjects(){
		this.geometry = new THREE.PlaneBufferGeometry( 1, 1,100,100)

		this.material = new THREE.ShaderMaterial({
			// wireframe: true,
			uniforms: {
				time: { value: 1.0 },
				uProgress: { value: 0 },
				uTexture: {value: null},
				uTextureSize: {value: new THREE.Vector2(100,100)},
				uCorners: {value: new THREE.Vector4(0,0,0,0)},
				uResolution: { value: new THREE.Vector2(this.width,this.height) },
				uQuadSize: { value: new THREE.Vector2(300,300) }
			},
			vertexShader: vertex,
			fragmentShader: fragment,
		})

		this.images = [...document.querySelectorAll('.js-image')]
		this.imageStore = this.images.map(img=>{
			const bounds = img.getBoundingClientRect()
			const m = this.material.clone()
			this.materials.push(m)
			const texture = new THREE.Texture(img)

			texture.needsUpdate = true

			m.uniforms.uTexture.value = texture
			let mesh = new THREE.Mesh(this.geometry, m)
			this.scene.add(mesh)
			mesh.scale.set(bounds.width, bounds.height,1)

			const link = img.closest('.homepage-grid__item').querySelector('a')
			return {
				img,
				mesh,
				width: bounds.width,
				height: bounds.height,
				top: bounds.top,
				left: bounds.left,
				link
			}
		})
	}

	setPosition(){
		if(!this.animationRunning){
			let scrollPositionX = locoScroll ? locoScroll.scroll.instance.scroll.x : 0
			let scrollPositionY = locoScroll ? locoScroll.scroll.instance.scroll.y : 0

			this.imageStore.forEach(o=>{

				if (document.querySelector('.home')) {
					o.mesh.position.x = -scrollPositionX + o.left - this.width/2 + o.width/2
					o.mesh.position.y = -o.top + this.height/2 - o.height/2
				} else {
					o.mesh.position.x = o.left - this.width/2 + o.width/2
					o.mesh.position.y = scrollPositionY - o.top + this.height/2 - o.height/2
				}
			})
		}

	}

	render(){
		if (this.block) {
			this.time += 0.05
			this.material.uniforms.time.value = this.time
			this.setPosition()

			this.renderer.render( this.scene, this.camera )
		}
		requestAnimationFrame(this.render.bind(this))
	}
}


export const initSwiper = () => {
	if (isTouch()) {

		new Swiper('.homepage-grid__inner', {
			wrapperClass: 'homepage-grid__row',
			slideClass: 'homepage-grid__item',
			slidesPerView: 'auto',
			watchOverflow: true
		})

		const tl = gsap.timeline()
		const intro = document.querySelector('.intro')
		if (intro) {
			Splitting({target: '.intro h1'})
		}
		Splitting({target: '.homepage-grid__description h2'})
		tl.to('.homepage-grid__description', 0.4, {
			opacity: 1,
			onStart: () => {
				gsap.to('.homepage-grid__description h2 .char', 0.8, {
					y: 0
				})
				gsap.to('.homepage-grid__description h2 .char', 0.8, {
					backgroundPosition: '0 0',
				})
			}
		})
		.to('.homepage-grid__meta', 0.8, {
			y: 0,
			opacity: 1,
			ease: 'Expo.out'
		})
	}
}
