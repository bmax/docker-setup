import THREE from 'three';
import Entity from 'shared/entity';

const Physics = {
  update(entities) {
    entities.forEach(entity => {
      if(!Entity.hasComponents(entity, ['velocity', 'body', 'mesh', 'collision'])) { return; }
      let { linear, angular } = entity.velocity;
      let { colliding } = entity.collision;

      if((linear.x >= 0 && !colliding.right) ||
         (linear.x <= 0 && !colliding.left)) {
        entity.mesh.mesh.translateX(linear.x*100);
      }


      if((linear.y >= 0 && !colliding.top) ||
         (linear.y <= 0 && !colliding.bottom)) {
        entity.mesh.mesh.translateY(linear.y*100);
      }

      if(linear.z >= 0 && !colliding.back ||
         linear.z <= 0 && !colliding.front) {
        entity.mesh.mesh.translateZ(linear.z*100);
      }

      entity.body.position.x = Math.floor(entity.mesh.mesh.position.x/100);
      entity.body.position.y = Math.floor(entity.mesh.mesh.position.y/100);
      entity.body.position.z = Math.floor(entity.mesh.mesh.position.z/100);

      entity.body.rotation.x += entity.velocity.angular.x;
      entity.body.rotation.y += entity.velocity.angular.y;
      entity.body.rotation.z += entity.velocity.angular.z;

      entity.mesh.mesh.rotateOnAxis(new THREE.Vector3(1,0,0), angular.x*100);
      entity.mesh.mesh.rotateOnAxis(new THREE.Vector3(0,1,0), angular.y*100);
      entity.mesh.mesh.rotateOnAxis(new THREE.Vector3(0,0,1), angular.z*100);

      entity.velocity.linear.x = 0;
      entity.velocity.linear.y = 0;
      entity.velocity.linear.z = 0;

      entity.velocity.angular.x = 0;
      entity.velocity.angular.y = 0;
      entity.velocity.angular.z = 0;
    });
    return entities;
  }
}

export default Physics;
