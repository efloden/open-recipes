import React, { Component } from 'react'
import '../App.css'
import logo from '../logo.svg'
import * as firebase from 'firebase'
import {
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap'

class Navigation extends Component {

  logOut = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    })
  }
  render() {
    return (
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
            <NavItem eventKey={1} href="#">Recipes</NavItem>
            <NavItem eventKey={2} href="#">Lists</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} onClick={this.logOut}>Log out</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  )}
}

export default Navigation
