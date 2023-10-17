import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js";
import { EffectComposer } from "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/jsm/postprocessing/UnrealBloomPass.js";
import { createNoise3D } from './node_modules/simplex-noise/dist/esm/simplex-noise.js';

// Initialize the noise generator
const noise3DFunction = createNoise3D();

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });  // enable alpha channel
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);  // the second parameter is the alpha (0 means fully transparent)

document.body.appendChild(renderer.domElement);


// Initialize the Effect Composer
const composer = new EffectComposer(renderer);

const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const bloomOptions = {
    strength: 2.5,   // increased strength
    radius: 0.6,     // increased radius for a broader glow
    threshold: 0   // decreased threshold to make more particles bloom
};
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), bloomOptions.strength, bloomOptions.radius, bloomOptions.threshold);
composer.addPass(bloomPass);
// Load the image texture
const textureLoader = new THREE.TextureLoader();

let mouse = new THREE.Vector2(10000, 10000);
let mouseRadius = 0.2;
let mouseStrength = 0.03;
let raycaster = new THREE.Raycaster();

const cameraParallaxFactor = 0.5;

window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.z = 0.5;  // depth factor to project into the scene

    raycaster.setFromCamera(mouse, camera);
    mouse = raycaster.ray.at(1.3);  // the z-position where the particles are

    // Apply Parallax effect to camera based on mouse movement
    camera.position.x += (mouse.x * cameraParallaxFactor - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y * cameraParallaxFactor - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
});
window.addEventListener('touchstart', handleTouch);
window.addEventListener('touchmove', handleTouch);
function handleTouch(e) {
    e.preventDefault();  // Prevents the default behavior of touch events (like scrolling)
    
    // Check if there's at least one touch
    if (e.touches.length > 0) {
        const touch = e.touches[0];

        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
        mouse.z = 0.5;  // depth factor to project into the scene

        raycaster.setFromCamera(mouse, camera);
        mouse = raycaster.ray.at(1.3);  // the z-position where the particles are
    }
    // Apply Parallax effect to camera based on touch movement
    camera.position.x += (mouse.x * cameraParallaxFactor - camera.position.x) * 0.05;
    camera.position.y += (-mouse.y * cameraParallaxFactor - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
}
const scale = 1; // Adjust this value for your desired scale. E.g., 0.5 means the image will be 50% smaller

textureLoader.load('skrillex2023logo.png', (imageTexture) => {
    const imgWidth = imageTexture.image.width * scale;
    const imgHeight = imageTexture.image.height * scale;
    
    const canvas = document.createElement('canvas');
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    const context = canvas.getContext('2d');
    
    context.drawImage(imageTexture.image, 0, 0, imgWidth, imgHeight);

    const imgData = context.getImageData(0, 0, imgWidth, imgHeight).data;
    const resolutionFactor = 1;

    const particleTexture = textureLoader.load('particles2.png');
    const particlesGeometry = new THREE.BufferGeometry();
    const particleVertices = [];
    const particleColors = [];
    const originalPositions = [];
    const increasedBrightness = 1.25; // Place this before the loop

    for (let y = 0; y < imgHeight; y += resolutionFactor) {
        for (let x = 0; x < imgWidth; x += resolutionFactor) {
            const index = (y * imgWidth + x) * 4;
            const r = imgData[index];
            const g = imgData[index + 1];
            const b = imgData[index + 2];

            const brightness = 0.7152 * r + 0.2126 * g + 0.0722 * b;
            if (brightness > 128) {
                const xPos = (x / imgWidth - 0.5) * 2;
                const yPos = (y / imgHeight - 0.5) * -2;
                particleVertices.push(xPos, yPos, 0);
                originalPositions.push(xPos, yPos, 0);
particleColors.push((r / 255) * increasedBrightness * 0.8, (g / 255) * increasedBrightness, (b / 255) * increasedBrightness);            }
        }
    }

    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particleVertices, 3));
    particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));

    const particlesMaterial = new THREE.PointsMaterial({ 
        size: 0.05, 
        map: particleTexture, 
        vertexColors: true, 
        transparent: true,
        opacity: 1, // Adjust this value
        

    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);




// Then, in your animate function:
function animate() {
    const positions = particlesGeometry.attributes.position.array;
    const time = Date.now() * 0.0001;  // adjust the multiplier to control the speed of the animation

    for (let i = 0; i < positions.length; i += 3) {
        let particlePos = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
        let originalPos = new THREE.Vector3(originalPositions[i], originalPositions[i + 1], originalPositions[i + 2]);

        // Use the noise function to get a smooth, varying value for each particle
        const noiseValue = noise3DFunction(particlePos.x, particlePos.y, time);


        // Use the noise value to adjust the position of the particle
        particlePos.z += noiseValue * 0.01;  // adjust the multiplier to control the amplitude of the animation

        positions[i] = particlePos.x;
        positions[i + 1] = particlePos.y;
        positions[i + 2] = particlePos.z;
    }
        particlesGeometry.attributes.position.needsUpdate = true;

        //renderer.render(scene, camera);
        composer.render();
        requestAnimationFrame(animate);
    }

    animate();
});

camera.position.z = 1.38;

window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
    composer.setSize(newWidth, newHeight);
});