import * as THREE from 'js/three.module.js';
import { ARButton } from 'js/ARButton.js';
import { GLTFLoader } from 'js/GLTFLoader.js';

let camera, scene, renderer, model;
let controller;

init();
loadModel();
animate();

function init(){

    scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.xr.enabled = true;
        document.body.appendChild(renderer.domElement);

        document.body.appendChild(
            ARButton.createButton(renderer, {
                requiredFeatures: ['Test']
            })
        );

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    controller = renderer.xr.getController(0);
    controller.addEventListener('select', onSelect);
    scene.add(controller);

    window.addEventListener('resize', onWindowsResize);
}

function loadModel(){
    const loader = new GLTFLoader();
    loader.load('models/slime.glb', function(gltf) {
    model = gltf.scene;
    model.scale.set(0.1, 0.1, 0.1);
    model.visible = false;
    scene.add(model);
});
}

function onSelect(){
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshStandardMaterial({ color: 0xf27f5d });

    const cube = new THREE.Mesh(geometry, material);

    cube.position.setFromMatrixPosition(controller.matrixWorld);
    cube.quaternion.setFromRotationMatrix(controller.matrixWorld);
    scene.add(cube);
}

function animate(){
    renderer.setAnimationLoop(render);
}

function render(){
    renderer.render(scene, camera);
}

function onWindowsResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

