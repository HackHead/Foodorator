<template lang="pug">
.card(v-for="(meal, index) in meals")
	.card__image-wrap 
		.card__interaction-wrap
			.card__save
				button <ion-icon name="bookmark"></ion-icon>
			.card__like
				button <ion-icon name="heart"></ion-icon>
		img(:src="server + meal.img")
	.card__info-wrap
		.card__title {{ meal.name }}
		.card__subtitle by {{ meal.author }}
		.card__info-inner
			.card__prep Prep time
				span.card-text {{ meal.prep_time }}
			.card__cook Cook time
				span.card-text {{ meal.cook_time }}
			.card__over Servings
				span.card-text {{ meal.serving }}
		.card__tabs-inner
			button(@click="setActiveTab(1, meal)", :class="{'card__tab-nav--active': meal.active_tab === 1}").card__tab-nav.card__tab-nav-ingredients Ingredients
			button(@click="setActiveTab(2, meal)", :class="{'card__tab-nav--active': meal.active_tab === 2}").card__tab-nav.card__tab-nav-directions Description
			button(@click="setActiveTab(3, meal)", :class="{'card__tab-nav--active': meal.active_tab === 3}").card__tab-nav.card__tab-nav-nutrition Nutrition
			.card__tab-ingredients(v-if="meal.active_tab === 1") 
				p 
					span(v-for="ingredient in meal.ingredient") {{ ingredient.name }}, 
			.card__tab-description(v-if="meal.active_tab === 2") 
				p {{ meal.description }}
			.card__tab-nutrition(v-if="meal.active_tab === 3")  
				p proteins - <span>{{ meal.protein }}</span>, fats - <span>{{ meal.fat }}</span>, hydrocabonates - <span>{{ meal.carbohydrate }}</span>, calories - <span>{{ meal.calorie }}</span>
	
</template>

<script>
export default {
	name: 'Card',
	props: ['meals', 'server'],
	methods: {
		setActiveTab(tab, meal){
		  meal.active_tab = tab
	  	},
	}
}

</script>