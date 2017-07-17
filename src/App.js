import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase'
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Col,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC1El82G3drBmmdsfVGryUVueaEK9jASx8",
  authDomain: "nimblelist-5848a.firebaseapp.com",
  databaseURL: "https://nimblelist-5848a.firebaseio.com",
  projectId: "nimblelist-5848a",
  storageBucket: "nimblelist-5848a.appspot.com",
  messagingSenderId: "655874835247"
};
firebase.initializeApp(config);

class App extends Component {

  constructor() {
    super()
    this.state = {
      items: undefined,
      itemName: ''
    }
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    const itemsRef = rootRef.child("shopList");
    itemsRef.on("value", snap => {
      this.setState({
        items: snap.val()
      })
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })
  }

  ShoppingList = (items) => {
    return items
    ? Object.values(items).map((item, index) => {
      return <ListGroupItem>
          {item.name}
          <Button bsSize="xsmall" bsStyle="danger"onClick={this.removeItem}>
          X</Button>
        </ListGroupItem>
    })
    : 'Nothing here but us chickens'
  }

  addItem = () => {
    const rootRef = firebase.database().ref();
    const itemsRef = rootRef.child("shopList");
    itemsRef.push().set({
      name: this.state.itemName,
      cost: 1,
      ticked: false,
    })
  }

  removeItem = () => {
    const rootRef = firebase.database().ref();
    const itemsRef = rootRef.child("shopList");
    itemsRef.push().set({
      name: this.state.itemName,
      cost: 1,
      ticked: false,
    })
  }

  handleChange = (event) => {
    this.setState({
      itemName: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Col xs={6} md={3} />
        <Col xs={8} md={6}>
          <ListGroup>
            {this.ShoppingList(this.state.items)}
          </ListGroup>
          <form>
            <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel>Working example with validation</ControlLabel>
              <FormControl
                type="text"
                value={this.state.itemName}
                placeholder="Enter item name"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button onClick={this.addItem}>Add Item</Button>
          </form>
        </Col>
        <Col xs={6} md={3} />
      </div>
    )
  }
}

export default App;
