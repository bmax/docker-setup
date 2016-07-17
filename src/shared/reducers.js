export const entities = (state=Map(), action) => {
  switch(action.type) {
    case 'SET_POSITION':
      return state.updateIn([id, 'body', 'position'], position => action.position);
    case 'SET_LINEAR_VELOCITY':
      return state.updateIn([id, 'body', 'velocity', 'linear'], linear => action.linear);
    case 'SET_ANGULAR_VELOCITY':
      return state.updateIn([id, 'body', 'velocity', 'angular'], angular => action.angular);
    default:
      return state;
  }
}
