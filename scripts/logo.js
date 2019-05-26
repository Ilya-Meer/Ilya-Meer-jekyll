

var camera, scene, renderer;

var mesh;

var controls;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var setup = function() {
	camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 3000);
	camera.position.z = 250;

	scene = new THREE.Scene();

	// LIGHTING 

	// Ambient Light
	var amlight = new THREE.AmbientLight(0xffffff, 0.5);
	// Specifies intensity of ambient light
	scene.add(amlight);

	// Point Light
	var params = {color: "#ffffff" };

	var colorObj = new THREE.Color(params.color);
	var ptlight = new THREE.PointLight(colorObj, 0.75);
	scene.add(ptlight);


	// MESH AND FONT LOADER
	var loader = new THREE.FontLoader();

	loader.load('../../assets/fonts/raleway_im.json', function (font) {
		var geometry = new THREE.TextGeometry('IM', { font: font, size: 200, height: 20, curveSegments: 12, bevelEnabled: true, bevelThickness: 9, bevelSize: 2, bevelSegments: 5 });
		geometry.center();

		var material = new THREE.MeshPhongMaterial({ color: 0x293749, shininess: 500 });
	
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.z = -400;    
		mesh.rotation.x = 3;
		mesh.rotation.y = 3;
		mesh.rotation.z = 3;

		scene.add(mesh);
	});

	// RENDERER

	renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true});
	renderer.setClearColor(0xffffff);
	renderer.setSize(window.innerWidth,window.innerHeight);

	// CONTROLS

	controls = new THREE.ObjectControls(camera, renderer.domElement, mesh);
	controls.enableVerticalRotation();
	controls.setRotationSpeed(0.05);

	window.addEventListener('resize', onWindowResize, false);

	animate();
};

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
	if (mesh) {
		mesh.rotation.x += 0.001;
		mesh.rotation.y += 0.003;
		mesh.rotation.z += 0.005;  
	}

	requestAnimationFrame(animate);
	render();
}

function render() {
	renderer.render(scene, camera);
}

setup();