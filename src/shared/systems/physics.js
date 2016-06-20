export const update = (world, entities) => {
  entities.forEach((entity) => {
    if( typeof entity.velocity === 'undefined' ||
        typeof entity.body     === 'undefined')
      return;

    if(typeof entity.gravity !== 'undefined') {
      entity.velocity.linear.y -= 10;
    }
    entity.body.position.x += entity.velocity.linear.x;
    entity.body.position.y += entity.velocity.linear.y;
    entity.body.position.z += entity.velocity.linear.z;

    entity.body.rotation.x += entity.velocity.angular.x;
    entity.body.rotation.y += entity.velocity.angular.y;
    entity.body.rotation.z += entity.velocity.angular.z;
  });

  return entities;
}

const broadPhase = (stuff) =>  {
  //find all the groups that need collision checking between them
}

const narrowPhase = (groups) => {
  //go through collision groups and do the checks
}
