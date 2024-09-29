import * as THREE from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { Wireframe } from "three/examples/jsm/Addons.js";
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
    const material = new THREE.MeshNormalMaterial({
      // color: new THREE.Color().setStyle(0x00ff00),
      // opacity: path.userData.style.fillOpacity,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      // wireframe: true,
      // color: 0x00ff00,
      side: THREE.DoubleSide,
      depthWrite: 2,
      // blendColor: 0xff0000,
    });

    const extrudeSettings = {
      depth: 25,
      bevelEnabled: true,
      bevelSegments: 10,
      steps: 100,
      bevelSize: 2,
      // bevelThickness: 20,
      wireframe: true,
    };

    // const materialNormal = new THREE.MeshNormalMaterial({
    //   displacementMap: displacementMap,
    //   displacementScale: SCALE,
    //   displacementBias: BIAS,

    //   normalMap: normalMap,
    //   normalScale: new THREE.Vector2(1, -1),

    //   //flatShading: true,

    //   side: THREE.DoubleSide,
    // });

    const shapes = SVGLoader.createShapes(path);
    for (let j = 0; j < shapes.length; j++) {
      const shape = shapes[j];
      // const geometry = new THREE.ShapeGeometry(shape);
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      // const depth = 20;
      // mesh.position( x, y, z - 125; ) ;
      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
    }
    group.scale.y *= -1;

    // group.color = 0xffffff;
    // node.setAttribute("stroke", "black");
    // node.setAttribute("fill", "red");

    const box = new THREE.Box3().setFromObject(group);
    const size = new THREE.Vector3();
    box.getSize(size);

    const yOffset = size.y / -2.975;
    const xOffset = size.x / -2.75;

    // Offset all of group's elements, to center them
    group.children.forEach((item) => {
      item.position.x = xOffset;
      item.position.y = yOffset;
    });
    const directionalLight = new THREE.DirectionalLight(0x000000, 0.5);
    scene.add(directionalLight);
    scene.add(group);
    // renderer.render(scene, camera);
    group.rotation.y += 0.205; // UNCOMMENT to ROTATE
  }

  function animate() {
    renderer.render(scene, camera);

    // Rotate out group
    group.rotation.y += 0.023; // UNCOMMENT to ROTATE
    requestAnimationFrame(animate);
  }
  animate();
});
