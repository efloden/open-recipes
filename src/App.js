import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase'
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Col,
  ListGroup,
  ListGroupItem,
  Alert
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

var provider = new firebase.auth.GoogleAuthProvider()

class App extends Component {
  constructor() {
    super()
    this.state = {
      items: undefined,
      itemName: '',
      user: ''
    }
  }

  googleSignIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log('logged in')
        console.log(user.displayName)
        this.setState({
          user: user.displayName
        })
      } else {
        // No user is signed in.
        firebase.auth().signInWithRedirect(provider);
      }
    })
  }

  componentDidMount() {
    const rootRef = firebase.database().ref()
    const itemsRef = rootRef.child("shopList")
    itemsRef.on("value", snap => {
      this.setState({
        items: snap.val()
      })
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    })
    this.googleSignIn()
  }

  // TODO: Make this a draggable list component and pass in removeItem
  ShoppingList = (items) => {
    return items
    ? Object.values(items).map((item, index) => {
      return (
        <ListGroupItem key={index}>
          <span className={'float-right'}>
            {item.name}
          </span>
          <span className={'float-left'}>
            <Button bsSize="xsmall"
              bsStyle="danger"onClick={() => this.removeItem(item)}>
            X</Button>
          </span>
        </ListGroupItem>
      )
    })
    : 'Nothing here but us chickens'
  }

  addItem = (e) => {
    e.preventDefault()
    // Get a key for a new Post.
    var newItemKey = firebase.database().ref().child('shopList').push().key
    // An item entry.
    const itemData = {
      key: newItemKey,
      name: this.state.itemName,
      cost: 1,
      ticked: false,
    }
    var updates = {}
    updates['/shopList/' + newItemKey] = itemData
    return firebase.database().ref().update(updates)
  }

  removeItem = (item) => {
    const shopListRef = firebase.database().ref().child('shopList')
    shopListRef.child(item.key).remove()
  }

  handleChange = (event) => {
    this.setState({
      itemName: event.target.value
    })
  }

  signOut = () => {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome, {this.state.user}! </h2>
        </div>
        <Button bsSize="xsmall" bsStyle="danger" onClick={this.signOut}>
          Log Out
        </Button>
        <Col xs={0} md={3} />
        <Col xs={12} md={6}>
          <ListGroup>
            {this.ShoppingList(this.state.items)}
          </ListGroup>
          <form onSubmit={this.addItem}>
            <FormGroup controlId="formBasicText">
              <ControlLabel>お買い物書いてください</ControlLabel>
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
        <Col xs={0} md={3} />
      </div>
    )
  }
}

export default App;
