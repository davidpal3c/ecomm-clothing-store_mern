import express from "express";
import { addToCart } from "../controllers/cart.controller.js"; // Import the addToCart controller
import { protectRoute } from "../middleware/auth.middleware.js"; // Import the protectRoute middleware

const router = express.Router();

router.get('/', protectRoute, getCartProducts); 
router.post('/', protectRoute, addToCart);
router.delete('/', protectRoute, removeAllFromCart); 
router.put('/:id', protectRoute, updateQuantity); 

export default router; 