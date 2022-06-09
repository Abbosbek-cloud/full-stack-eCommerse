import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";

const Product = ({ product }) => {
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
        <Button>Add to cart</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
