import mongoose from 'mongoose'

const {Schema, model} = mongoose

const mealSchema = new Schema({
	name: {
		type: String,
		min: 2,
		max: 64
	},
	img: {
		type: String
	},
	author: {
		type: String,
		min: 2,
		max: 64
	},
	prep_time: {
		type: String
	},
	cook_time: {
		type: String
	},
	serving: {
		type: Number
	},
	description: {
		type: String,
		min: 10,
		max: 512
	},
	direction: {
		type: String,
		min: 10,
		max: 4096
	},
	ingredient: [{ name: String, quantity: String }],
	protein: {type: Number},
	fat: {type: Number},
	carbohydrate: {type: Number},
	calorie: {type: Number}
})

export const Meal = model('Meal', mealSchema)