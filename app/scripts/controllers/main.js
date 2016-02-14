'use strict';

angular.module('hackvdayApp')
  .controller('MainCtrl', function ($scope, $location, $anchorScroll, $firebaseArray, $firebaseObject) {
    $scope.phoneValidation = /^\d{10}$/;
    var ref = new Firebase('https://techatnyuval.firebaseio.com/deliveries');
    $scope.deliveries = $firebaseArray(ref);
    $scope.formOffline = false;
    $scope.siteClosed = true;
    var syncObject = $firebaseObject(ref);
    syncObject.$loaded().then(function() {
        var currentRose = Object.keys(syncObject) - 3;
        if (currentRose > 75) {
            $scope.formOffline = true;
        }
    });
    $scope.delivery = {};
    $scope.dorms = [
        'Alumni Hall', 'Brittany Hall', 'Broome Street', 'Carlyle Court',
        'Coral Towers', 'Founders Hall', 'Goddard Hall', 'Gramercy Green',
        'Greenwich Hotel', 'Hayden Hall', 'Lafayette Hall', 'Palladium Hall',
        'Rubin Hall', 'Second Street', 'Seventh Street', 'Third Avenue North',
        '13th Street', '26th Street', 'University Hall', 'Weinstein Hall'
      ];
    $scope.formSuccess = false;
    $scope.previousRecipient = '';
    $scope.addDelivery = function() {
        $scope.deliveries.$add({recipient: $scope.delivery.recipient,
                                message:  $scope.delivery.message,
                                sender:     $scope.delivery.sender,
                                phoneNumber: $scope.delivery.phoneNumber,
                                dorm: $scope.delivery.dorm,
                                roomNumber: $scope.delivery.roomNumber
                        });
        $scope.previousRecipient = $scope.delivery.recipient;
        $scope.delivery = {};
        $scope.deliveryForm.$setPristine();
        $scope.formSuccess = true;
        $anchorScroll();
      };
  });
