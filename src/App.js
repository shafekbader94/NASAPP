import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Home from "./Components/Home";
import Search from "./Components/Search";
import Favourites from "./Components/Favourites";
import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

function App() {
  const [favourites, setFavorites] = useState([]);

  useEffect(() => {
    async function getData() {
      const favourites = await axios.get("http://localhost:4200/images");
      setFavorites(favourites.data);
    }
    getData();
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  document.body.style = "background: #50545b;";

  return (
    <div className="App">
      <Router>
        <div>
          <div>
            <Navbar className="navbarClass" bg="primary" variant="dark">
              <Container>
                <Nav className="me-auto">
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/search">Search</Nav.Link>
                  <span onClick={refreshPage}>
                    <Nav.Link href="/favourites">Favourites</Nav.Link>
                  </span>
                </Nav>
                <Navbar.Brand href="/home">NASAPP</Navbar.Brand>
              </Container>
            </Navbar>
          </div>
          <br></br>

          <Route exact path="/home" render={() => <Home />} />
          <Route exact path="/search" render={() => <Search />} />
          <Route
            exact
            path="/favourites"
            render={() => <Favourites favourites={favourites} />}
          />
          <Route
            exact
            path="/favourites/:id"
            render={({ match }) => (
              <Favourites
                match={match}
                favourites={[favourites.find((f) => f._id === match.params.id)]}
              />
            )}
          />
        </div>
      </Router>
    </div>
  );
}

export default App;
