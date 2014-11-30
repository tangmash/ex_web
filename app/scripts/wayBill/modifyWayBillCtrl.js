'use strict'

angular
  .module('modifyWayBillCtrl', [])
  .controller('modifyWayBillCtrl', ['$scope', '$filter', '$http', '$timeout','$location','$routeParams', function ($scope, $filter, $http, $timeout,$location,$routeParams) {
    var waybillId = $routeParams.wayBillId;
    $http.get('http://192.168.1.107:8055/waybill/searchWaybill',{params:{'id':waybillId}}).success(function (oneData) {
        console.log(JSON.stringify(oneData.trackingBill));
        $scope.oneOrder=oneData;
      });

      $scope.sendToModify=function(){
        console.log(JSON.stringify($scope.oneOrder));
        $http.post('http://192.168.1.107:8055/waybill/update',$scope.oneOrder).success(function (oneData) {
          $location.path("/wayBill/allWayBills");
        });
      }

    $scope.$watch('user.group', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        var selected = $filter('filter')($scope.groups, {id: $scope.user.group});
        $scope.user.groupName = selected.length ? selected[0].text : null;
      }
    });
  }])
