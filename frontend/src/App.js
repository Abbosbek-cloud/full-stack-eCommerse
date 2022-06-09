import { Route, Routes } from "react-router-dom";
import Homescreen from "./components/Homescreen";
import "./App.css";
import "./styles/header.css";
import "./styles/main.css";
import ProductFull from "./components/ProductFull";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  return (
    <div className="d-flex flex-column site-container">
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>AmazonClone</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Homescreen />} />
            <Route path="/product/:slug" element={<ProductFull />} />
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
