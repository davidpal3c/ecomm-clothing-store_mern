import Product from "../models/product.model.js";


export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        const existingItem = user.cartItems.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cartItems.push(productId);
            // user.cartItems.push({ id: productId, quantity: 1 });
        }

        await user.save();
        res.json(user.cartItems);
        // res.status(200).json({ message: "Product added to cart successfully", cartItems: user.cartItems });

    } catch (error) {
        console.log("Error in addToCart controller", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
} 


export const removeAllFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;
        // Check if the user has any items in the cart
        if (!productId) {
            user.cartItems = [];
        } else {
            user.cartItems = user.cartItems.filter(item => item.id !== productId);
        }

        await user.save();
        res.json(user.cartItems);
        // res.status(200).json({ message: "All items removed from cart successfully", cartItems: user.cartItems
    } catch (error) {
        console.log("Error in removeAllFromCart controller", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const { id:productId } = req.params;            
        const { quantity } = req.body;
        const user = req.user;

        const item = user.cartItems.find(item => item.id === productId);

        if (item) {
            if(quantity === 0) {
                user.cartItems = user.cartItems.filter(item => item.id !== productId);
                await user.save();
                return res.json(user.cartItems);
                // res.status(200).json({ message: "Item removed from cart successfully", cartItems: user.cartItems });
            } 

            item.quantity = quantity;
            await user.save();
            res.json(user.cartItems);
            // res.status(200).json({ message: "Quantity updated successfully", cartItems: user.cartItems });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.log("Error in updateQuantity controller", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
        
    }
}


export const getCartProducts = async (req, res) => {
    try {
        const products = await Product.find({ _id: { $in: req.user.cartItems } });              // Fetch products based on cart items

        // add quantity to each product
        const cartItems = products.map(product => {
            const item = req.user.cartItems.find(cartItem => cartItem.id === product.id);
            return { ...product.toJSON(), quantity: item.quantity }
        })

        res.json(cartItems);
        // res.status(200).json({ message: "Cart products fetched successfully", cartItems });
    } catch (error) {
        console.log("Error in getCartProducts controller", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}