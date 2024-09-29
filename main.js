import * as THREE from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// THREE.Cache.enabled = true;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xb0b0b0);

const ratio = window.innerWidth / window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(100, ratio, 0.01, 1000);
camera.position.z = 300;

document.querySelector("body").appendChild(renderer.domElement);

// Resize and update camera
window.addEventListener("resize", function (e) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Axes helper
const helper = new THREE.GridHelper(160, 10, 0x8d8d8d, 0xc1c1c1);
helper.rotation.x = Math.PI / 2;
scene.add(helper);
const axesHelper = new THREE.AxesHelper(500);
scene.add(axesHelper);

// renderer.render(scene, camera);

const loader = new SVGLoader();
loader.load("assets/images/svg/DOM.svg", function (svgImage) {
  const paths = svgImage.paths;
  const group = new THREE.Group();
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];

    const material = new THREE.MeshBasicMaterial({
      color: path.color,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const shapes = SVGLoader.createShapes(path);

    for (let j = 0; j < shapes.length; j++) {
      const shape = shapes[j];
      const geometry = new THREE.ShapeGeometry(shape);
      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
    }

    group.scale.y *= -1;

    const box = new THREE.Box3().setFromObject(group);
    const size = new THREE.Vector3();
    box.getSize(size);

    const yOffset = size.y / -2.975;
    const xOffset = size.x / -2.975;

    // Offset all of group's elements, to center them
    group.children.forEach((item) => {
      item.position.x = xOffset;
      item.position.y = yOffset;
    });
    console.log(group);
    scene.add(group);
    renderer.render(scene, camera);
  }
});
