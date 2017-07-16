import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase'

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
      items: undefined
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
      return <div><p>{item.name}</p><p>{item.cost}</p><p>{item.ticked}</p></div>
    })
    : 'Nothing here but us chickens'
  }

  addItem = () => {
    const rootRef = firebase.database().ref();
    const itemsRef = rootRef.child("shopList");
    itemsRef.push().set({
      name: 'milk',
      cost: 1,
      ticked: false,
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>{this.ShoppingList(this.state.items)}</h1>
        <button onClick={this.addItem}>Add Item</button>
      </div>
    )
  }
}

export default App;
