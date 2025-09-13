const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName:{
    type: String, 
    required: true
    },
  productName:{ 
    type: String, 
    required: true 
    },
  status:{ 
    type: String, 
    enum: ["pending", "shipped", "delivered"], default: "pending" 
    },
},
  {timestamps:true});


module.exports = mongoose.model("Order", orderSchema);
