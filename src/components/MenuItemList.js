// src/components/MenuItemList.js
import React from 'react';

const MenuItemList = ({ items, onAddToCart, onEdit }) => (
  <div>
    {items.map(item => (
      <div key={item.id}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <button onClick={() => onAddToCart(item)}>Add to Cart</button>
        {onEdit && <button onClick={() => onEdit(item)}>Edit</button>}
      </div>
    ))}
  </div>
);

export default MenuItemList;