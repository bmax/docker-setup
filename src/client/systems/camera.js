import THREE from 'three';

export const update = (camera, mesh) => {
  let relativeCameraOffset = new THREE.Vector3(0,400,800);
  let cameraOffset = relativeCameraOffset.applyMatrix4( mesh.matrixWorld );

  camera.position.x = cameraOffset.x;
  camera.position.y = cameraOffset.y;
  camera.position.z = cameraOffset.z;
  camera.lookAt( mesh.position );
  return camera;
}

export const handleResize = (camera, width, height) => {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  return camera;
}
