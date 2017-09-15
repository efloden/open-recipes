import React, { Component } from 'react'
import '../App.css'
import logo from '../logo.svg'
import * as firebase from 'firebase'
import RecipeList from './RecipeList'
import RecipeWall from './RecipeWall'
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Navigation extends Component {

  logOut = () => {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }, function (error) {
      // An error happened.
      console.error(error)
    })
  }
  render () {
    return (
      <Router>
        <div>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <span style={{ width: 95 }}>Open Recipes</span>
                <img src={logo} className="App-logo" alt="logo" />
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1}>
                  <Link to="/open-recipes/recipes">Recipes</Link>
                </NavItem>
                <NavItem eventKey={2}>
                  <Link to="/open-recipes/lists">Lists</Link>
                </NavItem>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} onClick={this.logOut}>Log out</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Route exact path="/open-recipes/" component={RecipeList} />
          <Route path="/open-recipes/recipes" component={RecipeWall} />
          <Route path="/open-recipes/lists" component={RecipeList} />
        </div>
      </Router>
  )
  }
}

export default Navigation
