import  userModel  from "../models/userModel.js";


//add cartData
const addCart = async(req, res) =>{
    try{
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message:"Added to cartData"})
    }
    catch(err){
        res.json({success:false, message: err || "Error"})
    }
}


//remove cartData
const removeCart = async(req, res) =>{
    try{
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if( cartData[req.body.itemId]){
            cartData[req.body.itemId] -= 1;
        }
        
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message:"cartData Removed"})
    }
    catch(err){
        res.json({success:false, message: err.message || "Error"})
    }

}

//get cartData

const getCart = async(req, res) =>{
    try{
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        res.json({success:true, cartData})
    }
    catch(err){
        res.json({success:false, message: err.message || "Error"})
    }

}

export {addCart, removeCart, getCart};