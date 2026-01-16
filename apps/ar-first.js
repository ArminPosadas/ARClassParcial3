import * as THREE from "js/three.module.js";
import { ARButton } from "js/ARButton.js";
import { GLTFLoader } from "js/GLTFLoader.js";

let camera, scene, renderer;
let controller;
let model;

init();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        20
    );

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;

    document.body.appendChild(renderer.domElement);
    document.body.appendChild(ARButton.createButton(renderer));

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    controller = renderer.xr.getController(0);
    controller.addEventListener("select", onSelect);
    scene.add(controller);

    loadModel();

    window.addEventListener("resize", onWindowResize);

    animate();
}

function loadModel() {
    const loader = new GLTFLoader();

    loader.load(
        "models/model.gltf",
        (gltf) => {
            model = gltf.scene;
            model.scale.set(0.2, 0.2, 0.2);
            model.visible = false; // shown when user taps
            scene.add(model);
        },
        undefined,
        (error) => {
            console.error("Error loading model:", error);
        }
    );
}

function onSelect() {
    if (!model) return;

    model.visible = true;

    model.position.setFromMatrixPosition(controller.matrixWorld);
    model.quaternion.setFromRotationMatrix(controller.matrixWorld);
}

function animate() {
    renderer.setAnimationLoop(render);
}

function render() {
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
