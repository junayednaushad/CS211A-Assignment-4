const canvas = document.querySelector('#glcanvas');
// Initialize the GL context
const gl = canvas.getContext('webgl');

var shadingStyle = 0; // 0 -> No shading; 1 -> Gouroud shading; 2 -> Phong shading; 
var cubeRGB = [0.0, 0.0, 1.0, 1.0];
var cubeRotation = 5.0;

var translation = 4.0;

