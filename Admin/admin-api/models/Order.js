const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: {
    type: String
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  paymentType: {
    type: String,
    default: 'COD'
  },
  status: {
    type: String,
    default: 'order_placed'
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
