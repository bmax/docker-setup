export const update = (entities) => {
  entities.forEach((entity) => {
    if( entity.input    === undefined ||
        entity.velocity === undefined)
      return;

    entity.input.inputs.forEach((i) => {
      if(!i.active) return;
      if(i.action === 'jump') {
        if(!i.jumping) {
          handlers['jump'](entity.velocity);
          i.jumping = true;
        }
        return;
      }
      handlers[i.action](entity.velocity);
    });
  });
  return entities;
};

const handlers = {
  moveForward  : (v) => { v.linear.z  += -10 },
  moveBackward : (v) => { v.linear.z  += 10  },
  moveLeft     : (v) => { v.linear.x  += -10 },
  moveRight    : (v) => { v.linear.x  += 10  },
  rotateLeft   : (v) => { v.angular.y += .1  },
  rotateRight  : (v) => { v.angular.y += -.1 },
  jump         : (v) => { v.linear.y  += 35 }
};
