//==================================================================================================================================
// Controller js
// This file is used for handling all http requests to the server

import {Meal} from '../models/Meals.js' // Single meal schema(model)
import { Ingredient } from '../models/Ingredients.js' // Single ingredient schema(model)
import validator from 'validator' // Library which is used for validating user's input data


// White list - when user type the name of ingredient, only these letters are available
const WHITE_LIST = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz '

/**
 * New meal controller. 
 */
export const newMeal = async (req, res) => {
	const mealObject = new Meal({
		name: req.body.name,
		img: req.body.img,
		author: req.body.author,
		prep_time: req.body.prep_time,
		cook_time: req.body.cook_time,
		serving: req.body.serving,
		description: req.body.description,
		direction: req.body.direction,
		ingredient: req.body.ingredient,
		protein: req.body.protein,
		fat: req.body.fat,
		carbohydrate: req.body.carbohydrate,
		calorie: req.body.calorie
	})
	let nesw = await mealObject.save()
	res.send(nesw)
}

/**
 * 
 * Get list of meal which includes all of the ingredients
 * 
 */
export const getMeals = async (req, res) => {
	const ingredients = req.body
	Meal.find({ "ingredient.name": { "$all" : ingredients} }).exec((err, mls) =>{
		res.send(mls)
	})
	
}

export const createIngredient = async (req, res) => {
	let ingredientObject = new Ingredient({
		name: req.body.name
	})
	let saved = await ingredientObject.save()
	res.json(saved)
}

export const getIngredient = async (req, res) => {
	let prms = validator.whitelist(req.params.name.trim(), WHITE_LIST)
	const query = {name: { $regex: '.*' + prms + '.*' } }
	await Ingredient.find(query)
		.then(ing => {
			res.send(ing)
		})
}

// ======================================================================================
// DEVELOPMENT NOTES
// ======================================================================================
// 1) Add validators to controllers above