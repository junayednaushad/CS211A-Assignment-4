function initBuffers(gl) {

    // Create a buffer for the shading style. 
    const shadingStyleBuffer = gl.createBuffer();

    // Select the shadingBuffer as the one to apply buffer 
    // operations to from here on out. 

    gl.bindBuffer(gl.ARRAY_BUFFER, shadingStyleBuffer);

    // Now create an array containing the number for our 
    // desired shading style. 
    
    var shading =   [shadingStyle, shadingStyle, shadingStyle, shadingStyle, 
                     shadingStyle, shadingStyle, shadingStyle, shadingStyle, 
                     shadingStyle, shadingStyle, shadingStyle, shadingStyle, 
                     shadingStyle, shadingStyle, shadingStyle, shadingStyle, 
                     shadingStyle, shadingStyle, shadingStyle, shadingStyle, 
                     shadingStyle, shadingStyle, shadingStyle, shadingStyle];

    // Now pass the shading style into WebGL. We do this by creating 
    // an integer array from the JavaScript array, then use it to 
    // fill the current buffer.
  
    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(shading),
        gl.DYNAMIC_DRAW);


    // Create a buffer for the square's positions.
  
    const positionBuffer = gl.createBuffer();
  
    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
  
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
    // Now create an array of positions for the square.
  
    const positions = [
        // Front face
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        
        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,
        
        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,
        
        // Bottom face
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,
        
        // Right face
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,
        
        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
      ];
        
    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
  
    gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW);


    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    
    const vertexNormals = [
        // Front
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
    
        // Back
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
    
        // Top
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
    
        // Bottom
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
    
        // Right
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
    
        // Left
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0
    ];
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
                    gl.STATIC_DRAW);



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
                  
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.DYNAMIC_DRAW);
  
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.

    const indices = [
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23,   // left
    ];

    // Now send the element array to GL

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices), gl.STATIC_DRAW);

    return {
        shadingStyle: shadingStyleBuffer,
        position: positionBuffer,
        normal: normalBuffer,
        color: colorBuffer,
        indices: indexBuffer,
    };
  }
  