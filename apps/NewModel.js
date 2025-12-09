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
        
        scene.add(cube);
        cubes.push(cube);
    }
}

// Variables para controles (alineadas con el HTML existente)
let cubeColors = [0xffffff, 0xffffff, 0xffffff]; // Blanco inicial para todos
let lightIntensity = 1;

// Función para cambiar color de cubos
function updateCubeColors(colorHex) {
    const color = parseInt(colorHex.replace('#', '0x'));
    cubes.forEach(cube => {
        cube.material.color.setHex(color);
    });
}

// Función para cambiar intensidad de luz
function updateLightIntensity(value) {
    directionalLight.intensity = parseFloat(value);
    lightIntensity = parseFloat(value);
}

// Función para alternar rotación
function toggleRotation() {
    isRotating = !isRotating;
    return isRotating;
}

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

// Inicializar controles cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar cubos
    createCubes();
    
    // Configurar controles del HTML existente
    const cubeColorInput = document.getElementById('cubeColor');
    const lightSlider = document.getElementById('pointLight');
    const rotateButton = document.getElementById('rotate');
    
    if (cubeColorInput) {
        cubeColorInput.addEventListener('input', function(e) {
            updateCubeColors(e.target.value);
        });
    }
    
    if (lightSlider) {
        lightSlider.addEventListener('input', function(e) {
            updateLightIntensity(e.target.value);
        });
    }
    
    if (rotateButton) {
        rotateButton.addEventListener('click', function() {
            const isActive = toggleRotation();
            // Opcional: cambiar texto del botón para reflejar estado
            rotateButton.textContent = isActive ? 'Desactivar Rotación' : 'Activar Rotación';
        });
    }
    
    // Iniciar animación
    animate();
});
