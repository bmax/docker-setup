export const update = (keyboard, entities) => {
  entities.forEach((entity) => {
    if(entity.input === undefined) return;

    entity.input.inputs.forEach((i) => {
      i.active = keyboard.isDown(i.key);
    });
  });
  return entities;
}
