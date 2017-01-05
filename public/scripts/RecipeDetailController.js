(function(){
'use strict'

//initialize the angular module
angular.module('app')
.controller('RecipeDetailController',['$scope', 'dataService', '$location', '$routeParams', '$log', function($scope, dataService, $location, $routeParams, $log){



//set the location on the scope.
$scope.location = $location;

//get all categories for the select category dropdown
dataService.getCategories(function(response){
	$scope.categories = response.data;
	console.log(response.data);
});

//set the current path on the scope.
	$scope.path = $location.path().split('/')[2];
    console.log($scope.path);



//get recipes
	dataService.getRecipes(function(response){
	$scope.recipes = response.data;


});

 
//see if there is a recipe in the path, if so request the ID and set the recipe on the scope to equal the response data
if ($scope.path) {

	console.log("yes there is a path");

	dataService.getRecipesId($scope.path, function(response){
	console.log("this is the get recipe id data:" + response.data);
	$scope.recipe = response.data;

}); //end dataService.getRecipesID

} else {
// otherwise create an empty recipe object on the scope to edit
	$scope.recipe = {
		name: "",
		description: "",
		category: "",
		prepTime: 0,
		cookTime: 0,
		ingredients: [],
		steps: []
	} //end $scope.recipe

	console.log("no path exists!");

} //end else
	

//function to update recipe upon saving
$scope.updateRecipe = function() {

//if we are editing, use put to update the data.
if($scope.path){

	dataService.putID($scope.recipe._id, $scope.recipe, function(response){

		$scope.recipe = response.data;
		$location.url('/');

	}, function(error){
		if (error) {$scope.showError = true}
		$log.error(error.data.errors);
		//add name errors to the scope to show specific errors related to the name field
		$scope.nameErrors = error.data.errors.name;
		//add ingredient errors to the scope to show specific errors related to adding ingredients.
		$scope.ingredientErrors = error.data.errors.ingredients;
		//add category errors to the scope to show specific errors related to category selection.
		$scope.categoryErrors = error.data.errors.categories;
		//add steps errors to the scope to show specific errors related to adding new steps.
		$scope.stepErrors = error.data.errors.steps;


	}); //end dataService.putID


} else {
   
   //otherwise add new recipe
   dataService.addRecipe($scope.recipe, function(response){
        
        //go back to the home page after adding the recipe 
        $location.url('/');

}, function(error){
		if (error) {$scope.showError = true}
		$log.error(error.data.errors);
		//add name errors to the scope to show specific errors related to the name field
		$scope.nameErrors = error.data.errors.name;
		//add ingredient errors to the scope to show specific errors related to adding ingredients.
		$scope.ingredientErrors = error.data.errors.ingredients;
		//add category errors to the scope to show specific errors related to category selection.
		$scope.categoryErrors = error.data.errors.categories;
		//add steps errors to the scope to show specific errors related to adding new steps.
		$scope.stepErrors = error.data.errors.steps;

   }); //end dataService.addRecipe

} //end else

	}; //end scope.updateRecipe



//add a cancel function to the scope to cancel adding/editing a recipe
$scope.cancel = function() {
 $location.url('/');
}

//set foodItems on the scope
dataService.getFoodItems(function(response){
	console.log(response.data);
	$scope.foodItems = response.data;

});


//function to delete recipe steps
$scope.deleteRecipeStep = function($index) {
	console.log("this many steps: " + $scope.recipe.steps);
	$scope.recipe.steps.splice($index, 1);
	
}

//function to add recipe steps 
$scope.addRecipeStep = function() {


//push new object into the recipe steps array, set key value pairs to a description with an empty string.
	$scope.recipe.steps.push(

		//push object with empty string as description in key value pair
	{
		"description": ""
	}

	); //end recipe.steps.push

	console.log($scope.recipe.steps);

} //end addRecipeStep

//function to delete an ingredient
$scope.deleteRecipeIngredient = function($index) {
	$scope.recipe.ingredients.splice($index, 1);

}

//function to add a new ingredient
$scope.addIngredient = function() {

	//push an ingredients object into the scope ingredients.
	$scope.recipe.ingredients.push(

 	{
 		"foodItem": "",
 		"condition": "",
 		"amount": ""
 	}


		);

} //end addIngredient


}]); //end controller
})(); //end self invoked function