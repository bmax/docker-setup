import React from 'react';

const Inventory = props => {
  const items = props.items.map(item => (<Item {...item} />));
  return (
    <div>
      {items}
    </div>
  );
};

const Item = props => (
  <span>{props.name}</span>
);

export default Inventory;
