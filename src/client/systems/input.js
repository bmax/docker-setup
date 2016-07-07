import Entity from 'shared/entity';

const Input = {
  update(entities, keyboard) {
    entities.forEach(entity => {
      if(!Entity.hasComponents(entity, ['input'])) { return; }
      entity.input.inputs.forEach(i => {
        i.active = keyboard.isDown(i.key);
      });
    });
    return entities;
  }
}

export default Input;
