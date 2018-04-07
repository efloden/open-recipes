import React from 'react'
import PropTypes from 'prop-types'
import '../App.css'
import RecipePosts from './RecipePosts'
import RecipeEditor from './RecipeEditor'
import * as firebase from 'firebase'
import { Button, Col, Row, Modal } from 'reactstrap'
import { Grid, Well, Glyphicon } from 'bootstrap'

class RecipeGrid extends React.Component {
  static propTypes = {
    recipes: PropTypes.array
  }
  render () {
    const recipeGrid = this.props.recipes &&
    this.props.recipes.map((value, index) => (
      <RecipePost key={value.key} index={index}
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

class RecipePost extends React.Component {
  static propTypes = {
    recipe: PropTypes.object.isRequired
  }
  constructor () {
    super()
    this.state = {
      showEditModal: false
    }
  }
  close = () => {
    this.setState({ showEditModal: false })
  }
  edit = () => {
    this.setState({ showEditModal: true })
  }
  render () {
    const recipeEditModal = (
      <Modal show={this.state.showEditModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Editing Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <RecipeEditor close={this.close} recipe={this.props.recipe} />
          </div>
        </Modal.Body>
      </Modal>
    )
    const Ingredient = (ingredient, index) => {
      return (
        <div key={index}>
          {ingredient.name} {ingredient.amount} {ingredient.unit}
        </div>
      )
    }
    const ingredients = this.props.recipe.ingredients.map((value, index) => {
      return Ingredient(value, index)
    })
    const Step = (step, index) => {
      return (
        <div key={index}>
          {index + 1} {step.step}
        </div>
      )
    }
    const steps = this.props.recipe.steps.map((value, index) => {
      return Step(value, index)
    })
    return (
      <Col sm={6} md={3}>
        <Well>
          <h4>{this.props.recipe.recipe_name}</h4>
          <h4>Ingredients</h4>
          {ingredients}
          <h4>Steps</h4>
          {steps}
          <div>
            <img src={this.props.recipe.user.photoUrl}
              className='user-img'
              alt='user' /> <a>{this.props.recipe.user.name}</a>
          </div>
          <Button onClick={this.edit} className='top-right'
            bsSize="xsmall" bsStyle="success">
            <Glyphicon glyph="edit" />
          </Button>
        </Well>
        {recipeEditModal}
      </Col>
    )
  }
}

class RecipeWall extends React.Component {
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
    recipesRef.on('value', snap => {
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
            <RecipePosts close={this.close} />
          </div>
        </Modal.Body>
      </Modal>
    )
    return (
      <div>
        <Col xs={0} md={2} />
        <Col xs={12} md={6}>
          <Button onClick={this.open} block className='margin-bottom'
            bsSize="small">
            🍗 🍖 🍕 🍡 🍤 🍱 <b>Create a Recipe!</b> 🍣 🍥 🍙 🍘 🍢 🍜
          </Button>
          <RecipeGrid recipes={this.state.recipes} />
          {recipePostModal}
        </Col>
        <Col xs={0} md={2} />
      </div>
    )
  }
}

export default RecipeWall
