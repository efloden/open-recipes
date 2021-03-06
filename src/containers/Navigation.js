import React, { Component } from 'react'
import '../App.css'
import logo from '../logo.svg'
import * as firebase from 'firebase'
import RecipeList from './RecipeList.js'
import RecipeWall from './RecipeWall.js'
import {
  Button,
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
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
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/open-recipies/">
              <span style={{ width: 95 }}>Open Recipes</span>
              <img src={logo} className="App-logo" alt="logo" />
            </NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem >
                <NavLink>
                  <Link to="/open-recipes/recipes">Recipes</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to="/open-recipes/lists">Lists</Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <Button onClick={this.logOut}>
                  Log out
                </Button>
              </NavItem>
            </Nav>
          </Navbar>
          <Route exact path="/open-recipes/" component={RecipeList.RecipeList} />
          <Route path="/open-recipes/recipes" component={RecipeWall} />
          <Route path="/open-recipes/lists" component={RecipeList} />
        </div>
      </Router>
  )
  }
}

export default Navigation
