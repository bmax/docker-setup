import Entity from 'shared/entity';

const Physics = {
  update(entities) {
    entities.forEach((entity) => {
      if(!Entity.hasComponents(entity, ['velocity', 'body'])) { return; }

      entity.body.position.x += entity.velocity.linear.x;
      entity.body.position.y += entity.velocity.linear.y;
      entity.body.position.z += entity.velocity.linear.z;

      entity.body.rotation.x += entity.velocity.angular.x;
      entity.body.rotation.y += entity.velocity.angular.y;
      entity.body.rotation.z += entity.velocity.angular.z;

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
