(function(){
'use strict'

angular.module('app')
.controller('RecipeDetailController',['$scope', 'dataService', '$location', function($scope, dataService, $location){

$scope.location = $location;

//get all categories for the select category dropdown
dataService.getCategories(function(response){
	$scope.categories = response.data;
	console.log(response.data);
});


	$scope.path = $location.path().split('/')[2];
    console.log($scope.path);



//get recipes
	dataService.getRecipes(function(response){
	$scope.recipes = response.data;


});

//get current recipe's ID  - would I use a location method for the id parameter? How to inject the id from the url?

//add something that sets recipe.name to add recipe if adding, if editing make it the recipe name being edited
//look into adding edit true and manipulating data, potentailly look at the location url 

$scope.getId = function() {


	dataService.getRecipesId($scope.path, function(response){
	console.log("this is the get recipe id data:" + response.data);
	$scope.recipe = response.data;

//show recipe name when editing if it exists, if not show add new recipe text
if ($scope.recipe.length >= 0) {
	$scope.NameShow = false;
} else {
	$scope.NameShow = true;
} //end if scope.recipe.length

}); //end dataService.getRecipesId

} // end $scope.getId 

$scope.getId();

//add recipe

$scope.addRecipe = function() {

	dataService.AddRecipe = function(recipe, callback) {

	}	//ng-model? from the name input field?



}

//function to update recipe upon saving
$scope.updateRecipe = function() {

	dataService.putID($scope.recipe._id, $scope.recipe, function(response){

		$scope.recipe = response.data;
		$location.url('/');

	});


	};



//add a cancel function to the scope to cancel adding/editing a recipe
$scope.cancel = function() {
 $location.url('/');
}

//add items to the scope from the recipe data to populate  - I dont think this is necessary, probably remove.
$scope.getCurrentItem = function(selectedItem) {

	console.log($scope.recipe.ingredients[1].foodItem);

	$scope.SelectedIndex = $scope.recipe.ingredients.selectedIndex;

	console.log($scope.recipe.ingredients.indexOf(selectedItem));


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

	);

	console.log($scope.recipe.steps);

}

//function to add a new ingredient
$scope.addIngredient = function() {

 if ($scope.recipe.ingredients) { //come back to this tomorrow, this may not be the best way.
//push new ingredient object into ingredients on the recipe scope.
	$scope.recipe.ingredients.push(

 	{
 		"foodItem": "",
 		"condition": "",
 		"amount": ""
 	}


		);
} else {
	$scope.recipe
}

}


}]); //end controller


































})();