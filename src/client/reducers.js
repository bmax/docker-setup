import { Map } from 'immutable';

export const entities = (state=Map(), action) => {
  switch(action.type) {
    case 'TRANSLATE_MESH':
      return state.updateIn([id, 'mesh', 'mesh',], mesh => {
        mesh.translateX(action.linear[0]*100);
        mesh.translateY(action.linear[1]*100);
        mesh.translateZ(action.linear[2]*100);
      });
    case 'ROTATE_MESH':
      return state.updateIn([id, 'mesh', 'mesh',], mesh => {
        // use vector object cache?
        mesh.rotateOnAxis(new THREE.Vector3(1,0,0), angular[0]*100);
        mesh.rotateOnAxis(new THREE.Vector3(0,1,0), angular[1]*100);
        mesh.rotateOnAxis(new THREE.Vector3(0,0,1), angular[2]*100);
      });
    default:
      return state;
  }
}

export const client = (state={}, action) => {

}
