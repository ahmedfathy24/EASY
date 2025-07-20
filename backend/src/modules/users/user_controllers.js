import { userModel } from "../../../db/models/user.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
    try {
        const foundedUser = await userModel.findOne({ email: req.body.email });
        if (!foundedUser) {
            return res.status(404).json({ message: "User not found please try again or sign up" });
        }
        const matched = bcrypt.compareSync(req.body.password, foundedUser.password);
        if (!matched) {
            return res.status(422).json({ message: "Email or password is incorrect please try again" });
        }
        const token = jwt.sign(
            { id: foundedUser._id, role: foundedUser.role },
            "key",
            { expiresIn: "1d" }
        );
        res.json({
            message: `Welcome ${foundedUser.name}`,
            token,
            user: {
                id: foundedUser._id,
                name: foundedUser.name,
                email: foundedUser.email,
                role: foundedUser.role
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new userModel({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deleted = await userModel.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};