import Entity from 'shared/entity';

const Movement = {
  update(entities) {
    entities.forEach(entity => {
      if(!Entity.hasComponents(entity, ['input', 'velocity'])) { return; }

      entity.input.inputs.forEach(i => {
        if(!i.active) return;
        if(this.handlers[i.action] !== undefined) {
          this.handlers[i.action](entity.velocity);
        }
      });
    });
    return entities;
  },

  handlers: {
    moveForward  : v => { if(v.linear.z > -.3) v.linear.z  += -.1 },
    moveBackward : v => { if(v.linear.z < .3)  v.linear.z  += .1  },
    moveLeft     : v => { if(v.linear.x > -.3) v.linear.x  += -.1 },
    moveRight    : v => { if(v.linear.x < .3)  v.linear.x  += .1  },
    rotateLeft   : v => { if(v.angular.y < .0006) v.angular.y += .0003  },
    rotateRight  : v => { if(v.angular.y > -.0006) v.angular.y += -.0003 },
  }
};

export default Movement;
