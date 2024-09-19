// src/components/AdminMenuItemList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditMenuItemForm from './EditMenuItemForm';

const AdminMenuItemList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [addingItem, setAddingItem] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:5003/api/admin-menu-items')
      .then(response => {
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the menu items!', error);
      });
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleSave = (updatedItem) => {
    // Convert string values to boolean
    updatedItem.active = updatedItem.active === 'true' || updatedItem.active === true;
    updatedItem.free_delivery = updatedItem.free_delivery === 'true' || updatedItem.free_delivery === true;

    axios.put(`http://localhost:5003/api/menu-items/${updatedItem.id}`, updatedItem)
      .then(response => {
        setMenuItems(menuItems.map(item => (item.id === updatedItem.id ? response.data : item)));
        setEditingItem(null);
      })
      .catch(error => {
        console.error('There was an error updating the menu item!', error);
      });
  };

  const handleCancel = () => {
    setEditingItem(null);
    setAddingItem(false);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5003/api/menu-items/${id}`)
      .then(() => {
        setMenuItems(menuItems.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the menu item!', error);
      });
  };

  const handleAdd = (newItem) => {
    // Convert string values to boolean
    newItem.active = newItem.active === 'true' || newItem.active === true;
    newItem.free_delivery = newItem.free_delivery === 'true' || newItem.free_delivery === true;

    axios.post('http://localhost:5003/api/menu-items', newItem)
      .then(response => {
        setMenuItems([...menuItems, response.data]);
        setAddingItem(false);
      })
      .catch(error => {
        console.error('There was an error adding the menu item!', error);
      });
  };

  return (
    <div>
      <h2>Menu Item List</h2>
      {editingItem ? (
        <EditMenuItemForm item={editingItem} onSave={handleSave} onCancel={handleCancel} />
      ) : addingItem ? (
        <EditMenuItemForm item={{}} onSave={handleAdd} onCancel={handleCancel} />
      ) : (
        <>
          <button onClick={() => setAddingItem(true)}>Add New Item</button>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Active</th>
                <th>Date of Launch</th>
                <th>Category</th>
                <th>Free Delivery</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.active ? 'Yes' : 'No'}</td>
                  <td>{item.date_of_launch}</td>
                  <td>{item.category}</td>
                  <td>{item.free_delivery ? 'Yes' : 'No'}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminMenuItemList;