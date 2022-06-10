import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Rating from "./Rating";
import { Helmet } from "react-helmet-async";
import Loading from "./Loading";
import ErrorBox from "./ErrorBox";
import { getError } from "../utils";
import { Store } from "../Store";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "FETCHING_DATA":
      return {
        ...state,
        loading: true,
      };
    case "FETCHED_DATA":
      return {
        ...state,
        loading: false,
        product: payload,
      };
    case "FETCH_FAIL":
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

const ProductFull = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(logger(reducer), {
    product: [],
    loading: true,
    error: "",
  });

  console.log(product);

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      dispatch({ type: "FETCHING_DATA" });
      try {
        const response = await axios.get(`/api/v1/products/slug/${slug}`);
        dispatch({ type: "FETCHED_DATA", payload: response.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchDataFromBackend();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { cart } = state;

  console.log(
    "Cart",
    cart.cartItems.find((x) => x._id === product._id)
  );

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);

    const quantity = existItem ? existItem.quantity++ : 1;
    const { data } = await axios.get(`/api/v1/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }

    ctxDispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });

    navigate("/cart");
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorBox variant="danger">{error}</ErrorBox>
  ) : (
    <Row>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>
      <Col
        sm={12}
        md={8}
        className="p-1 d-flex justify-content-center align-items-center flex-column"
      >
        <img src={product.image} alt="" className="w-50 mx-auto rounded" />
        <ListGroup variant="flush" className="d-block mt-3">
          <ListGroup.Item>
            <h1>{product.name}</h1>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </ListGroup.Item>
          <ListGroup.Item>Price: $ {product.price}</ListGroup.Item>
          <ListGroup.Item>
            Description:{" "}
            <p className="text-danger">{product.description.toUpperCase()}</p>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col sm={12} md={4} className="h-100 p-1">
        <Card>
          <Card.Body>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>${product.price}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status: </Col>
                <Col>
                  {product.countInStock ? (
                    <Badge bg="success">In Stock</Badge>
                  ) : (
                    <Badge bg="danger">Unavailable</Badge>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
            {product.countInStock > 0 && (
              <ListGroup.Item>
                <div className="d-grid">
                  <Button onClick={addToCartHandler} variant="primary">
                    Add to Cart
                  </Button>
                </div>
              </ListGroup.Item>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductFull;
