import Entity from 'shared/entity';

const Jump = {
  update(entities) {
    entities.forEach(entity => {
      if(!Entity.hasComponents(entity, ['jump', 'input', 'collision'])) { return; }
      entity.input.inputs.forEach(i => {
        if(!i.active || i.action !== 'jump') return;
        if(!entity.jump.jumping && entity.collision.bottom) {
          entity.velocity.linear.y += .1;
          entity.juming = true;
        }
      });
    });
    return entities;
  }
}

export default Jump;
