const Entity = {
  create() {
    return Math.random().toString(36).slice(-12);
  },

  hasComponents(entity, components) {
    for(let i=0; i < components.length; i++) {
      if(!entity.hasOwnProperty(components[i])) { return false; }
    }
    return true;
  }
};

export default Entity;
