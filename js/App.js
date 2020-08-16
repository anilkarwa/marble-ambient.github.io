
window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

function MarbleShowcaseApp( elQuery ) {

	this.el = document.querySelector( elQuery );
	this.canvasEl = this.el.querySelector( '#canvas' );
	this.preloaderEl = this.el.querySelector( '.preloader-container' );
	this.showcaseSwiperContainerEl = this.el.querySelector( '.showcase-swiper-container' );
	this.objectSwiperContainerEl = this.el.querySelector( '.object-swiper-container' );
	this.homeBtnEl = this.el.querySelector( '.home-btn' );

	this.homeBtnEl.addEventListener( 'click', ( function () {
		
		this.showShowcaseSwiper();

		this.scene.remove( this.content );
		this.content = null;

	} ).bind( this ) );

	this.showcaseSwiperSettings = {
		direction: 'horizontal',
		autoplay: {
			delay: 4000,
			disableOnInteraction: true
		},
		navigation: {
			prevEl: '.swiper-button-prev',
			nextEl: '.swiper-button-next'
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		}
	};

	this.textureSwiperSettings = {
		direction: 'horizontal',
		spaceBetween: 20,
		slidesPerView: 4
	};

	this.objectSwiperSettings = {
		direction: 'vertical',
		spaceBetween: 0,
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
	};

	window.addEventListener( 'resize', this.onResize.bind( this ), false );

	this.hidePreloader();

	this.renderer = new THREE.WebGLRenderer( {
		alpha: true,
		antialias: true,
		canvas: this.canvasEl
	} );

	this.renderer.setPixelRatio( window.devicePixelRatio );
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	this.renderer.setClearColor( 0xd4d4d4 );

	this.renderer.shadowMap.enabled = true;
	this.renderer.outputEncoding = THREE.sRGBEncoding;

	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
	this.controls = new THREE.OrbitControls( this.camera, this.canvasEl );
	this.controls.maxPolarAngle = Math.PI / 2;

	this.fog = new THREE.Fog( '#d4d4d4' );
	this.scene.fog = this.fog;

	this.content = null;

	const cubeTextureLoader = new THREE.CubeTextureLoader();
	cubeTextureLoader.setPath( './images/cubemap-compressed/' );
	var urls = [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ];
	var envMap = cubeTextureLoader.load( urls );
	this.scene.environment = envMap;

	this.ambientLight = new THREE.AmbientLight( '#fff', 0.5 );
	this.scene.add( this.ambientLight );

	this.dirLight = new THREE.DirectionalLight( '#fff', 0.5 );
	this.scene.add( this.dirLight );

	this.gltfLoader = new THREE.GLTFLoader();
	this.textureLoader = new THREE.TextureLoader();

	this.animate();

}

Object.assign( MarbleShowcaseApp.prototype, {

	createShowcaseSlide: function ( object ) {

		const slideEl = document.createElement( 'div' );
		slideEl.classList.add( 'swiper-slide' );

		const slideThumbnailEl = document.createElement( 'img' );
		slideThumbnailEl.classList.add( 'slide-thumbnail', 'fullsize' );
		slideThumbnailEl.setAttribute( 'src', object.thumbnailSrc );
		slideEl.appendChild( slideThumbnailEl );

		slideThumbnailEl.onerror = function () {

			this.style.display = "none";
		
		}

		const slideContentEl = document.createElement( 'div' );
		slideContentEl.classList.add( 'slide-content', 'fullsize', 'center' );
		slideEl.appendChild( slideContentEl );

		const slideTitleEl = document.createElement( 'h1' );
		slideTitleEl.appendChild( document.createTextNode( object.title ) );
		slideContentEl.appendChild( slideTitleEl );

		const slideDescEl = document.createElement( 'p' );
		slideDescEl.appendChild( document.createTextNode( object.description ) );
		slideContentEl.appendChild( slideDescEl );

		const enterBtnEl = document.createElement( 'button' );
		enterBtnEl.classList.add( 'waves-effect', 'waves-light', 'btn' );
		enterBtnEl.appendChild( document.createTextNode( 'Enter ' + object.title ) );
		slideContentEl.appendChild( enterBtnEl );

		const scope = this;

		enterBtnEl.addEventListener( 'click', function () {

			console.log( 'entering ' + object.title );

			if ( object.modelSrc === '' || object.modelSrc === '#' ) {

				M.toast( {
					html: 'Can\'t load model. Model not found.'
				} );
				return;

			}

			scope.showPreloader();

			if ( ! object._model ) {

				scope.gltfLoader.load( object.modelSrc, function ( gltf ) {

					object._model = gltf.scene;

					if ( object.rotation ) {

						object._model.rotation.x = object.rotation[ 0 ];
						object._model.rotation.y = object.rotation[ 1 ];
						object._model.rotation.z = object.rotation[ 2 ];

					}
					
					object._model.traverse( function ( node ) {

						if ( node.isMesh ) {
			
							if ( node.name.indexOf( "transparent" ) > - 1 ) {
								
								node.material.transparent = true;
								node.material.opacity = 0.4;

							}

							if ( node.material.map ) {

							 	node.material.map.encoding = THREE.LinearEncoding;

							}

							node.material.needsUpdate = true;

						}

					} );

					scope.setContent( object._model );

					scope.createObjectShowcaseSwiper( object.objects, object._model );

					scope.hidePreloader();
					scope.hideShowcaseSwiper();

				}, function onProgress( xhr ) {

				}, function onError( error ) {

					M.toast( {
						html: 'Error loading model. See console for more info.'
					} );

					console.error( '[MarbleShowcaseApp] Error loading model.', error );

					scope.hidePreloader();
					scope.showShowcaseSwiper();

				} );

			} else {
				
				scope.createObjectShowcaseSwiper( object.objects, object._model );
				scope.setContent( object._model );
				scope.hidePreloader();
				scope.hideShowcaseSwiper();

			}

		}, true );

		return slideEl;

	},

	createObjectShowcaseSwiper: function ( objects, model ) {

		const scope = this;

		const inputEl = document.createElement( 'input' );
		inputEl.type = 'file';
		inputEl.accept = 'image/*';
		// inputEl.setAttribute( 'capture', '' );

		inputEl.onclick = function () {
			this.value = "";
		}

		const objectSwiperWrapperEl = this.objectSwiperContainerEl.querySelector( '.swiper-wrapper' );
		objectSwiperWrapperEl.innerHTML = '';

		for ( let i = 0; i < objects.length; i ++ ) {

			const object = objects[ i ];
			const objectSlideEl = document.createElement( 'div' );
			objectSlideEl.classList.add( 'swiper-slide' );
			objectSwiperWrapperEl.appendChild( objectSlideEl );

			const objectSlideTitleEl = document.createElement( 'div' );
			objectSlideTitleEl.classList.add( 'object-slide-title' );
			objectSlideTitleEl.appendChild( document.createTextNode( object.title ) );
			objectSlideEl.appendChild( objectSlideTitleEl );

			const textureSwiperContainerEl = document.createElement( 'div' );
			textureSwiperContainerEl.classList.add( 'texture-swiper-container' );
			objectSlideEl.appendChild( textureSwiperContainerEl );

			const textureSwiperSlideWrapperEl = document.createElement( 'div' );
			textureSwiperSlideWrapperEl.classList.add( 'swiper-wrapper' );
			textureSwiperContainerEl.appendChild( textureSwiperSlideWrapperEl );

			const cameraSlideEl = document.createElement( 'div' );
			cameraSlideEl.classList.add( 'swiper-slide' );
			textureSwiperSlideWrapperEl.appendChild( cameraSlideEl );

			function setTexture( texture ) {

				if ( ! Array.isArray( object.name ) ) object.name = [ object.name ];

				for ( let i = 0; i < object.name.length; i ++ ) {

					const node = model.getObjectByName( object.name[ i ] );

					if ( node ) {

						if ( node.isMesh ) {
							
							node.material.map = texture;
							node.material.needsUpdate = true;

						} else {

							M.toast( {
								html: 'Can\'t set texture. Object is not a mesh.'
							} );

						}

					} else {

						M.toast( {
							html: 'Can\'t set texture. Object was not found in the loaded model.'
						} );

					}

				}

			}

			cameraSlideEl.onclick = function () {

				if ( ! model ) return;

				inputEl.click();

				inputEl.oninput = function ( event ) {

					const file = event.target.files[ 0 ];
					const fileReader = new FileReader();

					fileReader.onload = function ( event ) {

						scope.textureLoader.load( event.target.result, function ( texture ) {

							const aspect = texture.image.width / texture.image.height;

							if ( object.userImageRepeat ) {
								
								texture.minFilter = THREE.LinearFilter;
								
								texture.repeat.set( object.userImageRepeat / aspect, object.userImageRepeat );
								texture.updateMatrix();
							
							} else {
								
								texture.repeat.set( 1 / aspect, 1 );
								texture.updateMatrix();

							}

							texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

							setTexture( texture );

						} );

					}

					fileReader.readAsDataURL( file );

				}

			}

			const cameraIconWrapperEl = document.createElement( 'div' );
			cameraIconWrapperEl.classList.add( 'camera-icon-wrapper' );
			cameraSlideEl.appendChild( cameraIconWrapperEl );

			const cameraIconEl = document.createElement( 'div' );
			cameraIconEl.classList.add( 'camera-icon' );
			cameraIconWrapperEl.appendChild( cameraIconEl );

			for ( let j = 0; j < object.textures.length; j ++ ) {

				const textureSlideEl = document.createElement( 'div' );
				textureSlideEl.classList.add( 'swiper-slide' );
				textureSwiperSlideWrapperEl.appendChild( textureSlideEl );

				const thumbnailEl = document.createElement( 'img' );
				thumbnailEl.classList.add( 'texture-thumbnail' );
				thumbnailEl.setAttribute( 'src', object.textures[ j ] );
				textureSlideEl.appendChild( thumbnailEl );

				textureSlideEl.onclick = function () {

					if ( ! model ) return;

					if ( ! thumbnailEl._texture ) {

						thumbnailEl._texture = new THREE.Texture( thumbnailEl );
						thumbnailEl._texture.wrapS = thumbnailEl._texture.wrapT = THREE.RepeatWrapping; //MirroredRepeatWrapping
						thumbnailEl._texture.needsUpdate = true;

					}

					setTexture( thumbnailEl._texture );

				}

				thumbnailEl.onerror = function () {
				
					this.style.display = 'none';
				
				}

			}

			new Swiper( textureSwiperContainerEl, this.textureSwiperSettings );

		}

		new Swiper( this.objectSwiperContainerEl, this.objectSwiperSettings );

	},

	createShowcaseSwiper: function ( data ) {

		const wrapperEl = this.showcaseSwiperContainerEl.querySelector( '.swiper-wrapper' );
		wrapperEl.innerHTML = '';

		for ( let i = 0; i < data.length; i ++ ) {

			const object = data[ i ];
			wrapperEl.appendChild( this.createShowcaseSlide( object ) );

		}

		this.showcaseSwiper = new Swiper( this.showcaseSwiperContainerEl, this.showcaseSwiperSettings ); 

	},

	showPreloader: function () {

		this.preloaderEl.style.display = '';

	},

	hidePreloader: function () {
		
		this.preloaderEl.style.display = 'none';

	},

	showShowcaseSwiper: function () {

		this.showcaseSwiperContainerEl.style.display = '';

		if ( this.showcaseSwiper ) {
			
			const temp = this.showcaseSwiper.realIndex;
			this.showcaseSwiper.slideTo( temp === 0 ? this.showcaseSwiper.slides.length - 1 : 0 );
			this.showcaseSwiper.slideTo( temp );

		}

	},

	hideShowcaseSwiper: function () {

		this.showcaseSwiperContainerEl.style.display = 'none';

	},
	
	setContent: function ( object ) {

		const box = new THREE.Box3().setFromObject( object );
		const center = box.getCenter( new THREE.Vector3() );
		const size = box.getSize( new THREE.Vector3() );

		const sizeLength = size.length();

		this.camera.position.x = sizeLength / 2;
		this.camera.position.y = sizeLength / 2;
		this.camera.position.z = sizeLength / 2;
		this.camera.lookAt( center );
		this.controls.target.set( 0, 0, 0 );
		this.controls.update();

		this.camera.near = sizeLength / 100;
		this.camera.far = sizeLength * 5;
		this.camera.updateProjectionMatrix();

		this.controls.maxDistance = sizeLength * 2;

		object.position.x = - center.x;
		object.position.y = - center.y + size.y / 2;
		object.position.z = - center.z;

		this.fog.near = sizeLength * 5;
		this.fog.far = sizeLength * 6;

		this.dirLight.position.setScalar( sizeLength );

		if ( this.content ) {

			this.scene.remove( this.content );

		}

		this.content = object;
		this.scene.add( this.content );

	},

	onResize: function () {

		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.render( this.scene, this.camera );

	},

	animate: function () {

		this.renderer.render( this.scene, this.camera );

		if ( ! this._animate ) {

			this._animate = this.animate.bind( this );

		}

		window.requestAnimationFrame( this._animate );

	}

} );
