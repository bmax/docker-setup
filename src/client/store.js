import { combineReducers, compose, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { client, entities, world, auth, chat } from './reducers';

export function buildStore(socket) {
  const rootReducer = combineReducers({
    client,
    entities,
    world,
    auth,
    chat
  });

  return compose(
    applyMiddleware(remoteActionMiddleware(socket),thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)(rootReducer);
}
