
    //SCENE
  var scene = new THREE.Scene();

  var gui = new dat.GUI();       
  document.querySelector('ul').classList.add('closed');
  document.querySelector('.close-button').textContent = "Click Me!";


  // RENDERER
  var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas'), antialias: true});
  renderer.setClearColor(0xffffff);
  renderer.setSize(window.innerWidth,window.innerHeight);

  // CAMERA
  var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 3000);

  camera.position.set(0, 0, 100);

  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 1.0;
  controls.enableZoom    = true;  

  // LIGHTING 

  // Ambient Light
  var amlight = new THREE.AmbientLight(0xffffff, 0.5);
  // Specifies intensity of ambient light
  gui.add(amlight, 'intensity', 0, 5).name('AmLightIntensity');    
  scene.add(amlight);


  // Point Light
  var params = {color: "#ffffff" };

  // Generate a point light 
  function pointlight() {
    var colorObj = new THREE.Color(params.color);
    var ptlight = new THREE.PointLight(colorObj, 0.5);
    gui.add(ptlight, 'intensity', 0, 10).name('PtLightIntensity');    
    scene.add(ptlight);
  };
  pointlight();
  
  // Generate a new point light whenever user updates light value
  gui.addColor(params,'color').onChange(pointlight);
    

  // CUBEMAP
  var path = '../../assets/cubemap/';
  var format = '.jpg';
  var urls = [
    path + 'px' + format, path + 'nx' + format, 
    path + 'py' + format, path + 'ny' + format, 
    path + 'pz' + format, path + 'nz' + format, 
  ];
  
  var reflection = new THREE.CubeTextureLoader().load(urls);
  reflection.format = THREE.RGBFormat;

  scene.background = reflection;

  // MESHES

  var mesh;

  // FONT LOADER
  var loader = new THREE.FontLoader();

  loader.load('../../assets/fonts/raleway_im.json', function (font) {
    var geometry = new THREE.TextGeometry('IM', { font: font, size: 160, height: 20, curveSegments: 12, bevelEnabled: true, bevelThickness: 5, bevelSize: 2, bevelSegments: 5 });
    geometry.center();

    var material = new THREE.MeshPhongMaterial({ color: 0xd9d9d9, shininess: 500 });
    material.envMap = reflection;
  
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -450;    
    mesh.rotation.x = 3;
    mesh.rotation.y = 3;
    mesh.rotation.z = 3;
    // Controls for mesh position and rotation
    gui.add(mesh.position, 'x', -1000, 1000).name('MeshXPos'); 
    gui.add(mesh.position, 'y', -1000, 1000).name('MeshYPos'); 
    gui.add(mesh.position, 'z', -1000, 1000).name('MeshZPos'); 
    gui.add(mesh.rotation, 'x', -10, 10).name('MeshXRot'); 
    gui.add(mesh.rotation, 'y', -10, 10).name('MeshYRot'); 
    gui.add(mesh.rotation, 'z', -10, 10).name('MeshZRot'); 
    scene.add(mesh);
  });

  // PARTICLE SYSTEM
  var particleCount = 1800,
  particles = new THREE.Geometry(),
  pMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 5,
    map: THREE.ImageUtils.loadTexture(
      "../../assets/images/particle.png"
    ),
    blending: THREE.AdditiveBlending,
    transparent: true
  });


  // Second particle system geometry
  var particles2 = new THREE.Geometry();

  // Second particle system material
    var pMaterial2 = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 5,
      map: THREE.ImageUtils.loadTexture(
        "../../assets/images/ball.png"
      ),
      blending: THREE.AdditiveBlending,
      transparent: true
    });
  
  // Generate individual particles
  for (var p = 0; p < particleCount; p++) {

  // create a particle with random
  // position values, -250 -> 250
  var pX = Math.random() * 500 - 250,
      pY = Math.random() * 500 - 250,
      pZ = Math.random() * 500 - 250,
      particle = new THREE.Vector3(pX, pY, pZ);

  // add it to the geometry
  particles.vertices.push(particle);
  particles2.vertices.push(particle);
  }



  // create the particle system
  var particleSystem = new THREE.Points(particles, pMaterial);
  var particleSystem2 = new THREE.Points(particles2, pMaterial2);

  particleSystem.sortParticles = true;
  particleSystem2.sortParticles = true;
  
  gui.add(particleSystem.position, 'x', -5, 5).name('ParticleSysPosX');
  gui.add(particleSystem.position, 'y', -5, 5).name('ParticleSysPosY');
  gui.add(particleSystem.position, 'z', -5, 5).name('ParticleSysPosZ');

  scene.add(particleSystem);
  scene.add(particleSystem2);

  window.addEventListener( 'resize', onWindowResize, false );
  
  function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  
    renderer.setSize( window.innerWidth, window.innerHeight );  
  } 

  function render() {
    renderer.render(scene, camera);
  }

  function animate() {
    // Wait for mesh to load, then rotate
    if (mesh) {
      mesh.rotation.x += 0.001;
      mesh.rotation.y += 0.003;
      mesh.rotation.z += 0.005;  
    }

    var time = Date.now() * 0.000005;
    for (var i = 0; i < scene.children.length; i++) {
      var object = scene.children[i];
      if (object instanceof THREE.Points) {
        object.rotation.x = time * (i < 4 ? i + 1 : - (i + 1));
        object.rotation.y = time * (i < 4 ? i + 1 : - (i + 1));
        object.rotation.z = time * (i < 4 ? i + 1 : - (i + 1));
      }
    }

    controls.update();
    requestAnimationFrame(animate);
    render();    
    
  }
 
  animate();
  