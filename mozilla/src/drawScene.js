function drawScene(gl, programInfo, buffers, deltaTime) {
    gl.clearColor(0.1, 0.1, 0.1, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    // Clear the canvas before we start drawing on it.

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = 45 * Math.PI / 180;   // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix,
                        fieldOfView,
                        aspect,
                        zNear,
                        zFar);

                        
    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();

    // Now move the drawing position a bit to where we want to
    // start drawing the square.

    mat4.translate(modelViewMatrix,     // destination matrix
                    modelViewMatrix,     // matrix to translate
                    [0.0, 0.0, -20.0]);  // amount to translate
    if (viewingAngle == 0) {
        mat4.rotate(modelViewMatrix, modelViewMatrix, 
                Math.PI/8, [1, 0, 0]);
    }
    mat4.rotate(modelViewMatrix,  // destination matrix
                modelViewMatrix,  // matrix to rotate
                cubeRotation,     // amount to rotate in radians
                [0, 1, 0]);       // axis to rotate around
    
    // Create the normal matrix that represents the normals of the 
    // modelViewMatrix. 
    const normalMatrix = mat4.create();
    mat4.invert(normalMatrix, modelViewMatrix);
    mat4.transpose(normalMatrix, normalMatrix);
       
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    {
        const numComponents = 3;  // pull out 2 values per iteration
        const type = gl.FLOAT;    // the data in the buffer is 32bit floats
        const normalize = false;  // don't normalize
        const stride = 0;         // how many bytes to get from one set of values to the next
                                // 0 = use type and numComponents above
        const offset = 0;         // how many bytes inside the buffer to start from
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            programInfo.attribLocations.vertexPosition);
          }
    // Tell WebGL how to pull out the normals from
    // the normal buffer into the vertexNormal attribute.
    {
        const numComponents = 3;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexNormal,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            programInfo.attribLocations.vertexNormal);
    }
    
    
    var faceColors = [  // BLUE 
        [cubeRGB[0],  cubeRGB[1],  cubeRGB[2],  cubeRGB[3]],    // Front face
        [cubeRGB[0],  cubeRGB[1],  cubeRGB[2],  cubeRGB[3]],    // Back face
        [cubeRGB[0],  cubeRGB[1],  cubeRGB[2],  cubeRGB[3]],    // Top face
        [cubeRGB[0],  cubeRGB[1],  cubeRGB[2],  cubeRGB[3]],    // Bottom face
        [cubeRGB[0],  cubeRGB[1],  cubeRGB[2],  cubeRGB[3]],    // Right face
        [cubeRGB[0],  cubeRGB[1],  cubeRGB[2],  cubeRGB[3]],    // Left face
    ];

    // Convert the array of colors into a table for all the vertices.

    var colors = [];

    
    for (var j = 0; j < faceColors.length; ++j) {
        const c = faceColors[j];
    
        // Repeat each color four times for the four vertices of the face
        colors = colors.concat(c, c, c, c);
    }

    // Tell WebGL how to pull out the colors from the color buffer
    // into the vertexColor attribute.
    {
        const numComponents = 4;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(colors));
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexColor,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            programInfo.attribLocations.vertexColor);
    }

    // Change the shading style
    var shading =   [shadingStyle, shadingStyle, shadingStyle, shadingStyle, 
                     shadingStyle, shadingStyle, shadingStyle, shadingStyle, 
                     shadingStyle, shadingStyle, shadingStyle, shadingStyle, 
                     shadingStyle, shadingStyle, shadingStyle, shadingStyle, 
                     shadingStyle, shadingStyle, shadingStyle, shadingStyle, 
                     shadingStyle, shadingStyle, shadingStyle, shadingStyle];{
        const numComponents = 1;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.shadingStyle);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(shading));            
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexShadingStyle,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        gl.enableVertexAttribArray(
            programInfo.attribLocations.vertexShadingStyle);
    } 

    // Tell WebGL which indices to use to index the vertices
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

    // Tell WebGL to use our program when drawing

    gl.useProgram(programInfo.program);

    // Set the shader uniforms

    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.normalMatrix,
        false,
        normalMatrix);
      
    {
        const vertexCount = 36;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }
    

    // Second cube
    mat4.translate(modelViewMatrix,     // destination matrix
                    modelViewMatrix,     // matrix to translate
                    [translation, 0.0, 0.0]);  // amount to translate
    mat4.scale(modelViewMatrix, modelViewMatrix, [0.5,0.5,0.5])
    
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);

    {
        const vertexCount = 36;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }

    cubeRotation += 0.75*deltaTime;
}
  
  