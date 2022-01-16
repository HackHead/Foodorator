import { newMeal, getMeals, createIngredient, getIngredient } from "../controllers/controllers.js";
import { Router } from 'express'

let router =  Router()
// Create new meal
router.post('/api/meal', newMeal)
// Get meal by ingredient
router.post('/api/meals', getMeals)
// Create new ingredient
router.post('/api/ingredient/', createIngredient)
// Get list of ingredients by name
router.get('/api/ingredient/:name', getIngredient)
export default router