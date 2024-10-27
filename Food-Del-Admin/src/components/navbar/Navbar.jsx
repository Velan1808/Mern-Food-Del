import React from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='Navbar'>
        <div className='logo'>
            <img className='logoIcon' src={assets.logo} alt="" />
        </div>
        <img className='profile' src={assets.profile} alt="" />
    </div>
  )
}

export default Navbar