import { orderModel } from '../../../db/models/order.js';
import { cartModel } from '../../../db/models/cart.js';
import { productModel } from '../../../db/models/product.js';

export const checkout = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ user: req.user.id }).populate('items.product');
        if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });
        let totalPrice = 0;
        for (const item of cart.items) {
            if (item.product.quantity < item.quantity) {
                return res.status(400).json({ message: `The requested quantity exceeds available stock for ${item.product.name}. Please adjust your cart.` });
            }
            totalPrice += item.product.price * item.quantity;
        }
        for (const item of cart.items) {
            await productModel.findByIdAndUpdate(item.product._id, { $inc: { quantity: -item.quantity } });
        }
        const order = new orderModel({
            user: req.user.id,
            items: cart.items.map(i => ({ product: i.product._id, quantity: i.quantity })),
            totalPrice
        });
        await order.save();
        cart.items = [];
        await cart.save();
        res.status(201).json({ message: 'Order placed', order });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        console.log("User ID from token:", req.user.id); 
        const orders = await orderModel
            .find({ user: req.user.id })
            .populate('items.product');

        console.log("Orders Found:", orders); 

        res.json({ orders });
    } catch (err) {
        console.error("Error in getUserOrders:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


export const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find()
            .populate('user', 'name email')
            .populate('items.product', 'name price image');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const allowedStatuses = ['pending', 'shipped', 'delivered'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }
        const order = await orderModel.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order status updated', order });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const order = await orderModel.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}; 