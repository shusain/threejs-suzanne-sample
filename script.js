import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 1;

const scene = new THREE.Scene();

// const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
// const material = new THREE.MeshNormalMaterial();

// const mesh = new THREE.Mesh( geometry, material );
// scene.add( mesh );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );


const controls = new TrackballControls( camera, renderer.domElement );
controls.minDistance = 1;
controls.maxDistance = 10;
controls.rotateSpeed= 2

let loadedScene = null

// animation
function animation( time ) {
  controls.update()

	// mesh.rotation.x = time / 2000;
	// mesh.rotation.y = time / 1000;

  // if(loadedScene){
  //   loadedScene.children[0].rotation.x = time / 2000;
  //   loadedScene.children[0].rotation.y = time / 500;
  // }

	renderer.render( scene, camera );
}

renderer.render(scene,camera)

const loader = new GLTFLoader();

loader.load( 'models/test.glb', function ( gltf ) {
  loadedScene = gltf.scene
	scene.add( gltf.scene );
  
  const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
  directionalLight.position.set( - 1, 0, 1 ).normalize();
  scene.add( directionalLight );


  renderer.render(scene,camera)
}, undefined, function ( error ) {

	console.error( error );

} );