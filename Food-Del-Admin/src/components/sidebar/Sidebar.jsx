import React from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to={'/add'} className="sidebar-option">
                <img src={assets.addIcon} alt="" />
                <p>Add Food</p>
            </NavLink>
            <NavLink to={'/list'} className="sidebar-option">
                <img src={assets.basketIcon} alt="" />
                 <p>List Food</p>
            </NavLink>
            <NavLink to={'/order'} className="sidebar-option">
                <img src={assets.orderIcon} alt="" />
                <p>Order</p>
            </NavLink>
        </div>
    </div>
  )
} 

export default Sidebar