export const World = {
  get(world, position) {
    return world.blocks.get(position.x, position.y, position.z);
  },

  set(world, position) {
    return world.blocks.set(position.x, position.y, position.z);
  },

  index(world, position) {
    return world.blocks.index(position.x, position.y, position.z);
  }
}
