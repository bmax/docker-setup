import Entity from 'shared/entity';

const Gravity = {
  update(entities) {
    entities.forEach(entity => {
      if(!Entity.hasComponents(entity, ['gravity', 'collision', 'velocity', 'body'])) { return; }
      if(!entity.collision.colliding.bottom) {
        entity.velocity.linear.y -= .1;
      }
    });
    return entities;
  }
}

export default Gravity;
