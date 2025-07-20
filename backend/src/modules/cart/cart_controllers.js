import { cartModel } from '../../../db/models/cart.js';
import { productModel } from '../../../db/models/product.js';

export const getCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ user: req.user.id }).populate('items.product');
        if (!cart) return res.json({ items: [] });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const addToCart = async (req, res) => {
    try {
    const { product, quantity } = req.body;
     if (!product || !quantity) return res.status(400).json({ message: 'Product and quantity are required' });
     if (quantity <= 0) return res.status(400).json({ message: 'Quantity must be greater than 0' });
      const prod = await productModel.findById(product);
      if (!prod) return res.status(404).json({ message: 'Product not found' });
      if (quantity > prod.quantity) return res.status(400).json({ message:` Only ${prod.quantity} items available in stock` });
  
      let cart = await cartModel.findOne({ user: req.user.id });
      if (!cart) {
        cart = new cartModel({ user: req.user.id, items: [{ product, quantity }] });
      } else {
        const itemIndex = cart.items.findIndex(i => i.product.toString() === product);
        if (itemIndex > -1) {
          if (cart.items[itemIndex].quantity + quantity > prod.quantity) {
            return res.status(400).json({ message: `You can only add up to ${prod.quantity - cart.items[itemIndex].quantity} more of this product` });
          }
          cart.items[itemIndex].quantity += quantity;
        } else {
          cart.items.push({ product, quantity });
        }
      }
      await cart.save();
      res.json({ message: 'Added to cart', cart });
    } catch (err) {
      console.error("ERROR IN /cart/add:", err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  

export const removeFromCart = async (req, res) => {
    try {
        const { product } = req.body;
        let cart = await cartModel.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ message: 'There is no cart' });
        cart.items = cart.items.filter(i => i.product.toString() !== product);
        await cart.save();
        res.json({ message: 'Removed from cart', cart });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        if (!product || !quantity) return res.status(400).json({ message: 'Product and quantity are required' });
        if (quantity <= 0) return res.status(400).json({ message: 'Quantity must be greater than 0' });
        let cart = await cartModel.findOne({ user: req.user.id });
        if (!cart) return res.status(404).json({ message: 'There is no cart' });
        const item = cart.items.find(i => i.product.toString() === product);
        if (!item) return res.status(404).json({ message: 'Product not in cart' });
        item.quantity = quantity;
        await cart.save();
        res.json({ message: 'Cart item updated', cart });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}; 