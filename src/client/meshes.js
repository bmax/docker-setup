import THREE from 'three';
import { World } from 'shared/world';

const blockSize = 100;

export const player = (id, position) => {
  let geometry = new THREE.CubeGeometry( 100, 100, 100 );
  let material = new THREE.MeshNormalMaterial();
  let mesh = new THREE.Mesh(geometry, material);
  mesh.name = id;
  mesh.position.x = position.x * 100;
  mesh.position.y = position.y * 100;
  mesh.position.z = position.z * 100;

  return mesh;
}

export const blocks = (world, texture)  => {
  let pxGeometry = new THREE.PlaneBufferGeometry( blockSize, blockSize );
  pxGeometry.attributes.uv.array[ 1 ] = 0.5;
  pxGeometry.attributes.uv.array[ 3 ] = 0.5;
  pxGeometry.rotateY( Math.PI / 2 );
  pxGeometry.translate( 50, 0, 0 );

  let nxGeometry = new THREE.PlaneBufferGeometry( blockSize, blockSize );
  nxGeometry.attributes.uv.array[ 1 ] = 0.5;
  nxGeometry.attributes.uv.array[ 3 ] = 0.5;
  nxGeometry.rotateY( - Math.PI / 2 );
  nxGeometry.translate( - 50, 0, 0 );

  let pyGeometry = new THREE.PlaneBufferGeometry( blockSize, blockSize );
  pyGeometry.attributes.uv.array[ 5 ] = 0.5;
  pyGeometry.attributes.uv.array[ 7 ] = 0.5;
  pyGeometry.rotateX( - Math.PI / 2 );
  pyGeometry.translate( 0, 50, 0 );

  let pzGeometry = new THREE.PlaneBufferGeometry( blockSize, blockSize );
  pzGeometry.attributes.uv.array[ 1 ] = 0.5;
  pzGeometry.attributes.uv.array[ 3 ] = 0.5;
  pzGeometry.translate( 0, 0, 50 );

  let nzGeometry = new THREE.PlaneBufferGeometry( blockSize, blockSize );
  nzGeometry.attributes.uv.array[ 1 ] = 0.5;
  nzGeometry.attributes.uv.array[ 3 ] = 0.5;
  nzGeometry.rotateY( Math.PI );
  nzGeometry.translate( 0, 0, -50 );

  let tmpGeometry = new THREE.Geometry();
  let pxTmpGeometry = new THREE.Geometry().fromBufferGeometry( pxGeometry );
  let nxTmpGeometry = new THREE.Geometry().fromBufferGeometry( nxGeometry );
  let pyTmpGeometry = new THREE.Geometry().fromBufferGeometry( pyGeometry );
  let pzTmpGeometry = new THREE.Geometry().fromBufferGeometry( pzGeometry );
  let nzTmpGeometry = new THREE.Geometry().fromBufferGeometry( nzGeometry );

  let matrix = new THREE.Matrix4();
  const worldHalfWidth = world.width/2;
  const worldHalfDepth = world.depth/2;

  for (let x = 0; x < world.width; x++) {
    for (let y = 0; y < world.height; y++) {
      for(let z = 0; z < world.depth; z++) {
        if(World.get(world, {x,y,z}) === 0) continue;
  			matrix.makeTranslation(
  				x * blockSize,
  				y * blockSize,
  				z * blockSize
  			);

        if(!World.get(world, {x: x+1, y, z}))
          tmpGeometry.merge(pxTmpGeometry, matrix);
        if(!World.get(world, {x: x-1, y, z}))
          tmpGeometry.merge(nxTmpGeometry, matrix);
        if(!World.get(world, {x, y: y+1, z}))
          tmpGeometry.merge(pyTmpGeometry, matrix);
        if(!World.get(world, {x, y: y-1, z}))
          //
        if(!World.get(world, {x, y, z: z+1}))
          tmpGeometry.merge(pzTmpGeometry, matrix);
        if(!World.get(world, {x, y, z: z-1}))
          tmpGeometry.merge(nzTmpGeometry, matrix);
      }
    }
  }

  let geometry = new THREE.BufferGeometry().fromGeometry(tmpGeometry);
  geometry.computeBoundingSphere();
  let material = new THREE.MeshLambertMaterial({ map: texture });
  let mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'blocks';

  return mesh;
}
