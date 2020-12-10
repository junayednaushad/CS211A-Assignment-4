const fsSource = `
    varying lowp vec4 vColor;
    varying highp vec3 vLighting;

    uniform sampler2D uSampler;
    // uniform int uShaderType;  // 0 -> No shader; 1 -> Gouroud shader; 2 -> Phong shader; 

    void main() {
        gl_FragColor = vec4(vColor.rgb * vLighting, vColor.a);
    }
`;
