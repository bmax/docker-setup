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
    const originPoint = entity.position.clone();
    for (let vertexIndex = 0; vertexIndex < entity.geometry.vertices.length; vertexIndex++)
  	{
  		const localVertex = entity.geometry.vertices[vertexIndex].clone();
  		const globalVertex = localVertex.applyMatrix4( entity.matrix );
  		const directionVector = globalVertex.sub( entity.position );

  		const ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
  		const collisionResults = ray.intersectObjects( collidables );
  		if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() + 20 ) {
        if(vertexIndex === 4) { colliding.front = true; }
        if(vertexIndex === 5 ) { colliding.back = true; }
        if(vertexIndex === 0 || vertexIndex === 1) { colliding.right = true; }
        if(vertexIndex === 4 || vertexIndex === 5) { colliding.left = true; }
        if(vertexIndex === 6) { colliding.bottom = true; }
        console.log(vertexIndex);
      }
  	}
    return colliding;
  }
}

export default Collision;
