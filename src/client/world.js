import World from 'shared/world';
import * as Meshes from './meshes';

export default class ClientWorld extends World {
  constructor(texture) {
    super();
    this.mesh = Meshes.world(this, texture);
    this.dirty = false;
  }
}
