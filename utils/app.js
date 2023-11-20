import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { createNoise3D } from 'simplex-noise';

export function initializeThreeJS(mountPoint) {
    // Initialize the noise generator
    const noise3DFunction = createNoise3D();

    const mouseRadius = 0.1; // Adjust this value as needed
const mouseStrength = 0.05; // Adjust this value as needed, if not defined elsewhere


    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    mountPoint.appendChild(renderer.domElement);

    // Initialize the Effect Composer
    const composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomOptions = {
        strength: 2.5,
        radius: 0.6,
        threshold: 0
    };
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), bloomOptions.strength, bloomOptions.radius, bloomOptions.threshold);
    composer.addPass(bloomPass);

    // Define the textureLoader here
const textureLoader = new THREE.TextureLoader();

    let mouse = new THREE.Vector2(10000, 10000);
    let raycaster = new THREE.Raycaster();

    const cameraParallaxFactor = 0.5;

    window.addEventListener('mousemove', (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        mouse.z = getAverageParticleZ();
    
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
    // Define particlesGeometry in the outer scope
let particlesGeometry;

textureLoader.load('skrillex2023logo.png', (imageTexture) => {
    // ...
  //  particlesGeometry = new THREE.BufferGeometry();
    // ...
});
    function getAverageParticleZ() {
        if (!particlesGeometry) {
            return 0;
        }
        const positions = particlesGeometry.attributes.position.array;
        let totalZ = 0;
        for (let i = 2; i < positions.length; i += 3) {
            totalZ += positions[i];
        }
        return totalZ / (positions.length / 3);
    }
    window.addEventListener('touchstart', handleTouch);
    window.addEventListener('touchmove', handleTouch);
    
    function handleTouch(e) {
        e.preventDefault();
        
        if (e.touches.length > 0) {
            const touch = e.touches[0];

            mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
            mouse.z = getAverageParticleZ();

            raycaster.setFromCamera(mouse, camera);
            
            const intersectPoint = raycaster.ray.at(1.3);

            camera.position.x += (intersectPoint.x * cameraParallaxFactor - camera.position.x) * 0.05;
            camera.position.y += (-intersectPoint.y * cameraParallaxFactor - camera.position.y) * 0.05;
            camera.lookAt(scene.position);
        }
        // Add a new function to calculate the average z-coordinate of all particles

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
    const resolutionFactor = 4;

    const particleTexture = textureLoader.load('particles2.png');
    const particlesGeometry = new THREE.BufferGeometry();
    const particleVertices = [];
    const particleColors = [];
    const originalPositions = [];
    const increasedBrightness = 2.25; // Place this before the loop

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
//particleColors.push(1, 0, 0); // Set RGB values to (1, 0, 0) for red

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


    const radius = 1; // Replace with the desired radius of the circle
const segments = 32; // Replace with the desired number of segments to approximate the circle
    
    const circleTexture = textureLoader.load('circle4.png');
    const circleMaterial = new THREE.MeshBasicMaterial({ map: circleTexture });
    const circleGeometry = new THREE.CircleGeometry(radius, segments);
    const circleMesh = new THREE.Mesh(circleGeometry, circleMaterial);
    circleMesh.position.set(0, 0, -2);
        circleMesh.rotation.set(0, 0, 0);
//scene.add(circleMesh);

// Then, in your animate function:
function animate() {
    const positions = particlesGeometry.attributes.position.array;
    const time = Date.now() * 0.0001;  // adjust the multiplier to control the speed of the animation

    for (let i = 0; i < positions.length; i += 3) {
        let particlePos = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]);
        let originalPos = new THREE.Vector3(originalPositions[i], originalPositions[i + 1], originalPositions[i + 2]);

        // Calculate the distance between the particle and the mouse
        let distanceToMouse = particlePos.distanceTo(mouse);

        // If the distance is less than the mouseRadius, move the particle towards the mouse
        if (distanceToMouse < mouseRadius) {
            particlePos.lerp(new THREE.Vector3(mouse.x, mouse.y, particlePos.z), mouseStrength);
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