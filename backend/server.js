import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRouter.js";

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

// seed router
app.use("/api/v1/seed", seedRouter);

// product router
app.use("/api/v1/products", productRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is open at https://localhost:${port}`);
});
