import Entity from 'shared/entity';

const gravity = .003;

const Gravity = {
  update(entities) {
    entities.forEach(entity => {
      if(!Entity.hasComponents(entity, ['gravity', 'collision', 'velocity', 'body'])) { return; }
      if(!entity.collision.colliding.bottom) {
        if(entity.velocity.linear.y > -.2) {
          entity.velocity.linear.y -= gravity;
        }
      }
    });
    return entities;
  }
}

export default Gravity;
