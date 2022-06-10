import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";
import axios from "axios";
import { Store } from "../Store";

const Product = ({ product }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addCartCardHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity++ : 1;

    const { data } = await axios.get(`/api/v1/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }

    ctxDispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity },
    });
  };

  return (
    <Card key={product.slug} className="card mx-auto">
      <div className="img-wrapper">
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} alt={product.category} />
        </Link>
      </div>
      <Card.Body>
        <Link to="/">
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>$ {product.price}</Card.Text>

        <Button
          onClick={() => addCartCardHandler(product)}
          disabled={product.quantity === product.countInStock}
        >
          Add to cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
