// src/pages/CustomerPage.js
import React, { useState, useEffect } from 'react';
import MenuItemList from '../components/MenuItemList';
import Cart from '../components/Cart';
import CustomerMenuItemList from '../components/CustomerMenuItemList';

const CustomerPage = () => {
  
  return (
    <div>
      <h1>Customer Page</h1>
      <CustomerMenuItemList />
      {/* <Cart items={cartItems} onRemove={removeFromCart} /> */}
    </div>
  );
};

export default CustomerPage;