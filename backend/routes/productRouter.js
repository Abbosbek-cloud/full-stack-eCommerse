import express from "express";
import Product from "../models/productModel.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get("/products/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  product
    ? res.send(product)
    : res.status(404).send({ message: "Product Not Found" });
});

productRouter.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  console.log(req.params.id);
  product
    ? res.send(product)
    : res.status(404).send({ message: "Product Not Found" });
});

export default productRouter;
