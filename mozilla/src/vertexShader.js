
const vsSource = `
    precision highp float; 

    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    attribute vec3 aVertexNormal;
    attribute float aShaderType;  // 0 -> No shader; 1 -> Gouroud shader; 2 -> Phong shader; 

    uniform mat4 uNormalMatrix; 
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec3 vLighting;
    varying highp vec4 vColor;
    varying lowp float vShaderType;
    varying highp vec3 vVertexNormal;

    void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vShaderType = aShaderType;
        vVertexNormal = aVertexNormal;

        if (aShaderType == 0.0) {
            vColor = aVertexColor;
            vLighting = vec3(1.0, 1.0, 1.0);
        } else if (aShaderType == 1.0) { // Gouroud shading

            // Apply lighting effect
            lowp float k_a = 0.5;
            lowp float k_d = 1.0;
            lowp float k_s = 1.0;
            highp vec4 ambientColor  = vec4(0.4, 0.4, 0.4, 1.0);
            highp vec3 lightColor    = vec3(0.7, 0.7, 0.7);
            highp vec3 specularColor = vec3(0.9, 0.9, 0.9);
            highp vec3 lightPosition = vec3(4.0, 4.0, 4.0);
            float shininess = 20.0;
            float strength = 10.0;
            lowp vec3 eyeDirection = vec3(0.0, 0.0, -20.0);

            highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
            highp vec3 directionalVector = normalize(lightPosition);
            highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0); 
            highp vec3 L_d = lightColor * directional;

            highp vec3 H   = normalize(directionalVector + eyeDirection);
            highp float specularCoefficient = strength * pow(max(dot(H, -transformedNormal.xyz), 0.0), shininess ) / ( 2.0 * 3.14159265 );
            highp vec3 L_s = specularColor * specularCoefficient;

            highp vec4 GI_a = vec4(k_a * ambientColor.x, k_a * ambientColor.y, k_a * ambientColor.z, 1.0);
            highp vec4 I_a  = vec4(k_a * ambientColor.x, k_a * ambientColor.y, k_a * ambientColor.z, 1.0);
            highp vec4 I_d  = vec4(k_d * L_d.x, k_d * L_d.y, k_d * L_d.z, 1.0);
            highp vec4 I_s  = vec4(L_s * k_s, 1.0);

            vLighting = GI_a.xyz + I_d.xyz + I_s.xyz;
            vColor = aVertexColor * (vLighting.xyz, 1.0);
        } else {  // Phong shading
            vColor = aVertexColor;
        }  

    }
`;