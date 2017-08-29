import React, { Component } from 'react'
import '../App.css'
import * as firebase from 'firebase'
import { FormGroup, FormControl, InputGroup, ControlLabel, Button, Form, Col,
  ListGroup, ListGroupItem
} from 'react-bootstrap'

class RecipePosts extends Component {
  constructor () {
    super()
    this.state = {
      recipe_name: 'Baked apple',
      yields: [
        {
          servings: 1
        }
      ],
      ingredients: [
        {
          'name': 'Apple',
          'amount': '1',
          'unit': 'each'
        }
      ],
      steps: [
        {
          step: 'Bake an apple'
        },
        {
          step: 'Share it with a friend'
        }
      ]
    }
  }
  postRecipe = (e) => {
    e.preventDefault()
    var newRecipeKey = firebase.database().ref().child('shopList').push().key
    // An item entry.
    const recipeData = {
      key: newRecipeKey,
      recipe_name: this.state.recipe_name,
      yields: this.state.yields,
      ingredients: this.state.ingredients,
      steps: this.state.steps
    }
    var updates = {}
    updates['/recipes/' + newRecipeKey] = recipeData
    return firebase.database().ref().update(updates)
  }
  handleRecipeNameChange = (evt) => {
    this.setState({ recipe_name: evt.target.value })
  }
  handleServingsChange = (idx) => (evt) => {
    const newServing = this.state.yields.map((serving, sidx) => {
      if (idx !== sidx) return serving
      return { ...serving, servings: evt.target.value }
    })
    this.setState({ yields: newServing })
  }
  handleStepChange = (idx) => (evt) => {
    const newStep = this.state.steps.map((step, sidx) => {
      if (idx !== sidx) return step
      return { ...step, step: evt.target.value }
    })
    this.setState({ steps: newStep })
  }
  handleAddStep = () => {
    this.setState({
      steps: this.state.steps.concat([{ step: '' }])
    })
  }
  handleRemoveStep = (idx) => () => {
    this.setState({
      steps: this.state.steps.filter((s, sidx) => idx !== sidx)
    })
  }
  handleIngredientChange = (idx) => (evt) => {
    const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient
      return { ...ingredient, name: evt.target.value }
    })
    this.setState({ ingredients: newIngredients })
  }
  handleAddIngredient = () => {
    this.setState({
      ingredients: this.state.ingredients.concat([{ name: '' }])
    })
  }
  handleRemoveIngredient = (idx) => () => {
    this.setState({
      ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
    })
  }
  render () {
    return (
      <div>
        <Col xs={0} md={3} />
        <Col xs={12} md={6}>
          <Form onSubmit={this.postRecipe}>
            <FormGroup>
              <ControlLabel>Recipe name</ControlLabel>
              <FormControl
                type="text"
                value={this.state.recipe_name}
                placeholder="Enter recipe name"
                onChange={this.handleRecipeNameChange}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Number of servings</ControlLabel>
              <ListGroup>
                {this.state.yields.map((serving, idx) => (
                  <ListGroupItem key={idx + serving}>
                    <FormControl
                      type="number"
                      placeholder={idx + 1}
                      value={serving.servings}
                      onChange={this.handleServingsChange(idx)}
                    />
                  </ListGroupItem>
                ))}
              </ListGroup>
            </FormGroup>
            <FormGroup controlId='Ingredients'>
              <ControlLabel>Ingredients</ControlLabel>
              <ListGroup>
                {this.state.ingredients.map((ingredient, idx) => (
                  <ListGroupItem key={idx + ingredient}>
                    <InputGroup>
                      <InputGroup.Button>
                        <Button>
                          +
                        </Button>
                      </InputGroup.Button>
                      <FormControl
                        type="text"
                        placeholder={`Ingredient #${idx + 1}`}
                        value={ingredient.name}
                        onChange={this.handleIngredientChange(idx)}
                      />
                      <InputGroup.Button>
                        <Button bsStyle='danger'
                          onClick={this.handleRemoveIngredient(idx)}>
                          X
                        </Button>
                      </InputGroup.Button>
                    </InputGroup>
                  </ListGroupItem>
                ))}
              </ListGroup>
              <Button onClick={this.handleAddIngredient}
                bsSize="small" bsStyle="success">Add Ingredient
              </Button>
            </FormGroup>
            <FormGroup controlId='Steps'>
              <ControlLabel>Steps</ControlLabel>
              <ListGroup>
                {this.state.steps.map((step, idx) => (
                  <ListGroupItem key={idx}>
                    <InputGroup>
                      <FormControl
                        type="text"
                        placeholder={`Step #${idx + 1}`}
                        value={step.step}
                        onChange={this.handleStepChange(idx)}
                      />
                      <InputGroup.Button>
                        <Button bsStyle='danger'
                          onClick={this.handleRemoveStep(idx)}>
                          X
                        </Button>
                      </InputGroup.Button>
                    </InputGroup>
                  </ListGroupItem>
                ))}
              </ListGroup>
              <Button onClick={this.handleAddStep}
                bsSize="small" bsStyle="success">Add Step
              </Button>
            </FormGroup>
            <Button type="submit" bsStyle="primary">Submit</Button>
          </Form>
        </Col>
        <Col xs={0} md={3} />
      </div>
    )
  }
}

export default RecipePosts
