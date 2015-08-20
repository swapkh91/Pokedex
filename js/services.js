
var myApp = angular.module('Pokedex', ['ngAnimate', 'ui.bootstrap']);

myApp.controller('pokeCntrl', function($scope, $http)
{

	$scope.isCollapsed1 = true;
	$scope.isCollapsed2 = true;

	$scope.checkCollapse1 = function()
	{
		if ($scope.isCollapsed1 == false && $scope.isCollapsed2 == false) {
			$scope.isCollapsed1 = true;
		}

		else if ($scope.isCollapsed1 == true && $scope.isCollapsed2 == false) {
			$scope.isCollapsed1 = false;
			$scope.isCollapsed2 = true;
		}

		else if ($scope.isCollapsed1 == false) {
			$scope.isCollapsed1 = true;
		}

		else if ($scope.isCollapsed1 == true) {
			$scope.isCollapsed1 = false;
		}

		
	};

	$scope.checkCollapse2 = function()
	{
		if ($scope.isCollapsed2 == false && $scope.isCollapsed1 == false) {
			$scope.isCollapsed2 = true;
		}
		else if ($scope.isCollapsed2 == true && $scope.isCollapsed1 == false) {
			$scope.isCollapsed1 = true;
			$scope.isCollapsed2 = false;
		}

		else if ($scope.isCollapsed2 == false) {
			$scope.isCollapsed2 = true;
		}

		else if ($scope.isCollapsed2 == true) {
			$scope.isCollapsed2 = false;
		}

		
	};

	$scope.searchPokeName = function()
	{
		
		var name = $scope.pokeName;
		//alert(name);
        var url = 'https://phalt-pokeapi.p.mashape.com/pokemon/'+name+'/';
        $http.get(url, {
    		headers: {'X-Mashape-Key': 'mAea9VTQu1mshnUsC4qfO6iZ0cphp1FUssejsnACFTShRvDkHc', 'Accept': 'application/json'}}).success(function(response)
        	{
        		$scope.pokemon = response
        		
        		$scope.pokeImg = $scope.getPokeImg($scope.pokemon)
        		$http.get("http://pokeapi.co/"+response.descriptions[0].resource_uri).success(function(response1)
        		{
        			$scope.pokemonDesc = response1
        			
        		});
        	}).error(function(response){
        		alert("Invalid Input");
        	});
	};

	$scope.searchPokeID = function()
	{
		var id = $scope.pokeID

		var url = 'https://phalt-pokeapi.p.mashape.com/pokemon/'+id+'/'
		$http.get(url, {
    		headers: {'X-Mashape-Key': 'mAea9VTQu1mshnUsC4qfO6iZ0cphp1FUssejsnACFTShRvDkHc', 'Accept': 'application/json'}}).success(function(response)
        	{
        		$scope.pokemon = response
        		$scope.pokeImg = $scope.getPokeImg1(id)
        		$http.get("http://pokeapi.co/"+response.descriptions[0].resource_uri).success(function(response1)
        		{
        			$scope.pokemonDesc = response1
        			//alert(response1);
        		});
        	}).error(function(response){
        		alert("Invalid Input");
        	});
	};

	$scope.getPokeImg = function(thisPoke)
	{
        return "http://pokeapi.co/media/img/"+thisPoke.national_id+".png"
    };

     $scope.getPokeImg1 = function(thisPoke)
	{
        return "http://pokeapi.co/media/img/"+thisPoke+".png"
    };
});