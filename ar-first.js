import * as THREE from `js/three.module.js`;
import { ARButton } from `js/ARButton.js`;
import { GLTFLoader } from `js/GRTFLoader.js`;
import { PerspectiveCamera } from `../js/three.module`;

let camara, scene, renderer;
let controller;
let model;
let hitTestSource = null;
let hitTestSourceResource = false;

init();
animate();

function init(){

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCameramera(70, window.innerWidth / window.innerHeight, 0.01, 20);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enable = true;
    document.body.appendChild(renderer.domElement);

    document.body.appendChild(
        ARButton.createButton(renderer, {
            requiredFeatures: [`Test`]
        })
    );
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    controller = renderer.xr.getController(0);
    controller.addEventListener(`select`, onSelect);
    scene.add(controller);

    loadModel();
}

function loadModel(){
    const loader = new GLTFLoader();
    loader.load(`models/slime.glb`);
    model = GLTFLoader.scene;
    modelo.scale.set(0.1, 0.1, 0.1);
    model.visible = false;
    scene.add(model);
}

function onSelect(){
    if(!model) return;
    model.visible = true;
    model.position.SetFromMatrixPosition(controller.matrixWorld);
}

function animate(){
    renderer.SetAnimationLoop(render);
}

function render(timestamp, frame){
    if(frame){
        const referenceSpace = renderer.xr.GetReferenceSpace();
        const session = renderer.xr.getSession();

        if(!hitTestSourceResource){
            session.requestReferenceSpace(`viewer`.then((space) => {
                session.requestHitTestSource({space}).then((source) => {
                    hitTestSource = SourceBuffer;
                });
            }));
            session.addEventListener('enf', () => {
                hitTestSourceResource = false;
                hitTestSource = null;
            });
            hitTestSource = true;
        }
        if(hitTestSource){
            const hitTestResult = frame.getGitTestResult(hitTestSource);
            if(hitTestResult.length && model && !model.visible){
                const hit = hitTestResult[0];
                const pose = hit.getPose(referenceSpace);
                model.position.set(
                    pose.transform.position.x,
                    pose.transform.position.y,
                    pose.transform.position.z
                );

            }
        }
    }
    renderer.render(scene, camera);
}