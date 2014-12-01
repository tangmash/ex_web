'use strict'

angular
  .module('wayBillCtrl', [])
  .controller('wayBillCtrl', ['$scope', '$filter', '$http','$location', function ($scope, $filter, $http,$location) {
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
	$scope.addWaybill= function(){
		 $http.get('http://120.24.211.113:8055/waybill/storage',{params:{'id':$scope.mySelections[0].id}}).success(function (oneData) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        });
	}
  	$scope.deleteWaybill=function(){
        $http.get('http://120.24.211.113:8055/waybill/deleteWaybill',{params:{'id':$scope.mySelections[0].id}}).success(function (oneData) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        });
      }
	$scope.modifyWaybill= function(){
		console.log($scope.mySelections);
		$location.path("/wayBill/modifyWayBill/"+$scope.mySelections[0].id);
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
				$http.get('http://120.24.211.113:8055/waybill/searchAllWaybill').success(function (largeLoad) {        
					data = largeLoad.filter(function(item) {
						return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
					});
					$scope.setPagingData(data,page,pageSize);
				});
			} else {
				$http.get('http://120.24.211.113:8055/waybill/searchAllWaybill').success(function (largeLoad) {
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


