import React, { useEffect, useState } from 'react'
import './Add.css'
import axios from 'axios'
import { assets } from '../../assets/assets'
import {toast } from 'react-toastify';

const Add = ({URL}) => {

  const [image, setImage]=useState(false);
  const [preview, setPreview]=useState(null);

  const [data, setData]=useState({
  name:"",
  description:"",
  category:"Salad",
  price:"",
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data =>({...data,[name]:value}))
    
  }


  const onSumbitHandler = async(e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("category",data.category)
    formData.append("price",Number(data.price))
    formData.append("image", image)

    const response = await axios.post(`${URL}/api/food/add`, formData)
    if(response.data.success){
      setData({
        name:"",
        description:"",
        category:"Salad",
        price:"",
      })
      setImage(false);
      toast.success(response.data.message);
    }
    else{
      toast.error(response.data.message);
    }
  }
  
  useEffect(()=>{
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Set the image URL to preview
      };
      reader.readAsDataURL(image); // Read image as data URL (base64)
    } else {
      setPreview(null); // Reset the preview if no image
    }
  },[image])
  

  return (
    <div className='AddFood'>
    <p className='add-title' >Add Food</p>  
    <form className='add-food' onSubmit={onSumbitHandler}>
      <div className="add-image-container">
        <p>Upload Image</p>
        <label htmlFor="image">
          <img src={preview ? preview : assets.uploadIcon} alt="" />
        </label>
        <input onChange={(e) =>setImage(e.target.files[0])} type="file" id='image' hidden required />
      </div>

     <div className="add-product-name flex-col">
        <p>Food Name</p>
        <input type="text" onChange={onChangeHandler} value={data.name} name='name' placeholder='Food Name' required/>
     </div>

     <div className="add-product-description flex-col">
        <p>Description</p>
        <textarea name="description" id="" onChange={onChangeHandler} value={data.description} rows={6} placeholder='Write about food' required></textarea>
     </div>

     <div className="add-category-price">
          <div className="add-category flex-col">
              <p>Category</p>
              <select name="category" onChange={onChangeHandler} value={data.category} id="">
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Price</p>
              <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='$20' required />
            </div>
     </div>
      

       <button type='submit'>Add</button>
    </form>
    </div>
    
  )
}

export default Add