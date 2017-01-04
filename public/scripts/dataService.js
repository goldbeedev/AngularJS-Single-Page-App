(function(){
'use strict';

angular.module('app')
.service('dataService', function($http){
	//get all recipes
	this.getRecipes = function(callback) {
		$http.get('http://localhost:5000/api/recipes')
		.then(callback)
	}
	//get recipes from a category
	this.getRecipesCategory = function(category, callback) {
		$http.get('http://localhost:5000/api/recipes?category=' + category)
		.then(callback)

	}
	//get a recipe by ID
	this.getRecipesId = function(id, callback) {
		$http.get('http://localhost:5000/api/recipes/' + id)
		.then(callback)

	}
	//updates a recipe by ID
	this.putID = function(id, data, callback, error) {
		$http.put('http://localhost:5000/api/recipes/' + id, data)
		.then(callback, error)

	}
	//adds a recipe
	this.addRecipe = function(recipe, callback, error) {
		$http.post('http://localhost:5000/api/recipes', recipe)
		.then(callback, error);
	}
	//deletes a recipe by ID
	this.deleteRecipe = function(id, callback) {
		$http.delete('http://localhost:5000/api/recipes/' + id)
		.then(callback);

	}
	//gets alll the recipe categories
	this.getCategories = function(callback) {
		$http.get('http://localhost:5000/api/categories')
		.then(callback);
	}
	//gets all of the food items
	this.getFoodItems = function(callback) {
		$http.get('http://localhost:5000/api/fooditems')
		.then(callback);

	}



}); //end service
})(); //end self invoked function