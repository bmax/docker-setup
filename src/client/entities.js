import THREE from 'three';
import Entity from 'shared/entity';
import * as ClientComponents from './components';
import * as Components from 'shared/components';
import * as Meshes from './meshes';

export const localPlayer = () => {
  let entity = {};
  entity.id = Entity.create();

  entity.input = ClientComponents.input([
    { action: 'moveForward' , key: 'w', active: false },
    { action: 'moveBackward', key: 's', active: false },
    { action: 'moveLeft'    , key: 'q', active: false },
    { action: 'moveRight'   , key: 'e', active: false },
    { action: 'rotateLeft'  , key: 'a', active: false },
    { action: 'rotateRight' , key: 'd', active: false },
    { action: 'jump'        , key: ' ', active: false, jumping: false }
  ]);
  entity.body      = Components.body({x:1,y:10,z:1},{x:0,y:0,z:0});
  entity.velocity  = Components.velocity();
  entity.collision = Components.collision();
  entity.gravity   = Components.gravity();
  entity.jump      = Components.jump();
  entity.mesh      = ClientComponents.mesh(Meshes.player(entity.id, entity.body.position));
  entity.camera    = ClientComponents.camera();

  return entity;
}

export const remotePlayer = () => {
  let entity = {};
  entity.id = Entity.create();

  return entity;
}
