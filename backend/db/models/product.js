import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: String,
  image: String,
  price: { 
    type: Number, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true,
    default: 1
  },
  category: String,
}, { timestamps: true , versionKey: false})

export const productModel = mongoose.model('Product', productSchema)