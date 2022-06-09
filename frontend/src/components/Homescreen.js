import React, { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "./Product";
import { Helmet } from "react-helmet-async";
import Loading from "./Loading";
import ErrorBox from "./ErrorBox";
import { getError } from "../utils";

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
        products: payload,
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

const Homescreen = () => {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      dispatch({ type: "FETCHING_DATA" });
      try {
        const response = await axios.get("/api/v1/products");
        dispatch({ type: "FETCHED_DATA", payload: response.data });
        console.log(response);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchDataFromBackend();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Amazon</title>
      </Helmet>
      <h1>Home Page</h1>
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorBox variant="danger">{error}</ErrorBox>
        ) : (
          <Row>
            {products.map((card) => (
              <Col key={card.slug} sm={6} md={4} lg={3}>
                <Product product={card} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Homescreen;
