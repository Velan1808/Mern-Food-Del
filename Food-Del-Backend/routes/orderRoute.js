import express from "express"
import authTokenMiddleware from "../middleware/authToken.js";
import { listOrders, orderStatus, placeOrder, userOrder, verifyOrder } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authTokenMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userOrder",authTokenMiddleware, userOrder)
orderRouter.get("/listOrder", listOrders)
orderRouter.post("/orderStatus", orderStatus);

export default orderRouter;