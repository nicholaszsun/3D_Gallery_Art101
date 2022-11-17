import * as THREE from "https://unpkg.com/three@0.146.0/build/three.module.js"

	var camera, scene, renderer, dreams=[];

	function init(){
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.z = 5;

		scene = new THREE.Scene();


		renderer = new THREE.WebGLRenderer();

		renderer.setSize( window.innerWidth, window.innerHeight );


		document.body.appendChild( renderer.domElement );
	}


    function Randomize() {
        let random_number = Math.floor(Math.random() * 8);
        return "img" + random_number + ".JPG"
    }

	function addDreams(){
                const loader = new THREE.TextureLoader()

				for ( var z= -1000; z < 1200; z+=20 ) {
					var geometry  = new THREE.SphereGeometry(16, 16, 32)
                     var material = new THREE.MeshBasicMaterial( {color: 0xffffff, map: loader.load(Randomize())} );
					var dream = new THREE.Mesh(geometry, material)


					dream.position.x = Math.random() * 1000 - 500;
					dream.position.y = Math.random() * 1000 - 500;


					dream.position.z = z;


					dream.scale.x = dream.scale.y = 3;


					scene.add( dream );


					dreams.push(dream);
				}
	}

	function animatedreams() {


		for(var i=0; i<dreams.length; i++) {

            let frame;
			frame = dreams[i];
			frame.position.z +=  i/10;
			if(frame.position.z>500) frame.position.z-=3000;
            dreams[i].rotation.x += 0.01;
            dreams[i].rotation.y += 0.01;
		}


	}

	function render() {
		requestAnimationFrame( render );
		renderer.render( scene, camera );
		animatedreams();

	}

	init();
	addDreams();
    render();