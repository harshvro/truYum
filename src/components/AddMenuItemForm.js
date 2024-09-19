import React, { useState } from "react";

const AddMenuItemForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    active: true,
    date_of_launch: '',
    category: 'Starter', // Default value for category
    free_delivery: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === 'true' ? true : value === 'false' ? false : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      active: formData.active === 'true' || formData.active === true,
      free_delivery: formData.free_delivery === 'true' || formData.free_delivery === true,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Active:</label>
        <select
          name="active"
          value={formData.active ? 'true' : 'false'}
          onChange={handleChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div>
        <label>Date of Launch:</label>
        <input
          type="date"
          name="date_of_launch"
          value={formData.date_of_launch}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Starter">Starter</option>
          <option value="Main Course">Main Course</option>
          <option value="Desserts">Desserts</option>
          <option value="Drinks">Drinks</option>
        </select>
      </div>
      <div>
        <label>Free Delivery:</label>
        <select
          name="free_delivery"
          value={formData.free_delivery ? 'true' : 'false'}
          onChange={handleChange}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default AddMenuItemForm;