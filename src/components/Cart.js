// src/components/Cart.js
import React from 'react';

const Cart = ({ items, onRemove }) => (
  <div>
    <h2>Cart</h2>
    {items.map(item => (
      <div key={item.id}>
        <h3>{item.name}</h3>
        <button onClick={() => onRemove(item)}>Remove</button>
      </div>
    ))}
  </div>
);

export default Cart;