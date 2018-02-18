/*
 * NOTES:
 * 
 * Shaders extracted using spector.js
 * 
 * Flat shading: is turned on by adding a #define FLAT_SHADED
 * 
 * Wireframe: probably uses same shader but a LINES draw call
 */

const W = 1280;
const H = 720;

let renderer, scene, camera;
let controls; // eslint-disable-line no-unused-vars

main();


function main() {
  
  setup(); // set up scene
  
  loop(); // start game loop
  
}


function setup() {
  
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize( W, H );
  renderer.setPixelRatio( window.devicePixelRatio );
  document.body.appendChild( renderer.domElement );
  
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, W / H, 0.01, 1000 );
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  camera.position.z = 2;
  
  let geo = new THREE.TorusBufferGeometry( 1, 0.3, 100, 100 );
  // let mesh_phong = new THREE.MeshPhongMaterial({ color: 0x1e90ff, wireframe: false, flatShading:false, emissive:0x1e90ff, emissiveIntensity:0.03 });
  // let mesh_phong = new THREE.MeshPhongMaterial({ color: 0x1e90ff, wireframe: true, flatShading:false, emissive:0x1e90ff, emissiveIntensity:0.03 });
  let mesh_phong = new THREE.MeshPhongMaterial({ color: 0x1e90ff, wireframe: false, flatShading:true, emissive:0x1e90ff, emissiveIntensity:0.03 });
  let mesh = new THREE.Mesh( geo, mesh_phong );
  scene.add( mesh );
  
  let light = new THREE.DirectionalLight( 0xffffff );
  scene.add( light );
  
}


function loop(time) { // eslint-disable-line no-unused-vars
  
  requestAnimationFrame( loop );
  renderer.render( scene, camera );
  
}


document.addEventListener('keydown', e => {
  // console.log(e.key, e.keyCode, e);
  
  if (e.key == 'f') { // f .. fullscreen
    if (!document.webkitFullscreenElement) {
      document.querySelector('body').webkitRequestFullscreen();
    } else { document.webkitExitFullscreen(); }
  }
  
});
