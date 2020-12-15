const fsSource = `
    varying highp vec4 vColor;
    varying highp vec3 vLighting;
    varying lowp float vShaderType;
    varying highp vec4 vNPhong;
    varying highp vec4 vFragPos;

    void main() {
        if (vShaderType == 0.0){
            gl_FragColor = vColor;
        }
        else if (vShaderType == 1.0){
            gl_FragColor = vec4(vColor.rgb * vLighting, vColor.a);
        }
        else{
            highp vec3 vAmbientLight = vec3(0.2, 0.2, 0.2);
            highp vec3 vDirectionalLight = vec3(0.9, 0.8, 0.9);
            highp vec3 vL = normalize(vec3(4.0, 4.0, 4.0) - vFragPos.xyz);
            highp vec3 vV = normalize(vec3(0.0, 0.0, -20.0) - vFragPos.xyz);
            highp vec3 vH = normalize(vL + vV);
            highp vec3 vLightingPhong = (vAmbientLight * 0.5) + (vDirectionalLight * max(dot(vNPhong.xyz, vL), 0.0) * 1.0) + (vDirectionalLight * pow(max(dot(vH, vNPhong.xyz), 0.0), 20.0) * 10.0);
            gl_FragColor = vec4(vColor.rgb * vLightingPhong, vColor.a);
        }
    }
`;

