import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error.message);
  });

const app = express();

app.get("/api/v1/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/v1/products/slug/:slug", (req, res) => {
  const product = data.products.find((card) => card.slug === req.params.slug);
  product
    ? res.send(product)
    : res.status(404).send({ message: "Product Not Found" });
});

app.get("/api/v1/products/:id", (req, res) => {
  const product = data.products.find((card) => card._id === req.params.id);
  console.log(req.params.id);
  product
    ? res.send(product)
    : res.status(404).send({ message: "Product Not Found" });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is open at https://localhost:${port}`);
});
