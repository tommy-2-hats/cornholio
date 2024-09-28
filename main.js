import * as THREE from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
THREE.Cache.enabled = true;
// console.log(scene);
const container = document.getElementById("container");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x00ff00);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  200,
  window.innerWidth / window.innerHeight,
  1,
  200
);
camera.position.set(100, 100, 200);
camera.po;

window.addEventListener("resize", onWindowResize);

// instantiate a loader
const loader = new SVGLoader();

// load a SVG resource
loader.load(
  // resource URL
  "assets/images/svg/AUC_large_black.svg",
  // called when the resource is loaded
  function (data) {
    const paths = data.paths;
    const group = new THREE.Group();

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];

      const material = new THREE.MeshBasicMaterial({
        // color: path.color,
        side: THREE.DoubleSide,
        depthWrite: true,
      });

      const shapes = SVGLoader.createShapes(path);

      for (let j = 0; j < shapes.length; j++) {
        const shape = shapes[j];
        const geometry = new THREE.ShapeGeometry(shape);
        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
      }
    }
    scene.add(group);
    console.log(group);
  }
);
render();
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function render() {
  renderer.render(scene, camera);
}
