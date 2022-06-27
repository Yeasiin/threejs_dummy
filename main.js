import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const bgCanvas = document.getElementById("background");

// Camera #1
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  100
);

camera.position.z = 3;

// Renderer #2
const renderer = new THREE.WebGLRenderer({ canvas: bgCanvas });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);

// Scene #3
const scene = new THREE.Scene();

// Shapes
const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xffc0ad,
});

const torus = new THREE.Mesh(geometry, material);
torus.position.setX(-2);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(3, 3, 3);
scene.add(pointLight);

// Moon
const earthTexture = new THREE.TextureLoader().load("earth_daymap.jpg");
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 62, 32),
  new THREE.MeshBasicMaterial({ map: earthTexture })
);

scene.add(earth);

const boxTexture = new THREE.TextureLoader().load("crate.gif");
const crate = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ map: boxTexture })
);
crate.position.setX(2);
scene.add(crate);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

/*
// grid helper
const gridHelper = new THREE.GridHelper(10, 150);
// light helper
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper, gridHelper);
*/

// Move Camera on scroll
/* function moveCamera() {
  const fromTop = document.body.getBoundingClientRect().top;
  console.log(fromTop);
}
document.body.onscroll = moveCamera; */

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  earth.rotation.x += 0.01;
  earth.rotation.y += 0.01;
  earth.rotation.z += 0.01;

  crate.rotation.x -= 0.01;
  crate.rotation.y -= 0.01;
  crate.rotation.z -= 0.01;

  controls.update();
  renderer.render(scene, camera);
}

requestAnimationFrame(animate);
