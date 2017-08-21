import React, { Component } from 'react'
import '../App.css'
import * as firebase from 'firebase'
import { FormGroup, ControlLabel, Button, Form, Col
} from 'react-bootstrap'

class RecipePosts extends Component {
  constructor () {
    super()
    this.state = {
      recipe_name: 'baked apple',
      ingredients: [
        {
          'name': 'apple',
          'amount': '1',
          'unit': 'each'
        }
      ],
      steps: [
        {
          step: 'Bake an apple'
        },
        {
          step: 'Give it to a friend'
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
      ingredients: this.state.ingredients,
      steps: this.state.steps
    }
    var updates = {}
    updates['/recipes/' + newRecipeKey] = recipeData
    return firebase.database().ref().update(updates)
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
            <h1>Post a Recipe</h1>
            <FormGroup controlId='Ingredients'>
              <ControlLabel>Ingredients</ControlLabel>
              {this.state.ingredients.map((ingredient, idx) => (
                <div key={idx + ingredient}>
                  <input
                    type="text"
                    placeholder={`Ingredient #${idx + 1}`}
                    value={ingredient.name}
                    onChange={this.handleIngredientChange(idx)}
                  />
                  <button type="button"
                    onClick={this.handleRemoveIngredient(idx)}
                    className="small">-</button>
                </div>
              ))}
              <Button onClick={this.handleAddIngredient}
                className="small">Add Ingredient</Button>
            </FormGroup>
            <FormGroup controlId='Steps'>
              <ControlLabel>Steps</ControlLabel>
              {this.state.steps.map((step, idx) => (
                <div key={idx}>
                  <input
                    type="text"
                    placeholder={`Step #${idx + 1}`}
                    value={step.step}
                    onChange={this.handleStepChange(idx)}
                  />
                  <button type="button"
                    onClick={this.handleRemoveStep(idx)}
                    className="small">-</button>
                </div>
              ))}
              <Button onClick={this.handleAddStep}
                className="small">Add Step</Button>
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
        <Col xs={0} md={3} />
      </div>
    )
  }
}

export default RecipePosts
