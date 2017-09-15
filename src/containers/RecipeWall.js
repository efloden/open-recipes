import React, { Component } from 'react'
import '../App.css'
import RecipePosts from './RecipePosts'
// import * as firebase from 'firebase'
import { Button, Col, Modal } from 'react-bootstrap'

class RecipeWall extends Component {
  constructor () {
    super()
    this.state = {
      recipePosts: [],
      showModal: false
    }
  }
  close = () => {
    this.setState({ showModal: false })
  }

  open = () => {
    this.setState({ showModal: true })
  }
  render () {
    const recipePostModal = (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <RecipePosts />
          </div>
        </Modal.Body>
      </Modal>
    )
    return (
      <div>
        <Col xs={0} md={3} />
        <Col xs={12} md={6}>
          {recipePostModal}
          <Button onClick={this.open}
            bsSize="small" bsStyle="success">Create Recipe
          </Button>
        </Col>
        <Col xs={0} md={3} />
      </div>
    )
  }
}

export default RecipeWall
