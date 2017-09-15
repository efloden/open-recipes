import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../App.css'
import RecipePosts from './RecipePosts'
import * as firebase from 'firebase'
import { Button, Col, Grid, Row, Modal, Well } from 'react-bootstrap'

class RecipeGrid extends Component {
  static propTypes = {
    recipes: PropTypes.object.isRequired
  }
  render () {
    const recipeGrid = this.props.recipes &&
    this.props.recipes.map((value, index) => (
      <RecipePost key={`recipe-${index}`} index={index}
        recipe={value} />
    ))
    return (
      <Grid>
        <Row>
          {this.props.recipes && recipeGrid}
        </Row>
      </Grid>
    )
  }
}

class RecipePost extends Component {
  static propTypes = {
    recipe: PropTypes.object.isRequired
  }
  render () {
    const Ingredient = (ingredient) => {
      return (
        <div>
          {ingredient.name}
          {ingredient.amount}
          {ingredient.unit}
        </div>
      )
    }
    const ingredients = this.props.recipe.ingredients.map((value) => {
      return Ingredient(value)
    })
    const Step = (step) => {
      return (
        <div>
          {step.step}
        </div>
      )
    }
    const steps = this.props.recipe.steps.map((value) => {
      return Step(value)
    })
    return (
      <Col sm={6} md={3}>
        <Well>
          <h4>{this.props.recipe.recipe_name}</h4>
          <h4>Ingredients</h4>
          {ingredients}
          <h4>Steps</h4>
          {steps}
        </Well>
      </Col>
    )
  }
}

class RecipeWall extends Component {
  constructor () {
    super()
    this.state = {
      recipes: undefined,
      showModal: false
    }
  }
  componentDidMount () {
    const rootRef = firebase.database().ref()
    const recipesRef = rootRef.child('recipes')
    recipesRef.once('value', snap => {
      this.setState({
        recipes: Object.values(snap.val()).map((recipe) => {
          return recipe
        })
      })
    }, function (errorObject) {
      console.error('The read failed: ' + errorObject.code)
    })
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
        <Col xs={0} md={2} />
        <Button onClick={this.open}
          bsSize="small" bsStyle="success">Create Recipe
        </Button>
        <Col xs={12} md={6}>
          <RecipeGrid recipes={this.state.recipes} />
          {recipePostModal}
        </Col>
        <Col xs={0} md={2} />
      </div>
    )
  }
}

export default RecipeWall
