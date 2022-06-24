const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    shop: { type: String, required: true },
    description: { type: String, required: true }
})

module.exports = mongoose.model('Menu', menuSchema)