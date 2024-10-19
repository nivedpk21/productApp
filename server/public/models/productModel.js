const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://nivedpk21:nivedpk21@cluster0.cuiosip.mongodb.net/productDB?retryWrites=true&w=majority&appName=Cluster0"
);
const schema = mongoose.Schema;
const productSchema = new schema({
  productName: { type: String },
  price: { type: String },
});
const productModel = mongoose.model("product_tb", productSchema);
module.exports = productModel;
