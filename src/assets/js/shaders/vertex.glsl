uniform float time;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uQuadSize;
uniform vec4 uCorners;
uniform vec2 uPosition;
varying vec2 vSize;

varying vec2 vUv;
void main() {
    float PI = 3.1415926;
    vUv = uv;
    float sine = sin(PI*uProgress);
    float waves = sine*8.*sin(50.*length(uv) + 15.*uProgress);
    vec4 defaultState = modelMatrix*vec4( position, 1.0 );
    vec4 fullScreenState = vec4( position, 1.0 );

    fullScreenState.x *=uResolution.x;
    fullScreenState.y *=uResolution.y;
    fullScreenState.z +=uCorners.x;
    float cornersProgress = mix(
        mix(uCorners.x,uCorners.y,waves),
				mix(uCorners.z,uCorners.w,waves),
        uv.y
    );


    vec4 finalState = mix(defaultState,fullScreenState,cornersProgress);

    vSize = mix(uQuadSize,uResolution,cornersProgress);

    gl_Position = projectionMatrix * viewMatrix * finalState;
}
