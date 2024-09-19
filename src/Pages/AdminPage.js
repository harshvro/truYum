// src/pages/AdminPage.js
import React, { useState, useEffect } from 'react';
import MenuItemList from '../components/MenuItemList';
import AdminMenuItemList from '../components/AdminMenuItemList';

const AdminPage = () => {
  

  return (
    <div>
      <h1>Admin Page</h1>
      <AdminMenuItemList/>
    </div>
  );
};

export default AdminPage;