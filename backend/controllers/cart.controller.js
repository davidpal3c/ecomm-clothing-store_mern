


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