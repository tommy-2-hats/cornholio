import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xb0b0b0);
// console.log(scene);

const helper = new THREE.GridHelper(160, 10, 0x8d8d8d, 0xc1c1c1);
scene.add(helper);
helper.rotation.x = Math.PI / 2;
// console.log(helper);a

// instantiate a loader
const loader = new SVGLoader();

// load a SVG resource
loader.load(
  // resource URL
  "assets/images/svg/shutter.svg",
  // called when the resource is loaded
  function (data) {
    const paths = data.paths;
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
    }

    scene.add(group);
  }
  // called when loading is in progresses
  // function ( xhr ) {

  // 	console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

  // },
  // // called when loading has errors
  // function ( error ) {

  // 	console.log( 'An error happened' );

  // }
);

// const loader = new SVGLoader();
// console.log(loader);

// loader.load( url, function ( /*data*/ ) {
//         // scene.add(data);
// 				const group = new THREE.Group();
// 				group.scale.multiplyScalar( 0.25 );
// 				group.position.x = - 70;
// 				group.position.y = 70;
// 				group.scale.y *= - 1;

// 				let renderOrder = 0;
