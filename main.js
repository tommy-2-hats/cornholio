import * as THREE from "three";
// import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00ff00);

const camera = new THREE.PerspectiveCamera(
  20,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

camera.position.set(0, 0, 10);
// camera.lookAt(0, 3, 12);
// console.log(scene);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const cube = new THREE.Mesh(geometry, material);
const renderer = new THREE.WebGLRenderer();
scene.add(cube);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

console.log(THREE);
renderer.render(scene, camera);
