import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

const SignIn = () => {
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";
  return (
    <Container
      style={{
        flexDirection: "column",
      }}
    >
      <Helmet>
        <title>Login</title>
      </Helmet>
      <h1>Sign in</h1>
      <Form>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required autocomplete />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            autocomplete
            className="mb-3"
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Log in</Button>
        </div>
        <div className="mb-3">
          <Link
            to={`/signup?redirect=${redirect}`}
            className="badge bg-primary p-2 text-light"
          >
            Create new account
          </Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignIn;
