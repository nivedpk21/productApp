const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const productModel = require("./public/models/productModel");
app.use(bodyparser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/addproduct", async (req, res) => {
  try {
    const productData = {
      productName: req.body.productName,
      price: req.body.price,
    };
    const saveData = await productModel(productData).save();
    if (saveData) {
      return res.status(200).json({
        message: "product added successfully",
      });
    } else {
      return res.status(400).json({
        mesage: "uable to save product data",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

app.use("/viewproduct", async (req, res) => {
  try {
    const fetchProduct = await productModel.find();
    if (fetchProduct) {
      return res.status(200).json({
        data: fetchProduct,
        message: "product data fetched successfully",
      });
    } else {
      return res.status(200).json({ message: "unable to fetch product data" });
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});

app.use("/deleteproduct/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const deleteData = await productModel.findByIdAndDelete(id);
    if (deleteData) {
      return res.status(200).json({
        message: "product deleted successfully",
      });
    } else {
      return res.status(400).json({
        message: "unable to delete product data",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
});

app.listen(4000, () => {
  console.log("server started");
});
