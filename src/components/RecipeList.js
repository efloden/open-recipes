import React, { Component } from 'react'
import '../App.css'
import * as firebase from 'firebase'
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Col,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap'
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc'

const DragHandle = SortableHandle(() => <span className='drag-handle'>::</span>)

class Item extends Component {
  removeItem = () => {
    const shopListRef = firebase.database().ref().child('shopList')
    shopListRef.child(this.props.item.key).remove()
  }
  render () {
    return (
      <ListGroupItem>
        <div className="RecipeList--left">
          <DragHandle /> {this.props.item.name}
        </div>
        <span className='RecipeList--center'></span>
        <div className="RecipeList--right">
          <Button bsSize='xsmall' bsStyle='danger'
            onClick={this.removeItem}>
            x
          </Button>
        </div>
      </ListGroupItem>
    )
  }
}

const SortableItem = SortableElement(Item)

class Items extends Component {
  render() {
    return (
      <div>
        <ListGroup>
          {this.props.items.map((value, index) => (
            <SortableItem key={`item-${index}`} index={index}
              value={value.name} item={value} />
          ))}
        </ListGroup>
      </div>
    )
  }
}

const SortableList = SortableContainer(Items)

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
        items: Object.values(snap.val()).map((item) => {
          return item
        })
      })
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code)
    })
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    })
  }
  sortableList = (items) => {
    return items
    ? <SortableList items={items} onSortEnd={this.onSortEnd} useDragHandle />
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

  render() {
    return (
      <div>
        <Col xs={0} md={3} />
          <Col xs={12} md={6}>
            {this.sortableList(this.state.items)}
          </Col>
        <Col xs={0} md={3} />
        <Form inline onSubmit={this.addItem}>
          <FormGroup controlId="formBasicText">
            <ControlLabel>Item</ControlLabel>
            {' '}
            <FormControl
              type="text"
              value={this.state.itemName}
              placeholder="Enter item name"
              onChange={this.handleChange}
            />
          </FormGroup>
          {' '}
          <Button type='submit'>Add Item</Button>
        </Form>
      </div>
    )
  }
}

export default RecipeList
