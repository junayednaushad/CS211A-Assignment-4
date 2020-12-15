const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec4 aVertexColor;
    attribute float aShaderType; 

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec4 vColor;
    varying lowp float vShaderType;
    varying highp vec3 vLighting;
    varying highp vec4 vNPhong;
    varying highp vec4 vFragPos;

    void main() {
        vShaderType = aShaderType;
        vFragPos = aVertexPosition;
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vColor = aVertexColor;

        if (aShaderType == 1.0) {
            highp vec3 vAmbientLight = vec3(0.2, 0.2, 0.2);
            highp vec3 vDirectionalLight = vec3(0.9, 0.8, 0.9);
            highp vec3 vL = normalize(vec3(4.0, 4.0, 4.0) - vFragPos.xyz);
            highp vec3 vV = normalize(vec3(0.0, 0.0, -20.0) - vFragPos.xyz);
            highp vec4 vN = uNormalMatrix * vec4(aVertexNormal, 1.0);
            highp vec3 vH = normalize(vL + vV);
            vLighting = (vAmbientLight * 0.5) + (vDirectionalLight * max(dot(vN.xyz, vL), 0.0) * 1.0) + (vDirectionalLight * pow(max(dot(vH, vN.xyz), 0.0), 20.0) * 10.0);
        }
        if (aShaderType == 2.0) {
            vNPhong = uNormalMatrix * vec4(aVertexNormal, 1.0);
        }
    }
`;

