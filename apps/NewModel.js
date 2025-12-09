// Declaramos escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Cámara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 10);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Luces
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Variables globales
let cubes = [];
let isRotating = true;
const cubeMaterials = [0xff0000, 0x00ff00, 0x0000ff]; // Colores iniciales: rojo, verde, azul

// Crear 3 cubos
function createCubes() {
    cubes.forEach(cube => scene.remove(cube)); // Limpiar cubos anteriores

    cubes = [];

    for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({
            color: cubeMaterials[i],
            metalness: 0.3,
            roughness: 0.4
        });

        const cube = new THREE.Mesh(geometry, material);

        // Posicionar los cubos en línea horizontal
        cube.position.x = (i - 1) * 2.5; // -2.5, 0, 2.5
        cube.position.y = 1;

        cube.userData = {
            originalColor: cubeMaterials[i],
            index: i
        };

        scene.add(cube);
        cubes.push(cube);
    }
}

// Cargar modelo GLTF (opcional, mantenemos por si quieres combinar)
const loader = new THREE.GLTFLoader();
loader.load(
    'models/Slime.gltf',
    function (gltf) {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.y = -1; // Colocar debajo de los cubos
        scene.add(model);
    },
    undefined,
    function (error) {
        console.error("No se cargó el modelo GLTF:", error);
    }
);

// Variables para controles
let cubeColors = cubeMaterials.slice(); // Copia de los colores

// Exponer variables globales para interactividad
window.app = {
    cubes: cubes,
    isRotating: isRotating,
    cubeColors: cubeColors,
    toggleRotation: function () {
        isRotating = !isRotating;
        return isRotating;
    },
    setCubeColor: function (index, color) {
        if (cubes[index]) {
            // Convertir color hexadecimal string a número
            const hexColor = parseInt(color.replace('#', '0x'));
            cubes[index].material.color.setHex(hexColor);
            cubeColors[index] = hexColor;
        }
    },
    setLightIntensity: function (intensity) {
        directionalLight.intensity = intensity;
    },
    updateCubes: function () {
        cubes.forEach((cube, index) => {
            cube.material.color.setHex(cubeColors[index]);
        });
    }
};

// Ajustar a pantalla
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animación
function animate() {
    requestAnimationFrame(animate);

    if (isRotating && cubes.length > 0) {
        cubes.forEach((cube, index) => {
            // Rotar cada cubo en el eje X
            cube.rotation.x += 0.01 * (index + 1); // Cada cubo rota a velocidad diferente
        });
    }

    renderer.render(scene, camera);
}

// Inicializar
createCubes();
animate();