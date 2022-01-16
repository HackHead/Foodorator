<template lang='pug'>
.home
	.home__head
		.home__input-wrapper
			.home__title
				span.home__title-text Foodorat<span style="font-size: 0.6em">🥨</span>r
			.home__subtitle
				p.home__subtitle-text Originally, people got food as hunter-gatherers. The agricultural revolution changed that. Farmers grew crops including those invented and improved by selective breeding. These improvements, for example the invention of maize, allowed feeding more people, and further improvements gave it a better taste. 
			form(@sumbit.prevent="add_ingredient('')").home__input-inner
				input(placeholder="chicken", @input="get_ingredients()").home__big-input
				button(type="submit", @click.prevent="add_ingredient('')").home__bit-input-button <ion-icon name="arrow-forward"></ion-icon>
				.home__suggestions(v-if="suggestions_list.length")
					ul.home__suggestions-list
						li(v-for="(item, index) in suggestions_list", @click="add_ingredient(item.name)").home__suggestions-item {{ item.name }} 
			ul.home__ingredients-list 
				li(v-for="(item, index) in ingredients_list").home__ingredients-item(@click="remove_ingredient(index)")
					span.home__ingredients-item-text {{item}}
					span.home__ingredients-item-icon <ion-icon name="close-sharp"></ion-icon>
		
	.home__content
		.card-grid(v-if="meals_list.length")


			Card(:meals="meals_list", :server="server")  
				//- Card ingredient

		.home__notfound(v-if="!meals_list.length && ingredients_list.length")
			.home__notfound-icon
				<ion-icon name="search"></ion-icon>
			h2.home__notfound-title No matching recipies
			.home__notfound-text(v-if="ingredients_list.length") 
				p There weren't any saved views, recent <br> queries, or sources matching your search
		.home__notfound(v-if="!meals_list.length && !ingredients_list.length") 
			.home__notfound-icon
				<ion-icon name="search"></ion-icon>
			h2.home__notfound-title No matching recipies
			.home__notfound-text
				p You need to provide at least <br> 1 ingredient, so foodrator could work
			
</template>

<script>
// @ is an alias to /src

import whitelist from 'validator/es/lib/whitelist';
import Card from '../components/Card'
export default {
  name: 'Home',
  components: {
    Card
  },
  data(){
	  return {
		  ingredients_list: [],
		  suggestions_list: [],
		  meals_list: [],
		  server: 'http://localhost:3000'
	  }
  },
  mounted(){
	  this.set_title()
  },
  methods: {
	  set_title(){
		  document.title = 'Foodorator | Generate your perfect meal'
	  },
	  setActiveTab(tab, meal){
		  meal.active_tab = tab
	  },
	  clean_suggestions(){
		  this.suggestions_list = []
	  },
	  clean_bigInput(){
		  const input = document.querySelector('.home__big-input')
		  input.value = ''
		  input.placeholder = ''
		  input.focus()
	  },
	  add_ingredient: async function(value){
		   const input = document.querySelector('.home__big-input')
		  	if(!value) value = input.value.trim();
			if(this.validateInputLength(input)){
				await this.ingredients_list.push(value)
				this.clean_suggestions()
				this.clean_bigInput()
				this.animate_ingredient_entrance()
				this.get_meals();
			}
			
	  },
	  validate_input(){
			const WHITE_LIST = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz '
			const input = document.querySelector('.home__big-input')

			input.value = whitelist(input.value, WHITE_LIST)
	  },
	  validateInputLength: function(input){
		  let result = input.value.trim().length >= 3 && input.value.trim().length < 32 ? true : false;

		  return result
	  },
	  remove_ingredient: async function(number){
		  number = parseInt(number)
		  await this.ingredients_list.splice(number, 1)
		  this.get_meals()
	  },
	  generateMealsPostBody(){
		  let names_list = []
		  this.ingredients_list.forEach(ingredient => {
			  names_list.push(ingredient)
		  })
		  return names_list
	  },
	  animate_ingredient_entrance(){
		  let ingredient_tabs = document.querySelectorAll('.home__ingredients-item')
		  ingredient_tabs.forEach(tab => {
			  tab.style.transform = "scale(1)"
			  
		  })
	  },
	  // API requests
	  get_ingredients: async function(){
		  
		  let input = document.querySelector('.home__big-input'),
		  	  val = input.value;
		  this.validate_input()
		  if(this.validateInputLength(input)){
			  const url = `http://localhost:3000/api/ingredient/${val}`
			  let req = await fetch(url, {
				  method: 'GET'
			  })

			  let res = await req.json()
			  this.suggestions_list = res
			  
		  }
		  else {
			 this.clean_suggestions()
		  }
	  },
	  get_meals: async function(){
		  const url = 'http://localhost:3000/api/meals'
		  let req = await fetch(url, {
			  method: 'POST',
			  headers: {
				  'Content-type':'application/json'
			  },
			  body: JSON.stringify(this.generateMealsPostBody())
		  })
		  
		  let res = await req.json()
		  this.meals_list = res
		  this.meals_list.forEach(item => {
			  item.active_tab = 1
		  })
	  }
  },
}
</script>
