const Order = require("../models/order");

const initOrderWatcher = (io) => {
  const changeStream = Order.watch();

  changeStream.on("change", (change) => {
    console.log("Order change detected:", change);
    if(change.operationType === "insert"){
    io.emit("orderCreated", change); 
    }
    else if(change.operationType === "update"){
       io.emit("orderUpdated", change); 
    }
    else if(change.operationType === "delete"){
      io.emit("orderDeleted" , change);
    }
  });
};

module.exports = initOrderWatcher;
