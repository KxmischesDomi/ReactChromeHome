import logo from "./logo.svg"
import * as React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import "./App.css"
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"

import ToDo from "./components/todo/ToDo"
import Home from "./components/home/Home"
import TicTacToe from "./components/ttt/TicTacToe"
import PomoFocus from "./components/pomofocus/PomoFocus";

function App() {
  return (
      <div className="App">
          <Navbar bg="dark" variant="dark" sticky="top" expand={"lg"}>
              <Navbar.Brand href={"home"}>
                  <img src={logo} alt={"Not found"} width={"40px"} height={"40px"} />{' '}
                  Home
              </Navbar.Brand>

              <Navbar.Toggle className={"toggle"} />
              <Navbar.Collapse className={"collapse"}>
                  <Nav>
                      <NavDropdown menuVariant={"dark"} title={"Social"}>
                          <NavDropdown.Item href={"https://mail.google.com/mail/"}>Mail</NavDropdown.Item>
                          <NavDropdown.Item href={"https://www.youtube.com/"}>Youtube</NavDropdown.Item>
                          <NavDropdown.Item href={"https://www.twitch.tv/"}>Twitch</NavDropdown.Item>
                          <NavDropdown.Divider/>
                          <NavDropdown.Item href={"https://www.github.com/"}>Github</NavDropdown.Item>
                          <NavDropdown.Item href={"https://www.curseforge.com/"}>Curseforge</NavDropdown.Item>
                      </NavDropdown>
                      <Nav.Link href={"pomofocus"}>Pomofocus</Nav.Link>
                      <Nav.Link href={"todo"}>Todo</Nav.Link>
                      <Nav.Link href={"tictactoe"}>TicTacToe</Nav.Link>
                  </Nav>
              </Navbar.Collapse>

          </Navbar>
          <div className="content">
              <Router>
                  <Routes>
                      <Route path={"pomofocus"} element={<PomoFocus />} />
                      <Route path={"todo"} element={<ToDo />} />
                      <Route path={"tictactoe"} element={<TicTacToe />} />
                      <Route path={"*"} element={<Home />} />
                  </Routes>
              </Router>
          </div>
      </div>
  );
}

export default App;