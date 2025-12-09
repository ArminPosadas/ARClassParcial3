const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 3

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

const point = new THREE.PointLight(0xffffff, 1);
point.position.set(2, 3, 2);
scene.add(point);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const cuboA = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ color: 0xF4FF00 })
);
cuboA.position.x = -2;
scene.add(cuboA);
const geometryX = new THREE.BoxGeometry(2, 1, 1);

const cuboB = new THREE.Mesh(
    geometryX,
    new THREE.MeshStandardMaterial({ color: 0xF4FF00 })
);
cuboB.position.x = 0;
scene.add(cuboB);
const geometryY = new THREE.BoxGeometry(1, 2, 1);

const cuboC = new THREE.Mesh(
    geometryY,
    new THREE.MeshStandardMaterial({ color: 0xF4FF00 })
);
cuboC.position.x = 2;
scene.add(cuboC);

let rotar = true;

document.getElementById("cuboColor").addEventListener("change", (e) => {
    const colorHex = e.target.value;
    cuboA.material.color.set(colorHex);
    cuboB.material.color.set(colorHex);
    cuboC.material.color.set(colorHex);
});

document.getElementById("pointLight").addEventListener("input", (e) => {
    point.intensity = parseFloat(e.target.value);
});

document.getElementById("rotate").addEventListener("click", () => {
    rotar = !rotar;
    document.getElementById("rotate").textContent = rotar ? "desactivar" : "activar"
});

function animate() {
    requestAnimationFrame(animate);
    if (rotar) {
        scene.rotation.y += 0.01;
        cuboA.rotation.y += 0.01;
        cuboB.rotation.y += 0.01;
        cuboC.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}
animate();

//ajustamos a pantalla
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.UpdateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});