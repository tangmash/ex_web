'use strict'

angular
  .module('ordersCtrl', [])
  .controller('ordersCtrl', ['$scope', '$filter', '$http','$location', function ($scope, $filter, $http,$location) {
	$scope.mySelections=[];
	$scope.filterOptions = {
		filterText: "",
		useExternalFilter: true
	};
	$scope.totalServerItems = 0;
	$scope.pagingOptions = {
		pageSizes: [10 ,25, 50, 100],
		pageSize: 25,
		currentPage: 1
	};
	$scope.addToStorage= function(){
		console.log(mySelections);
	}
	$scope.deleteStorage= function(){
		console.log(mySelections);
	}
	$scope.modifyStorage= function(){
		console.log($scope.mySelections);
		$location.path("/order/modifyOrder/"+$scope.mySelections[0].id);
	}
	$scope.setPagingData = function(data, page, pageSize){
		var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
		$scope.myData = pagedData;
		$scope.totalServerItems = data.length;
		if (!$scope.$$phase) {
			$scope.$apply();
		}
	};
	$scope.getPagedDataAsync = function (pageSize, page, searchText) {
			var data;
			if (searchText) {
				var ft = searchText.toLowerCase();
				$http.get('http://192.168.1.107:8055/order/searchAllOrder').success(function (largeLoad) {        
					data = largeLoad.filter(function(item) {
						return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
					});
					$scope.setPagingData(data,page,pageSize);
				});
			} else {
				$http.get('http://192.168.1.107:8055/order/searchAllOrder').success(function (largeLoad) {
					$scope.setPagingData(largeLoad,page,pageSize);
				});
			}
	};

	$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

	$scope.$watch('pagingOptions', function (newVal, oldVal) {
		if (newVal !== oldVal ) {
		  $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
		}
	}, true);
	$scope.$watch('filterOptions', function (newVal, oldVal) {
		if (newVal !== oldVal) {
		  $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
		}
	}, true);

	$scope.gridOptions = {
		data: 'myData',
		enablePaging: true,
		showFooter: true,
		totalServerItems: 'totalServerItems',
		pagingOptions: $scope.pagingOptions,
		filterOptions: $scope.filterOptions,
		selectedItems: $scope.mySelections,
		multiSelect: false
	};
  }])


