// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomerPage from "./Pages/CustomerPage";
import AdminPage from "./Pages/AdminPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/customer" element={<CustomerPage/>} />
      <Route path="/admin" element={<AdminPage/>} />
    </Routes>
  </Router>
);

export default App;
