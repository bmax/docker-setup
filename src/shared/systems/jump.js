import Entity from 'shared/entity';

const jumpSpeed = .015;
const jumpTime = 80;

const Jump = {
  update(entities) {
    const now = new Date().getTime();
    entities.forEach(entity => {
      if(!Entity.hasComponents(entity, ['jump', 'input', 'collision'])) { return; }
      entity.input.inputs.forEach(i => {
        if(entity.jump.jumping) {
          if((entity.jump.start + jumpTime) < now) {
            entity.jump.jumping = false;
          } else {
            entity.velocity.linear.y += jumpSpeed;
          }
          return;
        }
        if(!i.active || i.action !== 'jump') { return; }
        if(entity.collision.colliding.bottom) {
          entity.jump.jumping = true;
          entity.jump.start = now;
        }
      });
    });
    return entities;
  }
}

export default Jump;
