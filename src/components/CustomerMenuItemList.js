// src/components/CustomerMenuItemList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerMenuItemList = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:5003/api/customer-menu-items')
      .then(response => {
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the menu items!', error);
      });
  }, []);

  const handleAddToCart = (item) => {
    // Logic to add menu item to cart
    console.log('Add to cart:', item);
  };

  return (
    <div>
      <h2>Menu Item List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Free Delivery</th>
            <th>Add to Cart</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>{item.free_delivery ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerMenuItemList;