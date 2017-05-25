(function () {
    'use strict';

    function CoffeeService(
        $resource
    ) {

        CoffeeService.fetchData = function() {
            var url = './scripts/coffee-table/data/coffee-data.json';
            return $resource(url).query().$promise;
        };

    return CoffeeService;

    }

    CoffeeService.$inject = [
        '$resource'
    ];

    angular.module('coffee-app').service('CoffeeService', CoffeeService);

}());
