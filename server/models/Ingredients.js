import mongoose from 'mongoose'

const {Schema, model} = mongoose

const ingredientSchema = new Schema({
	name: {
		type: String,
		min: 2,
		max: 32
	}
})

export const Ingredient = model('Ingredient', ingredientSchema)