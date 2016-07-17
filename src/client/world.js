import { World as SharedWorld } from 'shared/world';
import * as Meshes from './meshes';

export const World = {
  createMesh(world, texture) {
    return Meshes.blocks(world, texture)
  }
}
