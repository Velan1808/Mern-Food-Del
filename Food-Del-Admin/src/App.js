import React from 'react';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from "./components/add/Add";
import List from './components/list/List';
import Order from './components/order/Order';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const App = () => {
  const URL = 'https://mern-food-del-5h6c.onrender.com';

  return (
    <div className='App'>
      <ToastContainer autoClose={3000} />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <div className="page-content" >
          <Routes>
            <Route path='/add' element={<Add URL={URL} />} />
            <Route path='/list' element={<List URL={URL} />} />
            <Route path='/order' element={<Order URL={URL} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
