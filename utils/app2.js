import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { createNoise3D } from 'simplex-noise';


export function initializeThreeJS(mountPoint) {
// Initialize the noise generator
const noise3DFunction = createNoise3D();

let mouseRadius = 0.1; // Adjust this value as needed
let mouseStrength = 0.05; // Adjust this value as needed, if not defined elsewhere

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.2);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });  // enable alpha channel
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);  // the second parameter is the alpha (0 means fully transparent)

mountPoint.appendChild(renderer.domElement);


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
mouseRadius = 0.2;
mouseStrength = 0.03;
let raycaster = new THREE.Raycaster();

const cameraParallaxFactor = 0.5;

window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.z = 0.5;

    raycaster.setFromCamera(mouse, camera);

    if (!raycaster.ray) {
        console.error('Raycaster ray is not initialized.');
        return; // Exit the function early to prevent further errors
    }

    let intersectPoint = new THREE.Vector3();
    raycaster.ray.at(1.3, intersectPoint);

    camera.position.x += (intersectPoint.x * cameraParallaxFactor - camera.position.x) * 0.05;
    camera.position.y += (-intersectPoint.y * cameraParallaxFactor - camera.position.y) * 0.05;
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
    const resolutionFactor = 2;

    const particleTexture = textureLoader.load('particles2.png');
    const particlesGeometry = new THREE.BufferGeometry();
    const particleVertices = [];
    const particleColors = [];
    const originalPositions = [];
    const increasedBrightness = 0.65; // Place this before the loop

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
                particleColors.push((r / 255) * increasedBrightness * 0.8, (g / 255) * increasedBrightness, (b / 255) * increasedBrightness);
            }
            particleColors.push(1, 0, 0); // Set RGB values to (1, 0, 0) for red
            particleColors.push(0xfc / 255, 0x45 / 255, 0x26 / 255); // Set RGB values to #fc4526
        }
    }

    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particleVertices, 3));
    particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        map: particleTexture,
        vertexColors: true,
        transparent: true,
        opacity: 2.8, // Adjust this value


    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);

    scene.add(particles);


    const radius = 5; // Replace with the desired radius of the circle
    const segments = 32; // Replace with the desired number of segments to approximate the circle

    const circleTexture = textureLoader.load('backgroundalbum.png');
    const circleMaterial = new THREE.MeshBasicMaterial({ map: circleTexture });
    const circleGeometry = new THREE.CircleGeometry(radius, segments);
    const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);
    circleMesh.position.set(0, 0, -2);
    circleMesh.rotation.set(0, 0, 0);
    //scene.add(circleMesh);

    textureLoader.load('circle20.png', (imageTexture) => {
        const scale = 4;
        const imgWidth = imageTexture.image.width * scale;
        const imgHeight = imageTexture.image.height * scale;
        
        const canvas = document.createElement('canvas');
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        const context = canvas.getContext('2d');
        
        context.drawImage(imageTexture.image, 0, 0, imgWidth, imgHeight);
    
        const imgData = context.getImageData(0, 0, imgWidth, imgHeight).data;
        const resolutionFactor = 1; // Increase this value for a more pixelated effect
    
        const particleTexture = textureLoader.load('particleswhite.png');        const particlesGeometry = new THREE.BufferGeometry();
        const particleVertices = [];
        const particleColors = [];
        const originalPositions = [];
        const increasedBrightness = 0.4; // Place this before the loop
    
        for (let y = 0; y < imgHeight; y += resolutionFactor) {
            for (let x = 0; x < imgWidth; x += resolutionFactor) {
                const index = (y * imgWidth + x) * 4;
                const r = imgData[index];
                const g = imgData[index + 1];
                const b = imgData[index + 2];
        
                const brightness = 0.7152 * r + 0.2126 * g + 0.0722 * b;
                if (brightness > 128) {
                    const xPos = ((x / imgWidth - 0.5) * 2) * scale;  // multiply by scale
                    const yPos = ((y / imgHeight - 0.5) * -2) * scale;  // multiply by scale
                    const zPos = -1; // Adjust this value to set the particles further back
                    particleVertices.push(xPos, yPos, zPos);
                    originalPositions.push(xPos, yPos, zPos);
                    particleColors.push(1, 1, 1); // Set RGB values to white
                }
            }
        }
        
        particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particleVertices, 3));
        particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({ 
            size: 0.02, // Increase this value for a more pixelated effect
            map: particleTexture, 
            vertexColors: true, 
            transparent: true,
            opacity: 0.01, // Adjust this value
            color: new THREE.Color(1, 1, 1) // White

        });
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        
        scene.add(particles);
    });
    
// 1. Load the fire texture
const fireTexture = new THREE.TextureLoader().load('circle4.png');

// 2. Create the particle system material
const fireMaterial = new THREE.PointsMaterial({
    map: fireTexture,
    blending: THREE.AdditiveBlending,
    size: 0.1,  // Increase the size for overlap
    transparent: true,
    opacity: 0.05,
    vertexColors: true,
    depthWrite: false  // To ensure particles blend properly without depth interference
});

// 3. Create the particle system geometry
const fireGeometry = new THREE.BufferGeometry();
const fireVertices = [];
const fireColors = [];
const fireSizes = [];

for (let i = 0; i < 5000; i++) {  // Increase the number of particles for density
    const x = (Math.random() - 0.5) * 2;
    const y = Math.random() - 2;
    const z = (Math.random() - 0.5) * 2;
    fireVertices.push(x, y, z);

    const hue = 10 + Math.random() * 10;
    const saturation = 80 + Math.random() * 20;
    const lightness = 40 + Math.random() * 2;
    const color = new THREE.Color(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    fireColors.push(color.r, color.g, color.b);
}
fireGeometry.setAttribute('position', new THREE.Float32BufferAttribute(fireVertices, 3));
fireGeometry.setAttribute('color', new THREE.Float32BufferAttribute(fireColors, 3));
fireGeometry.setAttribute('size', new THREE.Float32BufferAttribute(fireSizes, 1)); // NEW: Set varying sizes

const fireParticles = new THREE.Points(fireGeometry, fireMaterial);
scene.add(fireParticles);

// 4. Animate the fire particles in your animate function
function animateFire() {
    const positions = fireGeometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.005 + Math.random() * 0.01; // Add randomness to upward movement
        if (positions[i + 1] > 0.5) {
            positions[i + 1] = -0.5;
        }
        positions[i] += (Math.random() - 0.5) * 0.01; // Add slight randomness to x position for flicker
    }
    fireGeometry.attributes.position.needsUpdate = true;
}
// 1. Load the fire2 texture
const fire2Texture = new THREE.TextureLoader().load('particlesred.png'); // Change the path to the new texture

// 2. Create the particle system material for fire2
const fire2Material = new THREE.PointsMaterial({
    map: fire2Texture,
    blending: THREE.AdditiveBlending,
    size: 0.08,  // Slightly different size for variation
    transparent: true,
    opacity: 0.006,  // Slightly less opacity for variation
    vertexColors: true,
    depthWrite: false
});

// 3. Create the particle system geometry for fire2
const fire2Geometry = new THREE.BufferGeometry();
const fire2Vertices = [];
const fire2Colors = [];
const fire2Sizes = [];

for (let i = 0; i < 4000; i++) {  // Slightly fewer particles for variation
    const x = (Math.random() - 0.5) * 2.5;  // Wider spread
    const y = Math.random() - 1.5;
    const z = (Math.random() - 0.5) * 2.5;  // Wider spread
    fire2Vertices.push(x, y, z);

    const hue = 5 + Math.random() * 15;  // Different color variation
    const saturation = 85 + Math.random() * 15;
    const lightness = 35 + Math.random() * 3;
    const color = new THREE.Color(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    fire2Colors.push(color.r, color.g, color.b);
}
fire2Geometry.setAttribute('position', new THREE.Float32BufferAttribute(fire2Vertices, 3));
fire2Geometry.setAttribute('color', new THREE.Float32BufferAttribute(fire2Colors, 3));
fire2Geometry.setAttribute('size', new THREE.Float32BufferAttribute(fire2Sizes, 1)); 

const fire2Particles = new THREE.Points(fire2Geometry, fire2Material);
scene.add(fire2Particles);

// 4. Animate the fire2 particles in your animate function
function animateFire2() {
    const positions = fire2Geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.004 + Math.random() * 0.009; // Different movement speed
        if (positions[i + 1] > 0.6) {
            positions[i + 1] = -0.6;
        }
        positions[i] += (Math.random() - 0.5) * 0.012; // Different flicker
    }
    fire2Geometry.attributes.position.needsUpdate = true;
}
// Create a red square plane geometry
const squareSize = 4.5; // Adjust the size as needed
const squareGeometry = new THREE.PlaneGeometry(squareSize, squareSize);
const squareMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color

const squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
squareMesh.rotation.x = -Math.PI / 2; // Rotate the square 90 degrees to lay it flat
squareMesh.position.set(0, -2.7, 0); // Adjust the y-value to set the height of the ground
scene.add(squareMesh);

    // Then, in your animate function:
    function animate() {
        animateFire();
        animateFire2();
        const positions = particlesGeometry.attributes.position.array;
        const time = Date.now() * 0.0001;  // adjust the multiplier to control the speed of the animation

        for (let i = 0; i < positions.length; i += 3) {
            let particlePos = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
            let originalPos = new THREE.Vector3(originalPositions[i], originalPositions[i + 1], originalPositions[i + 2]);

            // Calculate the distance between the particle and the mouse
            let distanceToMouse = particlePos.distanceTo(mouse);

            // If the distance is less than the mouseRadius, move the particle towards the mouse
            if (distanceToMouse < mouseRadius) {
                particlePos.lerp(mouse, mouseStrength);
            } else {
                // Otherwise, move the particle back to its original position
                particlePos.lerp(originalPos, 0.05);
            }

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
}