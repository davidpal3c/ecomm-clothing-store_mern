import Product from "../models/product.model.js";


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});        // get all products
        res.json({ products} );

    } catch (error) {
        console.log("Error in getAllProducts controller", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });

    }
};

export const getFeaturedProducts = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};    