import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    isConfirmed: {
      type: Boolean,
      default: false
    }
  }, { timestamps: true , versionKey: false})

  
const hashing = (password) => bcrypt.hashSync(password, 8);

export const userModel = mongoose.model('User', userSchema)