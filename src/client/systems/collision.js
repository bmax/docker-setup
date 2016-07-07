import THREE from 'three';
import Entity from 'shared/entity';

const Collision = {
  update(entities, world) {
    entities.forEach(entity => {
      if(!Entity.hasComponents(entity, ['body', 'collision', 'mesh'])) { return; }
      //const chunk = world.getChunkAt(entity.body.position).mesh;
      entity.collision.colliding = this.collisions(entity.mesh.mesh, [world.mesh]);
    });
    return entities;
  },

  collisions(entity, collidables) {
    let colliding = {
      right: false, left: false,
      top: false, bottom: false,
      front: false, back: false
    };

    // a lot of optimising here to check collisions only with neccessary meshes

    const rays = [
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, -1, 0),
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(0, 0, -1)
    ];
    const maxRayDistance = 32;

    let caster = new THREE.Raycaster();

    for(let i=0; i < rays.length; i++) {
      caster.set(entity.position, rays[i]);
      const collisions = caster.intersectObjects(collidables);
      if(collisions.length > 0 && collisions[0].distance <= maxRayDistance) {
        collisions[0].object.material.color.set( 0xff0000 );
        switch(i) {
          case 0: colliding.right  = true; break;
          case 1: colliding.left   = true; break;
          case 2: colliding.top    = true; break;
          case 3: colliding.bottom = true; break;
          case 4: colliding.back   = true; break;
          case 5: colliding.front  = true; break;
        }
      }
    }
    return colliding;
  }
}

export default Collision;
