"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./utils/app.js":
/*!**********************!*\
  !*** ./utils/app.js ***!
  \**********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initializeThreeJS: function() { return /* binding */ initializeThreeJS; }\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var three_examples_jsm_postprocessing_EffectComposer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/postprocessing/EffectComposer.js */ \"./node_modules/three/examples/jsm/postprocessing/EffectComposer.js\");\n/* harmony import */ var three_examples_jsm_postprocessing_RenderPass_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/postprocessing/RenderPass.js */ \"./node_modules/three/examples/jsm/postprocessing/RenderPass.js\");\n/* harmony import */ var three_examples_jsm_postprocessing_UnrealBloomPass_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/postprocessing/UnrealBloomPass.js */ \"./node_modules/three/examples/jsm/postprocessing/UnrealBloomPass.js\");\n/* harmony import */ var simplex_noise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! simplex-noise */ \"./node_modules/simplex-noise/dist/esm/simplex-noise.js\");\n\n\n\n\n\nfunction initializeThreeJS(mountPoint) {\n    // Initialize the noise generator\n    const noise3DFunction = (0,simplex_noise__WEBPACK_IMPORTED_MODULE_0__.createNoise3D)();\n    const mouseRadius = 30; // Adjust this value as needed\n    const mouseStrength = 45; // Adjust this value as needed, if not defined elsewhere\n    // Set up the scene, camera, and renderer\n    const scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();\n    const camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);\n    const renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer({\n        alpha: true\n    });\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    renderer.setClearColor(0x000000, 0);\n    mountPoint.appendChild(renderer.domElement);\n    // Initialize the Effect Composer\n    const composer = new three_examples_jsm_postprocessing_EffectComposer_js__WEBPACK_IMPORTED_MODULE_2__.EffectComposer(renderer);\n    const renderPass = new three_examples_jsm_postprocessing_RenderPass_js__WEBPACK_IMPORTED_MODULE_3__.RenderPass(scene, camera);\n    composer.addPass(renderPass);\n    const bloomOptions = {\n        strength: 2.5,\n        radius: 0.6,\n        threshold: 0\n    };\n    const bloomPass = new three_examples_jsm_postprocessing_UnrealBloomPass_js__WEBPACK_IMPORTED_MODULE_4__.UnrealBloomPass(new three__WEBPACK_IMPORTED_MODULE_1__.Vector2(window.innerWidth, window.innerHeight), bloomOptions.strength, bloomOptions.radius, bloomOptions.threshold);\n    composer.addPass(bloomPass);\n    // Define the textureLoader here\n    const textureLoader = new three__WEBPACK_IMPORTED_MODULE_1__.TextureLoader();\n    let raycaster = new three__WEBPACK_IMPORTED_MODULE_1__.Raycaster();\n    let mouse = new three__WEBPACK_IMPORTED_MODULE_1__.Vector2();\n    window.addEventListener(\"mousemove\", (e)=>{\n        // Update the mouse position\n        mouse.x = e.clientX / window.innerWidth * imgWidth - imgWidth / 2;\n        mouse.y = -(e.clientY / window.innerHeight) * imgHeight + imgHeight / 2;\n        // Update the raycaster with the mouse position\n        raycaster.setFromCamera(mouse, camera);\n        // Find all particles that intersect with the mouse's ray\n        let intersects = raycaster.intersectObjects(particles);\n        // If there's at least one intersection, the first one is the closest\n        if (intersects.length > 0) {\n            let intersect = intersects[0];\n            // The intersection point is the position where the mouse's ray hits the particle\n            let intersectPoint = intersect.point;\n        // You can now use intersectPoint to interact with the particles\n        }\n    });\n    // Define particlesGeometry in the outer scope\n    let particlesGeometry;\n    textureLoader.load(\"skrillex2023logo.png\", (imageTexture)=>{\n    // ...\n    //  particlesGeometry = new THREE.BufferGeometry();\n    // ...\n    });\n    function getAverageParticleZ() {\n        if (!particlesGeometry) {\n            return 0;\n        }\n        const positions = particlesGeometry.attributes.position.array;\n        let totalZ = 0;\n        for(let i = 2; i < positions.length; i += 3){\n            totalZ += positions[i];\n        }\n        return totalZ / (positions.length / 3);\n    }\n    window.addEventListener(\"touchstart\", handleTouch);\n    window.addEventListener(\"touchmove\", handleTouch);\n    function handleTouch(e) {\n        e.preventDefault();\n        if (e.touches.length > 0) {\n            const touch = e.touches[0];\n            mouse.x = touch.clientX / window.innerWidth * 2 - 1;\n            mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;\n            mouse.z = getAverageParticleZ();\n            raycaster.setFromCamera(mouse, camera);\n            const intersectPoint = raycaster.ray.at(1.3);\n            camera.position.x += (intersectPoint.x * cameraParallaxFactor - camera.position.x) * 0.05;\n            camera.position.y += (-intersectPoint.y * cameraParallaxFactor - camera.position.y) * 0.05;\n            camera.lookAt(scene.position);\n        }\n    // Add a new function to calculate the average z-coordinate of all particles\n    }\n    const scale = 1; // Adjust this value for your desired scale. E.g., 0.5 means the image will be 50% smaller\n    textureLoader.load(\"skrillex2023logo.png\", (imageTexture)=>{\n        const imgWidth1 = imageTexture.image.width * scale;\n        const imgHeight1 = imageTexture.image.height * scale;\n        const canvas = document.createElement(\"canvas\");\n        canvas.width = imgWidth1;\n        canvas.height = imgHeight1;\n        const context = canvas.getContext(\"2d\");\n        context.drawImage(imageTexture.image, 0, 0, imgWidth1, imgHeight1);\n        const imgData = context.getImageData(0, 0, imgWidth1, imgHeight1).data;\n        const resolutionFactor = 4;\n        const particleTexture = textureLoader.load(\"particles2.png\");\n        const particlesGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry();\n        const particleVertices = [];\n        const particleColors = [];\n        const originalPositions = [];\n        const increasedBrightness = 2.25; // Place this before the loop\n        for(let y = 0; y < imgHeight1; y += resolutionFactor){\n            for(let x = 0; x < imgWidth1; x += resolutionFactor){\n                const index = (y * imgWidth1 + x) * 4;\n                const r = imgData[index];\n                const g = imgData[index + 1];\n                const b = imgData[index + 2];\n                const brightness = 0.7152 * r + 0.2126 * g + 0.0722 * b;\n                if (brightness > 128) {\n                    const xPos = (x / imgWidth1 - 0.5) * 2;\n                    const yPos = (y / imgHeight1 - 0.5) * -2;\n                    particleVertices.push(xPos, yPos, 0);\n                    originalPositions.push(xPos, yPos, 0);\n                    particleColors.push(r / 255 * increasedBrightness * 0.8, g / 255 * increasedBrightness, b / 255 * increasedBrightness);\n                }\n            //particleColors.push(1, 0, 0); // Set RGB values to (1, 0, 0) for red\n            }\n        }\n        particlesGeometry.setAttribute(\"position\", new three__WEBPACK_IMPORTED_MODULE_1__.Float32BufferAttribute(particleVertices, 3));\n        particlesGeometry.setAttribute(\"color\", new three__WEBPACK_IMPORTED_MODULE_1__.Float32BufferAttribute(particleColors, 3));\n        const particlesMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.PointsMaterial({\n            size: 0.05,\n            map: particleTexture,\n            vertexColors: true,\n            transparent: true,\n            opacity: 1\n        });\n        const particles1 = new three__WEBPACK_IMPORTED_MODULE_1__.Points(particlesGeometry, particlesMaterial);\n        scene.add(particles1);\n        const radius = 1; // Replace with the desired radius of the circle\n        const segments = 32; // Replace with the desired number of segments to approximate the circle\n        const circleTexture = textureLoader.load(\"circle4.png\");\n        const circleMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({\n            map: circleTexture\n        });\n        const circleGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.CircleGeometry(radius, segments);\n        const circleMesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(circleGeometry, circleMaterial);\n        circleMesh.position.set(0, 0, -2);\n        circleMesh.rotation.set(0, 0, 0);\n        //scene.add(circleMesh);\n        // Then, in your animate function:\n        function animate() {\n            const positions = particlesGeometry.attributes.position.array;\n            const time = Date.now() * 0.0001; // adjust the multiplier to control the speed of the animation\n            for(let i = 0; i < positions.length; i += 3){\n                let particlePos = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(positions[i], positions[i + 1], positions[i + 2]);\n                let originalPos = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(originalPositions[i], originalPositions[i + 1], originalPositions[i + 2]);\n                // Calculate the distance between the particle and the mouse\n                let distanceToMouse = particlePos.distanceTo(mouse);\n                // If the distance is less than the mouseRadius, move the particle towards the mouse\n                if (distanceToMouse < mouseRadius) {\n                    particlePos.lerp(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(mouse.x, mouse.y, particlePos.z), mouseStrength);\n                } else {\n                    // Otherwise, move the particle back to its original position\n                    particlePos.lerp(originalPos, 0.05);\n                }\n                // Use the noise function to get a smooth, varying value for each particle\n                const noiseValue = noise3DFunction(particlePos.x, particlePos.y, time);\n                // Use the noise value to adjust the position of the particle\n                particlePos.z += noiseValue * 0.01; // adjust the multiplier to control the amplitude of the animation\n                positions[i] = particlePos.x;\n                positions[i + 1] = particlePos.y;\n                positions[i + 2] = particlePos.z;\n            }\n            particlesGeometry.attributes.position.needsUpdate = true;\n            //renderer.render(scene, camera);\n            composer.render();\n            requestAnimationFrame(animate);\n        }\n        animate();\n    });\n    camera.position.z = 1.38;\n    window.addEventListener(\"resize\", ()=>{\n        const newWidth = window.innerWidth;\n        const newHeight = window.innerHeight;\n        camera.aspect = newWidth / newHeight;\n        camera.updateProjectionMatrix();\n        renderer.setSize(newWidth, newHeight);\n        composer.setSize(newWidth, newHeight);\n    });\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTlHLE9BQU9nRCxRQUFRLENBQUNRLENBQUMsR0FBRztJQUVwQnRELE9BQU93QixnQkFBZ0IsQ0FBQyxVQUFVO1FBQzlCLE1BQU1rRyxXQUFXMUgsT0FBT0MsVUFBVTtRQUNsQyxNQUFNMEgsWUFBWTNILE9BQU9FLFdBQVc7UUFFcENKLE9BQU84SCxNQUFNLEdBQUdGLFdBQVdDO1FBQzNCN0gsT0FBTytILHNCQUFzQjtRQUU3QjFILFNBQVNHLE9BQU8sQ0FBQ29ILFVBQVVDO1FBQzNCakgsU0FBU0osT0FBTyxDQUFDb0gsVUFBVUM7SUFDL0I7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi91dGlscy9hcHAuanM/YzI0NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcclxuaW1wb3J0IHsgRWZmZWN0Q29tcG9zZXIgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL0VmZmVjdENvbXBvc2VyLmpzXCI7XHJcbmltcG9ydCB7IFJlbmRlclBhc3MgfSBmcm9tIFwidGhyZWUvZXhhbXBsZXMvanNtL3Bvc3Rwcm9jZXNzaW5nL1JlbmRlclBhc3MuanNcIjtcclxuaW1wb3J0IHsgVW5yZWFsQmxvb21QYXNzIH0gZnJvbSBcInRocmVlL2V4YW1wbGVzL2pzbS9wb3N0cHJvY2Vzc2luZy9VbnJlYWxCbG9vbVBhc3MuanNcIjtcclxuaW1wb3J0IHsgY3JlYXRlTm9pc2UzRCB9IGZyb20gJ3NpbXBsZXgtbm9pc2UnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemVUaHJlZUpTKG1vdW50UG9pbnQpIHtcclxuICAgIC8vIEluaXRpYWxpemUgdGhlIG5vaXNlIGdlbmVyYXRvclxyXG4gICAgY29uc3Qgbm9pc2UzREZ1bmN0aW9uID0gY3JlYXRlTm9pc2UzRCgpO1xyXG5cclxuICAgIGNvbnN0IG1vdXNlUmFkaXVzID0gMzA7IC8vIEFkanVzdCB0aGlzIHZhbHVlIGFzIG5lZWRlZFxyXG5jb25zdCBtb3VzZVN0cmVuZ3RoID0gNDU7IC8vIEFkanVzdCB0aGlzIHZhbHVlIGFzIG5lZWRlZCwgaWYgbm90IGRlZmluZWQgZWxzZXdoZXJlXHJcblxyXG5cclxuICAgIC8vIFNldCB1cCB0aGUgc2NlbmUsIGNhbWVyYSwgYW5kIHJlbmRlcmVyXHJcbiAgICBjb25zdCBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xyXG4gICAgY29uc3QgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDc1LCB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCwgMC4xLCAxMDAwKTtcclxuICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoeyBhbHBoYTogdHJ1ZSB9KTtcclxuICAgIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XHJcbiAgICByZW5kZXJlci5zZXRDbGVhckNvbG9yKDB4MDAwMDAwLCAwKTtcclxuXHJcbiAgICBtb3VudFBvaW50LmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG5cclxuICAgIC8vIEluaXRpYWxpemUgdGhlIEVmZmVjdCBDb21wb3NlclxyXG4gICAgY29uc3QgY29tcG9zZXIgPSBuZXcgRWZmZWN0Q29tcG9zZXIocmVuZGVyZXIpO1xyXG5cclxuICAgIGNvbnN0IHJlbmRlclBhc3MgPSBuZXcgUmVuZGVyUGFzcyhzY2VuZSwgY2FtZXJhKTtcclxuICAgIGNvbXBvc2VyLmFkZFBhc3MocmVuZGVyUGFzcyk7XHJcblxyXG4gICAgY29uc3QgYmxvb21PcHRpb25zID0ge1xyXG4gICAgICAgIHN0cmVuZ3RoOiAyLjUsXHJcbiAgICAgICAgcmFkaXVzOiAwLjYsXHJcbiAgICAgICAgdGhyZXNob2xkOiAwXHJcbiAgICB9O1xyXG4gICAgY29uc3QgYmxvb21QYXNzID0gbmV3IFVucmVhbEJsb29tUGFzcyhuZXcgVEhSRUUuVmVjdG9yMih3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KSwgYmxvb21PcHRpb25zLnN0cmVuZ3RoLCBibG9vbU9wdGlvbnMucmFkaXVzLCBibG9vbU9wdGlvbnMudGhyZXNob2xkKTtcclxuICAgIGNvbXBvc2VyLmFkZFBhc3MoYmxvb21QYXNzKTtcclxuXHJcbiAgICAvLyBEZWZpbmUgdGhlIHRleHR1cmVMb2FkZXIgaGVyZVxyXG5jb25zdCB0ZXh0dXJlTG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKTtcclxubGV0IHJheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoKTtcclxubGV0IG1vdXNlID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4ge1xyXG4gICAgLy8gVXBkYXRlIHRoZSBtb3VzZSBwb3NpdGlvblxyXG4gICAgbW91c2UueCA9IChlLmNsaWVudFggLyB3aW5kb3cuaW5uZXJXaWR0aCkgKiBpbWdXaWR0aCAtIGltZ1dpZHRoIC8gMjtcclxuICAgIG1vdXNlLnkgPSAtKGUuY2xpZW50WSAvIHdpbmRvdy5pbm5lckhlaWdodCkgKiBpbWdIZWlnaHQgKyBpbWdIZWlnaHQgLyAyO1xyXG5cclxuICAgIC8vIFVwZGF0ZSB0aGUgcmF5Y2FzdGVyIHdpdGggdGhlIG1vdXNlIHBvc2l0aW9uXHJcbiAgICByYXljYXN0ZXIuc2V0RnJvbUNhbWVyYShtb3VzZSwgY2FtZXJhKTtcclxuXHJcbiAgICAvLyBGaW5kIGFsbCBwYXJ0aWNsZXMgdGhhdCBpbnRlcnNlY3Qgd2l0aCB0aGUgbW91c2UncyByYXlcclxuICAgIGxldCBpbnRlcnNlY3RzID0gcmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdHMocGFydGljbGVzKTtcclxuXHJcbiAgICAvLyBJZiB0aGVyZSdzIGF0IGxlYXN0IG9uZSBpbnRlcnNlY3Rpb24sIHRoZSBmaXJzdCBvbmUgaXMgdGhlIGNsb3Nlc3RcclxuICAgIGlmIChpbnRlcnNlY3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBsZXQgaW50ZXJzZWN0ID0gaW50ZXJzZWN0c1swXTtcclxuXHJcbiAgICAgICAgLy8gVGhlIGludGVyc2VjdGlvbiBwb2ludCBpcyB0aGUgcG9zaXRpb24gd2hlcmUgdGhlIG1vdXNlJ3MgcmF5IGhpdHMgdGhlIHBhcnRpY2xlXHJcbiAgICAgICAgbGV0IGludGVyc2VjdFBvaW50ID0gaW50ZXJzZWN0LnBvaW50O1xyXG5cclxuICAgICAgICAvLyBZb3UgY2FuIG5vdyB1c2UgaW50ZXJzZWN0UG9pbnQgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgcGFydGljbGVzXHJcbiAgICB9XHJcbn0pO1xyXG4gICAgLy8gRGVmaW5lIHBhcnRpY2xlc0dlb21ldHJ5IGluIHRoZSBvdXRlciBzY29wZVxyXG5sZXQgcGFydGljbGVzR2VvbWV0cnk7XHJcblxyXG50ZXh0dXJlTG9hZGVyLmxvYWQoJ3NrcmlsbGV4MjAyM2xvZ28ucG5nJywgKGltYWdlVGV4dHVyZSkgPT4ge1xyXG4gICAgLy8gLi4uXHJcbiAgLy8gIHBhcnRpY2xlc0dlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XHJcbiAgICAvLyAuLi5cclxufSk7XHJcbiAgICBmdW5jdGlvbiBnZXRBdmVyYWdlUGFydGljbGVaKCkge1xyXG4gICAgICAgIGlmICghcGFydGljbGVzR2VvbWV0cnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IHBhcnRpY2xlc0dlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb24uYXJyYXk7XHJcbiAgICAgICAgbGV0IHRvdGFsWiA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPCBwb3NpdGlvbnMubGVuZ3RoOyBpICs9IDMpIHtcclxuICAgICAgICAgICAgdG90YWxaICs9IHBvc2l0aW9uc1tpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRvdGFsWiAvIChwb3NpdGlvbnMubGVuZ3RoIC8gMyk7XHJcbiAgICB9XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGhhbmRsZVRvdWNoKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBoYW5kbGVUb3VjaCk7XHJcbiAgICBcclxuICAgIGZ1bmN0aW9uIGhhbmRsZVRvdWNoKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvdWNoID0gZS50b3VjaGVzWzBdO1xyXG5cclxuICAgICAgICAgICAgbW91c2UueCA9ICh0b3VjaC5jbGllbnRYIC8gd2luZG93LmlubmVyV2lkdGgpICogMiAtIDE7XHJcbiAgICAgICAgICAgIG1vdXNlLnkgPSAtKHRvdWNoLmNsaWVudFkgLyB3aW5kb3cuaW5uZXJIZWlnaHQpICogMiArIDE7XHJcbiAgICAgICAgICAgIG1vdXNlLnogPSBnZXRBdmVyYWdlUGFydGljbGVaKCk7XHJcblxyXG4gICAgICAgICAgICByYXljYXN0ZXIuc2V0RnJvbUNhbWVyYShtb3VzZSwgY2FtZXJhKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGludGVyc2VjdFBvaW50ID0gcmF5Y2FzdGVyLnJheS5hdCgxLjMpO1xyXG5cclxuICAgICAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnggKz0gKGludGVyc2VjdFBvaW50LnggKiBjYW1lcmFQYXJhbGxheEZhY3RvciAtIGNhbWVyYS5wb3NpdGlvbi54KSAqIDAuMDU7XHJcbiAgICAgICAgICAgIGNhbWVyYS5wb3NpdGlvbi55ICs9ICgtaW50ZXJzZWN0UG9pbnQueSAqIGNhbWVyYVBhcmFsbGF4RmFjdG9yIC0gY2FtZXJhLnBvc2l0aW9uLnkpICogMC4wNTtcclxuICAgICAgICAgICAgY2FtZXJhLmxvb2tBdChzY2VuZS5wb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEFkZCBhIG5ldyBmdW5jdGlvbiB0byBjYWxjdWxhdGUgdGhlIGF2ZXJhZ2Ugei1jb29yZGluYXRlIG9mIGFsbCBwYXJ0aWNsZXNcclxuXHJcbiAgICB9XHJcbmNvbnN0IHNjYWxlID0gMTsgLy8gQWRqdXN0IHRoaXMgdmFsdWUgZm9yIHlvdXIgZGVzaXJlZCBzY2FsZS4gRS5nLiwgMC41IG1lYW5zIHRoZSBpbWFnZSB3aWxsIGJlIDUwJSBzbWFsbGVyXHJcblxyXG50ZXh0dXJlTG9hZGVyLmxvYWQoJ3NrcmlsbGV4MjAyM2xvZ28ucG5nJywgKGltYWdlVGV4dHVyZSkgPT4ge1xyXG4gICAgY29uc3QgaW1nV2lkdGggPSBpbWFnZVRleHR1cmUuaW1hZ2Uud2lkdGggKiBzY2FsZTtcclxuICAgIGNvbnN0IGltZ0hlaWdodCA9IGltYWdlVGV4dHVyZS5pbWFnZS5oZWlnaHQgKiBzY2FsZTtcclxuICAgIFxyXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICBjYW52YXMud2lkdGggPSBpbWdXaWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBpbWdIZWlnaHQ7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICBcclxuICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlVGV4dHVyZS5pbWFnZSwgMCwgMCwgaW1nV2lkdGgsIGltZ0hlaWdodCk7XHJcblxyXG4gICAgY29uc3QgaW1nRGF0YSA9IGNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIGltZ1dpZHRoLCBpbWdIZWlnaHQpLmRhdGE7XHJcbiAgICBjb25zdCByZXNvbHV0aW9uRmFjdG9yID0gNDtcclxuXHJcbiAgICBjb25zdCBwYXJ0aWNsZVRleHR1cmUgPSB0ZXh0dXJlTG9hZGVyLmxvYWQoJ3BhcnRpY2xlczIucG5nJyk7XHJcbiAgICBjb25zdCBwYXJ0aWNsZXNHZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xyXG4gICAgY29uc3QgcGFydGljbGVWZXJ0aWNlcyA9IFtdO1xyXG4gICAgY29uc3QgcGFydGljbGVDb2xvcnMgPSBbXTtcclxuICAgIGNvbnN0IG9yaWdpbmFsUG9zaXRpb25zID0gW107XHJcbiAgICBjb25zdCBpbmNyZWFzZWRCcmlnaHRuZXNzID0gMi4yNTsgLy8gUGxhY2UgdGhpcyBiZWZvcmUgdGhlIGxvb3BcclxuXHJcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGltZ0hlaWdodDsgeSArPSByZXNvbHV0aW9uRmFjdG9yKSB7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBpbWdXaWR0aDsgeCArPSByZXNvbHV0aW9uRmFjdG9yKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gKHkgKiBpbWdXaWR0aCArIHgpICogNDtcclxuICAgICAgICAgICAgY29uc3QgciA9IGltZ0RhdGFbaW5kZXhdO1xyXG4gICAgICAgICAgICBjb25zdCBnID0gaW1nRGF0YVtpbmRleCArIDFdO1xyXG4gICAgICAgICAgICBjb25zdCBiID0gaW1nRGF0YVtpbmRleCArIDJdO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYnJpZ2h0bmVzcyA9IDAuNzE1MiAqIHIgKyAwLjIxMjYgKiBnICsgMC4wNzIyICogYjtcclxuICAgICAgICAgICAgaWYgKGJyaWdodG5lc3MgPiAxMjgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHhQb3MgPSAoeCAvIGltZ1dpZHRoIC0gMC41KSAqIDI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB5UG9zID0gKHkgLyBpbWdIZWlnaHQgLSAwLjUpICogLTI7XHJcbiAgICAgICAgICAgICAgICBwYXJ0aWNsZVZlcnRpY2VzLnB1c2goeFBvcywgeVBvcywgMCk7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFBvc2l0aW9ucy5wdXNoKHhQb3MsIHlQb3MsIDApO1xyXG5wYXJ0aWNsZUNvbG9ycy5wdXNoKChyIC8gMjU1KSAqIGluY3JlYXNlZEJyaWdodG5lc3MgKiAwLjgsIChnIC8gMjU1KSAqIGluY3JlYXNlZEJyaWdodG5lc3MsIChiIC8gMjU1KSAqIGluY3JlYXNlZEJyaWdodG5lc3MpOyAgICAgICAgICAgIH1cclxuLy9wYXJ0aWNsZUNvbG9ycy5wdXNoKDEsIDAsIDApOyAvLyBTZXQgUkdCIHZhbHVlcyB0byAoMSwgMCwgMCkgZm9yIHJlZFxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGFydGljbGVzR2VvbWV0cnkuc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5GbG9hdDMyQnVmZmVyQXR0cmlidXRlKHBhcnRpY2xlVmVydGljZXMsIDMpKTtcclxuICAgIHBhcnRpY2xlc0dlb21ldHJ5LnNldEF0dHJpYnV0ZSgnY29sb3InLCBuZXcgVEhSRUUuRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZShwYXJ0aWNsZUNvbG9ycywgMykpO1xyXG5cclxuICAgIGNvbnN0IHBhcnRpY2xlc01hdGVyaWFsID0gbmV3IFRIUkVFLlBvaW50c01hdGVyaWFsKHsgXHJcbiAgICAgICAgc2l6ZTogMC4wNSwgXHJcbiAgICAgICAgbWFwOiBwYXJ0aWNsZVRleHR1cmUsIFxyXG4gICAgICAgIHZlcnRleENvbG9yczogdHJ1ZSwgXHJcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXHJcbiAgICAgICAgb3BhY2l0eTogMSwgLy8gQWRqdXN0IHRoaXMgdmFsdWVcclxuICAgICAgICBcclxuXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHBhcnRpY2xlcyA9IG5ldyBUSFJFRS5Qb2ludHMocGFydGljbGVzR2VvbWV0cnksIHBhcnRpY2xlc01hdGVyaWFsKTtcclxuICAgIHNjZW5lLmFkZChwYXJ0aWNsZXMpO1xyXG5cclxuXHJcbiAgICBjb25zdCByYWRpdXMgPSAxOyAvLyBSZXBsYWNlIHdpdGggdGhlIGRlc2lyZWQgcmFkaXVzIG9mIHRoZSBjaXJjbGVcclxuY29uc3Qgc2VnbWVudHMgPSAzMjsgLy8gUmVwbGFjZSB3aXRoIHRoZSBkZXNpcmVkIG51bWJlciBvZiBzZWdtZW50cyB0byBhcHByb3hpbWF0ZSB0aGUgY2lyY2xlXHJcbiAgICBcclxuICAgIGNvbnN0IGNpcmNsZVRleHR1cmUgPSB0ZXh0dXJlTG9hZGVyLmxvYWQoJ2NpcmNsZTQucG5nJyk7XHJcbiAgICBjb25zdCBjaXJjbGVNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IG1hcDogY2lyY2xlVGV4dHVyZSB9KTtcclxuICAgIGNvbnN0IGNpcmNsZUdlb21ldHJ5ID0gbmV3IFRIUkVFLkNpcmNsZUdlb21ldHJ5KHJhZGl1cywgc2VnbWVudHMpO1xyXG4gICAgY29uc3QgY2lyY2xlTWVzaCA9IG5ldyBUSFJFRS5NZXNoKGNpcmNsZUdlb21ldHJ5LCBjaXJjbGVNYXRlcmlhbCk7XHJcbiAgICBjaXJjbGVNZXNoLnBvc2l0aW9uLnNldCgwLCAwLCAtMik7XHJcbiAgICAgICAgY2lyY2xlTWVzaC5yb3RhdGlvbi5zZXQoMCwgMCwgMCk7XHJcbi8vc2NlbmUuYWRkKGNpcmNsZU1lc2gpO1xyXG5cclxuLy8gVGhlbiwgaW4geW91ciBhbmltYXRlIGZ1bmN0aW9uOlxyXG5mdW5jdGlvbiBhbmltYXRlKCkge1xyXG4gICAgY29uc3QgcG9zaXRpb25zID0gcGFydGljbGVzR2VvbWV0cnkuYXR0cmlidXRlcy5wb3NpdGlvbi5hcnJheTtcclxuICAgIGNvbnN0IHRpbWUgPSBEYXRlLm5vdygpICogMC4wMDAxOyAgLy8gYWRqdXN0IHRoZSBtdWx0aXBsaWVyIHRvIGNvbnRyb2wgdGhlIHNwZWVkIG9mIHRoZSBhbmltYXRpb25cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvc2l0aW9ucy5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICAgIGxldCBwYXJ0aWNsZVBvcyA9IG5ldyBUSFJFRS5WZWN0b3IzKHBvc2l0aW9uc1tpXSwgcG9zaXRpb25zW2kgKyAxXSwgcG9zaXRpb25zW2kgKyAyXSk7XHJcbiAgICAgICAgbGV0IG9yaWdpbmFsUG9zID0gbmV3IFRIUkVFLlZlY3RvcjMob3JpZ2luYWxQb3NpdGlvbnNbaV0sIG9yaWdpbmFsUG9zaXRpb25zW2kgKyAxXSwgb3JpZ2luYWxQb3NpdGlvbnNbaSArIDJdKTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBwYXJ0aWNsZSBhbmQgdGhlIG1vdXNlXHJcbiAgICAgICAgbGV0IGRpc3RhbmNlVG9Nb3VzZSA9IHBhcnRpY2xlUG9zLmRpc3RhbmNlVG8obW91c2UpO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgZGlzdGFuY2UgaXMgbGVzcyB0aGFuIHRoZSBtb3VzZVJhZGl1cywgbW92ZSB0aGUgcGFydGljbGUgdG93YXJkcyB0aGUgbW91c2VcclxuICAgICAgICBpZiAoZGlzdGFuY2VUb01vdXNlIDwgbW91c2VSYWRpdXMpIHtcclxuICAgICAgICAgICAgcGFydGljbGVQb3MubGVycChuZXcgVEhSRUUuVmVjdG9yMyhtb3VzZS54LCBtb3VzZS55LCBwYXJ0aWNsZVBvcy56KSwgbW91c2VTdHJlbmd0aCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBtb3ZlIHRoZSBwYXJ0aWNsZSBiYWNrIHRvIGl0cyBvcmlnaW5hbCBwb3NpdGlvblxyXG4gICAgICAgICAgICBwYXJ0aWNsZVBvcy5sZXJwKG9yaWdpbmFsUG9zLCAwLjA1KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVzZSB0aGUgbm9pc2UgZnVuY3Rpb24gdG8gZ2V0IGEgc21vb3RoLCB2YXJ5aW5nIHZhbHVlIGZvciBlYWNoIHBhcnRpY2xlXHJcbiAgICAgICAgY29uc3Qgbm9pc2VWYWx1ZSA9IG5vaXNlM0RGdW5jdGlvbihwYXJ0aWNsZVBvcy54LCBwYXJ0aWNsZVBvcy55LCB0aW1lKTtcclxuXHJcbiAgICAgICAgLy8gVXNlIHRoZSBub2lzZSB2YWx1ZSB0byBhZGp1c3QgdGhlIHBvc2l0aW9uIG9mIHRoZSBwYXJ0aWNsZVxyXG4gICAgICAgIHBhcnRpY2xlUG9zLnogKz0gbm9pc2VWYWx1ZSAqIDAuMDE7ICAvLyBhZGp1c3QgdGhlIG11bHRpcGxpZXIgdG8gY29udHJvbCB0aGUgYW1wbGl0dWRlIG9mIHRoZSBhbmltYXRpb25cclxuXHJcbiAgICAgICAgcG9zaXRpb25zW2ldID0gcGFydGljbGVQb3MueDtcclxuICAgICAgICBwb3NpdGlvbnNbaSArIDFdID0gcGFydGljbGVQb3MueTtcclxuICAgICAgICBwb3NpdGlvbnNbaSArIDJdID0gcGFydGljbGVQb3MuejtcclxuICAgIH1cclxuXHJcbiAgICBwYXJ0aWNsZXNHZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9uLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuXHJcbiAgICAvL3JlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhKTtcclxuICAgIGNvbXBvc2VyLnJlbmRlcigpO1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xyXG59XHJcblxyXG4gICAgYW5pbWF0ZSgpO1xyXG59KTtcclxuXHJcbmNhbWVyYS5wb3NpdGlvbi56ID0gMS4zODtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBuZXdXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgY29uc3QgbmV3SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgIGNhbWVyYS5hc3BlY3QgPSBuZXdXaWR0aCAvIG5ld0hlaWdodDtcclxuICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XHJcblxyXG4gICAgcmVuZGVyZXIuc2V0U2l6ZShuZXdXaWR0aCwgbmV3SGVpZ2h0KTtcclxuICAgIGNvbXBvc2VyLnNldFNpemUobmV3V2lkdGgsIG5ld0hlaWdodCk7XHJcbn0pO1xyXG59Il0sIm5hbWVzIjpbIlRIUkVFIiwiRWZmZWN0Q29tcG9zZXIiLCJSZW5kZXJQYXNzIiwiVW5yZWFsQmxvb21QYXNzIiwiY3JlYXRlTm9pc2UzRCIsImluaXRpYWxpemVUaHJlZUpTIiwibW91bnRQb2ludCIsIm5vaXNlM0RGdW5jdGlvbiIsIm1vdXNlUmFkaXVzIiwibW91c2VTdHJlbmd0aCIsInNjZW5lIiwiU2NlbmUiLCJjYW1lcmEiLCJQZXJzcGVjdGl2ZUNhbWVyYSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsInJlbmRlcmVyIiwiV2ViR0xSZW5kZXJlciIsImFscGhhIiwic2V0U2l6ZSIsInNldENsZWFyQ29sb3IiLCJhcHBlbmRDaGlsZCIsImRvbUVsZW1lbnQiLCJjb21wb3NlciIsInJlbmRlclBhc3MiLCJhZGRQYXNzIiwiYmxvb21PcHRpb25zIiwic3RyZW5ndGgiLCJyYWRpdXMiLCJ0aHJlc2hvbGQiLCJibG9vbVBhc3MiLCJWZWN0b3IyIiwidGV4dHVyZUxvYWRlciIsIlRleHR1cmVMb2FkZXIiLCJyYXljYXN0ZXIiLCJSYXljYXN0ZXIiLCJtb3VzZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwieCIsImNsaWVudFgiLCJpbWdXaWR0aCIsInkiLCJjbGllbnRZIiwiaW1nSGVpZ2h0Iiwic2V0RnJvbUNhbWVyYSIsImludGVyc2VjdHMiLCJpbnRlcnNlY3RPYmplY3RzIiwicGFydGljbGVzIiwibGVuZ3RoIiwiaW50ZXJzZWN0IiwiaW50ZXJzZWN0UG9pbnQiLCJwb2ludCIsInBhcnRpY2xlc0dlb21ldHJ5IiwibG9hZCIsImltYWdlVGV4dHVyZSIsImdldEF2ZXJhZ2VQYXJ0aWNsZVoiLCJwb3NpdGlvbnMiLCJhdHRyaWJ1dGVzIiwicG9zaXRpb24iLCJhcnJheSIsInRvdGFsWiIsImkiLCJoYW5kbGVUb3VjaCIsInByZXZlbnREZWZhdWx0IiwidG91Y2hlcyIsInRvdWNoIiwieiIsInJheSIsImF0IiwiY2FtZXJhUGFyYWxsYXhGYWN0b3IiLCJsb29rQXQiLCJzY2FsZSIsImltYWdlIiwid2lkdGgiLCJoZWlnaHQiLCJjYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjb250ZXh0IiwiZ2V0Q29udGV4dCIsImRyYXdJbWFnZSIsImltZ0RhdGEiLCJnZXRJbWFnZURhdGEiLCJkYXRhIiwicmVzb2x1dGlvbkZhY3RvciIsInBhcnRpY2xlVGV4dHVyZSIsIkJ1ZmZlckdlb21ldHJ5IiwicGFydGljbGVWZXJ0aWNlcyIsInBhcnRpY2xlQ29sb3JzIiwib3JpZ2luYWxQb3NpdGlvbnMiLCJpbmNyZWFzZWRCcmlnaHRuZXNzIiwiaW5kZXgiLCJyIiwiZyIsImIiLCJicmlnaHRuZXNzIiwieFBvcyIsInlQb3MiLCJwdXNoIiwic2V0QXR0cmlidXRlIiwiRmxvYXQzMkJ1ZmZlckF0dHJpYnV0ZSIsInBhcnRpY2xlc01hdGVyaWFsIiwiUG9pbnRzTWF0ZXJpYWwiLCJzaXplIiwibWFwIiwidmVydGV4Q29sb3JzIiwidHJhbnNwYXJlbnQiLCJvcGFjaXR5IiwiUG9pbnRzIiwiYWRkIiwic2VnbWVudHMiLCJjaXJjbGVUZXh0dXJlIiwiY2lyY2xlTWF0ZXJpYWwiLCJNZXNoQmFzaWNNYXRlcmlhbCIsImNpcmNsZUdlb21ldHJ5IiwiQ2lyY2xlR2VvbWV0cnkiLCJjaXJjbGVNZXNoIiwiTWVzaCIsInNldCIsInJvdGF0aW9uIiwiYW5pbWF0ZSIsInRpbWUiLCJEYXRlIiwibm93IiwicGFydGljbGVQb3MiLCJWZWN0b3IzIiwib3JpZ2luYWxQb3MiLCJkaXN0YW5jZVRvTW91c2UiLCJkaXN0YW5jZVRvIiwibGVycCIsIm5vaXNlVmFsdWUiLCJuZWVkc1VwZGF0ZSIsInJlbmRlciIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm5ld1dpZHRoIiwibmV3SGVpZ2h0IiwiYXNwZWN0IiwidXBkYXRlUHJvamVjdGlvbk1hdHJpeCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./utils/app.js\n"));

/***/ })

});