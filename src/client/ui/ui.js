import React from 'react';
import { render as renderDOM } from 'react-dom';
import Root from './components/root';

export const render = props => {
  renderDOM(<Root {...props} />, document.getElementById('ui'));
}
