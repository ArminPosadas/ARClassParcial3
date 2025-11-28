//correcciones para visualizacion xD
console.log("printea el cuadro");
//declaracion de pantalla
const width = window.innerWidth, height = window.innerHeight;
//declaramos camara
const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 1;
//declaramos y creamos escena
const scene = new THREE.Scene();
//se genera un elemento 3D en este ejemplo es un cubo 
const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
const material = new THREE.MeshNormalMaterial();
//asignando el mesh y su material a escena
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
//rendereo de imagen
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setClearColor(0x6b84ff);
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );
//funciones, caso ejemplo animacion de rotacion
function animate( time ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	renderer.render( scene, camera );
}