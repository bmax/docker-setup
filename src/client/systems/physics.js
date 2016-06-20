import THREE from 'three';
import * as Physics from 'shared/systems/physics';

export const update = (world, entities) => {
  entities.forEach((entity) => {
    if( entity.velocity === undefined ||
        entity.body     === undefined ||
        entity.mesh     === undefined)
      return;

    let { linear, angular } = entity.velocity;

    const colliding = collisions(world, entity.body.position);

    if(colliding.bottom) {
      // bad
      entity.input.inputs.find(i => i.action === 'jump').jumping = false;
    }

    if((linear.x >= 0 && !colliding.right) ||
       (linear.x <= 0 && !colliding.left)) {
      entity.mesh.mesh.translateX(linear.x);
    }
    if(entity.gravity !== undefined && !colliding.bottom) {
      linear.y -= 5;
      if(collisions(world, entity.body.position.y += linear.y).bottom)
        linear.y += 6;
    }
    if((linear.y >= 0 && !colliding.top) ||
       (linear.y <= 0 && !colliding.bottom)) {
      entity.mesh.mesh.translateY(linear.y);
    }

    if(linear.z >= 0 && !colliding.back ||
       linear.z <= 0 && !colliding.front) {
      entity.mesh.mesh.translateZ(linear.z);
    }

    entity.body.position.x = Math.floor(entity.mesh.mesh.position.x/100);
    entity.body.position.y = Math.floor(entity.mesh.mesh.position.y/100);
    entity.body.position.z = Math.floor(entity.mesh.mesh.position.z/100);

    entity.body.rotation.x += entity.velocity.angular.x;
    entity.body.rotation.y += entity.velocity.angular.y;
    entity.body.rotation.z += entity.velocity.angular.z;
    entity.mesh.mesh.rotateOnAxis(new THREE.Vector3(1,0,0), angular.x);
    entity.mesh.mesh.rotateOnAxis(new THREE.Vector3(0,1,0), angular.y);
    entity.mesh.mesh.rotateOnAxis(new THREE.Vector3(0,0,1), angular.z);

    entity.velocity.linear.x = 0;
    if(!entity.input.inputs.find(i => i.action === 'jump').jumping)
      entity.velocity.linear.y = 0;
    entity.velocity.linear.z = 0;
    entity.velocity.angular.x = 0;
    entity.velocity.angular.y = 0;
    entity.velocity.angular.z = 0;
  });
  return entities;
}


/*const collisions = (worldMesh, mesh) => {
  // a lot of optimising here to check collisions only with neccessary meshes
  let originPoint = mesh.position.clone();
  let directions = [];
  for (let vertexIndex = 0; vertexIndex < mesh.geometry.vertices.length; vertexIndex++) {
    let localVertex = mesh.geometry.vertices[vertexIndex].clone();
    let globalVertex = localVertex.applyMatrix4(mesh.matrix);
    let directionVector = globalVertex.sub(mesh.position);

    let ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());

    let collisionResults = ray.intersectObjects([worldMesh]);
    if (collisionResults.length > 0 && (collisionResults[0].distance < directionVector.length())) {
      directions.push(vertexIndex);
    }
  }
  return directions;
}*/

const collisions = (world, position) => {
  let colliding = {
    left: false, right: false,
    back: false, front: false,
    top: false, bottom: false
  }
  const { x, y, z } = position;
  //console.log(x,y,z);
  if(x >= world.width-1 || world.get(x+1, y, z))
    colliding.right = true;
  if(x <= 0 || world.get(x-1, y, z))
    colliding.left = true;
  if(y >= world.height-1 || world.get(x, y+1, z))
    colliding.top = true;
  if(y <= 0 || world.get(x,y-1,z))
    colliding.bottom = true;
  if(z >= world.depth-1 || world.get(x,y,z+1))
    colliding.back = true;
  if(z <= 0 || world.get(x,y,z-1))
    colliding.front = true;
  return colliding;
}
