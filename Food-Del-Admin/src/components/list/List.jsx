import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from 'react-toastify';

const List = ({URL}) => {

  const [items, setItems] = useState({});

  const foodList = async() =>{
     const response = await axios.get(`${URL}/api/food/list`)
     if(response.data.success){
      setItems(response.data.data)
     }
  }

  const removeFood = async(foodId) =>{
      const response = await axios.post(`${URL}/api/food/remove`,{id:foodId})
      if(response.data.success){
        foodList();
        toast.success(response.data.message)
       }
       else{
        toast.error(response.data.message)
       }
  }
  useEffect(()=>{
    foodList();
 // eslint-disable-next-line
  },[])
  return (
    <div className="food-list">
      <p>All Foods List</p>
      <div className="food-lists foodView">
          <p>Image</p>
          <p>Name</p>
          <p className='category'>Category</p>
          <p>Price</p>
          <p>cancle</p>
      </div> 
 
      <>
        {items.length > 0 ? (
          items.map(food => (
            <div key={food._id} className="food-list-container foodView">
              <img src={`${URL}/images/` + food.image} alt="" />
              <p>{food.name}</p>
              <p className='category'>{food.category}</p>
              <p>{food.price}</p>
              <p className='remove' onClick={()=>removeFood(food._id)}>X</p>
            </div>
          ))
        ) : (
          <p>No food items available</p>
        )}
      </>
    </div>
  )
}

/*<div key={index} className="food-list-container foodView" >
             
   </div>*/

export default List