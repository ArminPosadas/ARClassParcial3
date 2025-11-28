//declaramos escena
const scene = new THREE.scene();
//camara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
//declaracioon o llamado de rendering
const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
//luces 
//dentro de la declaracion asignamos el color de la luz y en intensidad se controla de 0 a 1 donde 0 es mino y 1 maximo
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 5, 1);
scene.add(light);
//realizamos carga de modelo
const loader = new THREE.GLTFLoader();
loader.load(
    'models/Slime.gltf',    
    function(gltf){
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        scene.add(model);
    },
    function(error){

        console.error("no se cargo",error);
    }
);
//ajustamos a pantalla
window.addEventListener('resize', () =>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.UpdateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});