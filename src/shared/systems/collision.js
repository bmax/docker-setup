import Entity from 'shared/entity';

const Collision = {
  update(entities, world) {
    entities.forEach(entity => {
      if(!Entity.hasComponents(entity, ['collision', 'velocity', 'body'])) { return; }
      entity.collisions.colliding = collisions(world, entity);
    });
    return entities;
  },

  collisions(world, entity) {
    const nx = Math.ceil(entity.body.position.x + entity.velocity.linear.x);
    const ny = Math.ceil(entity.body.position.y + entity.velocity.linear.y);
    const nz = Math.ceil(entity.body.position.z + entity.velocity.linear.z);

    let x = entity.body.position.x;
    let y = entity.body.position.y;
    let z = entity.body.position.z;

    let colliding = {
      right: false, left: false,
      top: false, bottom: false,
      front: false, back: false
    };

    if(x >= world.width-1 || world.get(x+1, y, z) || world.get(nx+1, ny, nz))
      colliding.right = true;
    if(x <= 0 || world.get(x-1, y, z) || world.get(nx-1, ny, nz))
      colliding.left = true;
    if(y >= world.height-1 || world.get(x, y+1, z) || world.get(nx, ny+1, nz))
      colliding.top = true;
    if(y <= 0 || world.get(x,y-1,z) || world.get(nx,ny-1,nz))
      colliding.bottom = true;
    if(z >= world.depth-1 || world.get(x,y,z+1) || world.get(nx,ny,nz+1))
      colliding.back = true;
    if(z <= 0 || world.get(x,y,z-1) || world.get(nx,ny,nz-1))
      colliding.front = true;
    return colliding;
  }
};

export default Collision;
