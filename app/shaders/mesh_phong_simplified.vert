precision highp float;
precision highp int;
#define SHADER_NAME MeshPhongMaterial

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

#ifdef USE_COLOR
    attribute vec3 color;
#endif

varying vec3 vViewPosition;

#ifndef FLAT_SHADED
    varying vec3 vNormal;
#endif

struct IncidentLight {
    vec3 color;
    vec3 direction;
    bool visible;
};
struct ReflectedLight {
    vec3 directDiffuse;
    vec3 directSpecular;
    vec3 indirectDiffuse;
    vec3 indirectSpecular;
};
struct GeometricContext {
    vec3 position;
    vec3 normal;
    vec3 viewDir;
};

#if defined( USE_MAP )
    varying vec2 vUv;
    uniform mat3 uvTransform;
#endif

#ifdef USE_DISPLACEMENTMAP
    uniform sampler2D displacementMap;
    uniform float displacementScale;
    uniform float displacementBias;
#endif

#ifdef USE_COLOR
    varying vec3 vColor;
#endif



void main() {
    #if defined( USE_MAP )
        vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
    #endif
    
    #ifdef USE_COLOR
        vColor.xyz = color.xyz;
    #endif
    
    vec3 objectNormal = vec3( normal );
  
    vec3 transformedNormal = normalMatrix * objectNormal;
    
    #ifndef FLAT_SHADED
        vNormal = normalize( transformedNormal );
    #endif
    
    vec3 transformed = vec3( position );
    
    #ifdef USE_DISPLACEMENTMAP
        transformed += normalize( objectNormal ) * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );
    #endif
    
    vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
    
    vViewPosition = - mvPosition.xyz;
}
