import React from 'react';
import Power     from './power';
import Chat      from './chat';
import Inventory from './inventory';
import Menu      from './menu';
import Dev       from './dev';

const Root = props => (
  <div>
    <Power style={powerStyle} {...props.power}/>
    <Chat style={chatStyle} {...props.chat} />
    <Inventory {...props.inventory} />
    {props.menu.show ? <Menu {...props.menu} /> : ''}
    {props.dev.show  ? <Dev  style={devStyle} {...props.dev} /> : '' }
  </div>
);

const powerStyle = {
  position: 'absolute',
  top: '20px',
  left: '20px'
};

const chatStyle = {
  position: 'absolute',
  left: '8px',
  bottom: '-38px',
  width: '400px',
  height: '200px',
  backgroundColor: '#D3D3D3',
  border: '5px solid black'
};

const devStyle = {
  position: 'absolute',
  top: '20px',
  right: '60px',
  backgroundColor: 'grey',
  textAlign: 'center'
};

export default Root;
