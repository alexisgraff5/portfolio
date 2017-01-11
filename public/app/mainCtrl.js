
angular.module('portfolio')
  .controller('mainCtrl', ($scope, mainSrvc) => {

    $scope.email = function(contact) {
      mainSrvc.email(contact).then(function(response) {
        if (response.status === 200) {
          $scope.contact.name = '';
          $scope.contact.email = '';
          $scope.contact.number = '';
          $scope.contact.message = '';
          swal('Success!', 'Thanks For The Message! I\'ll Get Back To You As Soon As Possible.', 'success');
        } else {
          swal('Hmm..', 'It Looks Like Something Went Wrong.', 'error');
        }
      });
    };


  });