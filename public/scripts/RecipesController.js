(function(){
'use strict'
//start the angular module and create a controller
angular.module('app')
.controller('RecipesController', function($scope, dataService, $location){

$scope.$location = $location;

//get recipe data for page load
dataService.getRecipes(function(response){
	console.log(response.data);
	$scope.recipes = response.data;
	console.log($scope.recipes.length);

	});//end getRecipes

// get all the categories for listing purposes
dataService.getCategories(function(response){
	console.log("This is the categories array: " + response.data);
	$scope.categories = response.data;

	}); //end getCategories

//create the currentCategory property on the scope
$scope.currentCategory = null;

//instantiate the showNoRecipes property 
$scope.showNoRecipes = null;

//create getRecipeCategory on the scope as a function
$scope.getRecipeCategory = function() {

//if the category is all categories set $scope.recipes to equal that data.
		if ($scope.currentCategory === "All Categories") {

	dataService.getRecipes(function(response){ 
		$scope.recipes = response.data;



	}); //end dataService.getRecipes
		

	} else {




//bind $scope.currentCategory as a parameter, select ng-model will use this to update this parameter via data binding.
dataService.getRecipesCategory($scope.currentCategory, function(response){

	console.log(response.data);
 	$scope.recipes = response.data;
 	console.log("This is the category: " + $scope.currentCategory);

//create function that checks if $scope.recipes has recipes, if it does hide the div
//may have to place this inside the function above to access the scope.recipes information.
	if ($scope.recipes.length <= 0) {
		//console.log for testing purposes
		console.log("Recipes has No Length")
		$scope.showNoRecipes = true;
	} else {
		//console.log for testing purposes
		console.log("Recipes length is: " + $scope.recipes.length)
		$scope.showNoRecipes = false;
	} //end else

});

} //end else

	}; //end getRecipeCategory function


//function to delete recipes

$scope.deleteRecipe = function($index) {
	dataService.deleteRecipe($scope.recipes[$index]._id, function(){
		//call the getRecipes dataService and refresh the recipes on the scope.
		dataService.getRecipes(function(response){
			$scope.recipes = response.data;


		}); //end dataService.getRecipes


	}); //end dataService.deleteRecipe
} //end scope.deleteRecipe

//create a recipe object to add with the addrecipe dataService










}); //end recipes controller
})(); //end self invoked function
