import THREE from 'three';

export const blockTexture = () => {
  let loader = new THREE.TextureLoader();
  loader.crossOrigin = ''; //Allow for Cross-origin loading

  let blockTexture = loader.load("http://localhost:8080/textures/atlas.png");
  blockTexture.magFilter = THREE.NearestFilter;
  blockTexture.minFilter = THREE.LinearMipMapLinearFilter;

  return blockTexture;
}
