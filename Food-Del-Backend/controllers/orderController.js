import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"
import "dotenv/config.js"


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order for frontend
const placeOrder = async(req, res) =>{

    const frontend_url = "http://localhost:3000"
try{
       // Create new order
       const newOrder = new orderModel({
        userId: req.body.userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address   
      });
  
      await newOrder.save();
  
      // Clear the user's cart
      await userModel.findByIdAndUpdate(req.body.userId, { cartData:{}}); 

 const line_items = req.body.items.map((item)=>({
    price_data:{
        currency:"inr",
        product_data:{
            name:item.name
        },
        unit_amount:item.price*80
    },
    quantity:item.quantity
 }))

  line_items.push({
    price_data:{
        currency:"inr",
        product_data:{
            name:"Delivery Charges"
        },
        unit_amount:50*80
    },
    quantity:1
  })

 const session = await stripe.checkout.sessions.create({
    line_items:line_items,
    mode:'payment',
    success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
 })

 res.json({success:true, session_url:session.url})

}   
catch(err){
    console.error("Error while placing order:", err);
    res.json({ success: false, message: "Order placement failed. Please try again later." });
  }
      
  }


  const verifyOrder = async(req, res) => {
    try {
      const { orderId, success } = req.body; 
      if (success === "true") {
        await orderModel.findByIdAndUpdate(orderId, { payment: true });
        res.json({ success: true, message: "paid" });
      } 
      if (success === "false") {
        await orderModel.findByIdAndDelete(orderId);
        res.json({ success: false, message: "payment cancelled" });
      }
    } catch (err) {
      res.json({ success: false, message: "Error" });
    }
  };
  

  const userOrder = async(req, res) =>{
    try{
      const order = await orderModel.find({userId:req.body.userId});
      res.json({success:true, data:order} )
    }catch(err){
       res.json({success:false, message: "Error to get UserOrder"})
    }
  }

  //fetching all orders
  const listOrders = async(req, res)=>{
       try{
      const orders = await orderModel.find();
      res.json({success:true, data:orders})
       }catch(err){
        res.json({success:false, message:"Can't list the orders"})
       }
  }
  
  const orderStatus = async (req, res) => {
    try {
      const response = await orderModel.findByIdAndUpdate(
        req.body.userId,
        { status: req.body.statusSelected },
        { new: true }  
      );
      res.json({ success: true, status: response.status, message: "Status updated" });
    } catch (err) {
      res.json({ success: false, message: "Can't change the order status" });
    }
  };
  

export {placeOrder,verifyOrder, userOrder, listOrders, orderStatus}