angular.module('portfolio')
  .service('mainSrvc', function($http) {

    this.email = function(contact) {
      return $http({
        method: 'POST',
        url: '/email',
        data: contact
      }).then(function(response) {
        return response;
      });
    };

  });