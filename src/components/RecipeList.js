import React, { Component } from 'react';
import '../App.css';
import * as firebase from 'firebase'
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Col,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';

class RecipeList extends Component {
  constructor() {
    super()
    this.state = {
      items: undefined,
      itemName: '',
    }
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
      <div>
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

export default RecipeList
