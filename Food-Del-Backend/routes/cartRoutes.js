import express from "express"
import { addCart, getCart, removeCart } from "../controllers/cartController.js";
import authTokenMiddleware from "../middleware/authToken.js";

const cartRouter = express.Router();

cartRouter.post("/add", authTokenMiddleware,addCart);
cartRouter.post("/remove", authTokenMiddleware,removeCart);
cartRouter.get("/get", authTokenMiddleware,getCart);


export default cartRouter;