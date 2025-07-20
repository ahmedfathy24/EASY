import { productModel } from '../../../db/models/product.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const getLatestProducts = async (req, res) => {
    try {
        const latestProducts = await productModel.find().sort({ createdAt: -1 }).limit(6);
        res.json(latestProducts);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}


export const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const product = new productModel(req.body);
        await product.save();
        res.status(201).json({ message: 'Product created', product });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updated = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product updated', product: updated });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deleted = await productModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
