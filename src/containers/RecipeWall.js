import React from 'react'
import PropTypes from 'prop-types'
import '../App.css'
import RecipePosts from './RecipePosts'
import RecipeEditor from './RecipeEditor'
import * as firebase from 'firebase'
import {
  Button, Col, Container, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Modal, ModalHeader, ModalBody
} from 'reactstrap'

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
        <ModalHeader closeButton>
          Editing Recipe
        </ModalHeader>
        <ModalBody>
          <div>
            <RecipeEditor close={this.close} recipe={this.props.recipe} />
          </div>
        </ModalBody>
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
      <Col className='spacing' lg='4' sm='6' xs='12'>
        <Card>
          <CardBody>
            <CardTitle>{this.props.recipe.recipe_name}</CardTitle>
            <CardSubtitle>Ingredients</CardSubtitle>
            <CardText>{ingredients}</CardText>
            <CardSubtitle>Steps</CardSubtitle>
            <CardText>{steps}</CardText>
            <div>
              <img src={this.props.recipe.user.photoUrl}
                className='user-img'
                alt='user' /> <a>{this.props.recipe.user.name}</a>
            </div>
            <Button onClick={this.edit} className='top-right'>
              edit
            </Button>
          </CardBody>
          </Card>
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
        <ModalHeader closeButton>
          Create a Recipe
        </ModalHeader>
        <ModalBody>
          <div>
            <RecipePosts close={this.close} />
          </div>
        </ModalBody>
      </Modal>
    )
    return (
      <div>
        <Button onClick={this.open} block className='margin-bottom'>
          <b>Create a Recipe</b>
        </Button>
        <Container>
          <Row>
              {
                this.state.recipes && this.state.recipes.length > 0 && this.state.recipes.map((value, index) => (
                  <RecipePost key={value.key} index={index}
                    recipe={value} />
                ))
              }
          </Row>
        </Container>
        {recipePostModal}
      </div>
    )
  }
}

export default RecipeWall
