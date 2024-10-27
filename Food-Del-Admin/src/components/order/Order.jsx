import React from 'react'
import './Order.css'
import axios from "axios"
import { useEffect, useState } from 'react'
import {toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Order = ({URL}) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async() =>{
    const response = await axios.get(URL+"/api/order/listOrder");
    if(response.data.success === true){
      setOrders(response.data.data);
    }else{
      toast.error("Error")
    }
  }

  const onStatusHandler = async (userId, e) => {
    let statusSelected = e.target.value;
    try {
      const response = await axios.post(URL + "/api/order/orderStatus", { userId, statusSelected });
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  
  useEffect(() =>{
    fetchAllOrders();
    // eslint-disable-next-line
  },[])
  return (
    <div className="order-add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) =>{
          return(
            <div key={index} className="order-items">
            <div className='order-items-details'>
            <img src={assets.parcelIcon} alt="" />
              <p className="order-item-food">
                {order.items.map((item, index) =>{
                  if(index === order.items.lenght-1){
                    return item.name+" x "+item.quantity;
                  }
                  else{
                    return item.name+" x "+item.quantity+" ,";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <select name="" value={order.status}  onChange={(e) => onStatusHandler(order._id, e)}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Deliveried">Deliveried</option>
              </select>
            </div>
            <div className="order-item-address">
                <p className="order-item-name">{order.address.firstname+" "+order.address.lastname}</p>
                <p>{order.address.street+", "+ order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.pincode}</p>
                <p className="order-item-phone">{order.address.phone}</p>
            </div>
          </div>
          ) })}
      </div>
    </div>
  )
}

export default Order