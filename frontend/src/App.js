import { Link, Route, Routes } from "react-router-dom";
import Homescreen from "./components/Homescreen";
import "./App.css";
import "./styles/header.css";
import "./styles/main.css";
import ProductFull from "./components/ProductFull";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "react-bootstrap/esm/Badge";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";
import { Store } from "./Store";
import CartPage from "./components/CartPage";
// import CartPage from "./components/CartPage";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  console.log(cart);

  cart.cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  console.log("quantity", cart.cartItems.quantity);
  return (
    <div className="d-flex flex-column site-container">
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>AmazonClone</Navbar.Brand>
            </LinkContainer>
            <Nav>
              <Link to="/cart" className="text-light">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge
                    pill
                    bg="danger"
                    className="text-center ms-1 p-2 rounded-circle"
                    style={{
                      fontSize: "14px",
                      verticalAlign: "middle",
                      textAlign: "center",
                    }}
                  >
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Homescreen />} />
            <Route path="/product/:slug" element={<ProductFull />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Container>
      </main>
      <footer className="text-center py-3 bg-dark text-light">
        All services licensed {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
