import React, { useContext } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import { Link } from "react-router-dom";
import MessageBox from "./MessageBox";
import axios from "axios";

const CartPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const length = cartItems.reduce((a, c) => a + c.quantity, 0);

  const updateCardHandler = async (item, quantity) => {
    console.log("Quantity", item);
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

  const removeItem = (item) => {
    ctxDispatch({ type: "REMOVE_ITEM", payload: item });
  };

  return (
    <>
      <Helmet>
        <title>Cart Page</title>
      </Helmet>
      <Row className="w-100">
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go to Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center justify-content-around px-2">
                    <Col md={4} className="d-flex align-items-center p-left-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      />
                      <Link
                        to={`/product/${item.slug}`}
                        className="mx-2"
                        style={{
                          fontSize: "25px",
                          fontWeight: "700",
                        }}
                      >
                        {item.name.toUpperCase()}
                      </Link>
                    </Col>
                    <Col md={3} className="d-flex align-items-center p-left-0">
                      <Button
                        varian="light"
                        onClick={() => {
                          updateCardHandler(item, item.quantity--);
                        }}
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        varian="light"
                        disabled={item.quantity === item.countInStock}
                        onClick={() => {
                          updateCardHandler(item, item.quantity++);
                        }}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col
                      md={3}
                      className="text-center"
                      style={{
                        fontSize: "20px",
                      }}
                    >
                      $ <span className="badge bg-warning">{item.price}</span>
                    </Col>
                    <Col md={1} className="p-left-0">
                      <Button variant="light" onClick={() => removeItem(item)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col sm={12} md={4} className="d-flex justify-content-center">
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    {length === 1 ? "item" : "items"}) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                    >
                      Checkout Proceed
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartPage;
