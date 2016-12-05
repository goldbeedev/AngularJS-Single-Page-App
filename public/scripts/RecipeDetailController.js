(function(){
'use strict'

angular.module('app')
.controller('RecipeDetailController',['$scope', 'dataService', '$location', function($scope, dataService, $location){

//get recipes
dataService.getRecipes(function(response){
$scope.recipes = response.data;


});

//get current recipe's ID
dataService.getRecipesId(function(response){
console.log(response.data);


});

$scope.ControllerTest = function($scope) {
	console.log("This is a test");

}


}]);


































})();