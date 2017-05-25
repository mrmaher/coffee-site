(function () {
    'use strict';

    function coffeeTableCtrl (
        CoffeeService
    ) {

        var vm = this;

        function dedupe (a) {
           return Array.from(new Set(a));
        }

        function buildSelectOptions (keyname, data) {
            var allKeys = data.map(function(d) {
                return d[keyname];
            });
            var allKeysDeduped = dedupe(allKeys);

            var final = [];
            var count = 1;
            allKeysDeduped.forEach(function(s) {
                var temp = {};
                temp.id = count;
                temp.label = s;
                final.push(temp);
            });
            return final;
        }

        function init () {
            /**
             * TODO:
             *  - Add options for segment, price, year, month
             *  - search bar
             */
            vm.items = [{
                id: 1,
                label: 'aLabel'
            }, {
                id: 2,
                label: 'bLabel'
            }];

            vm.options = {
                rowHeight: 50,
                headerHeight: 50,
                footerHeight: false,
                scrollbarV: false,
                selectable: true,
                columns: [
                    {name: 'Brand', sort: 'asc', width:250},
                    {name: 'Name', width:300},
                    {name: 'Rating'},
                    {name: 'Cupping Notes', width: 300},
                    {name: 'Price per Pound'},
                    {name: 'Segment', width:300},
                    {name: 'Year'},
                    {name: 'Month'}
                ]
            };

            CoffeeService.fetchData().then(function(resp) {
                vm.data = resp;

                vm.segments = buildSelectOptions('segment', resp);
                vm.prices = buildSelectOptions('pricePerPound', resp);
                vm.years = buildSelectOptions('year', resp);
                vm.months = buildSelectOptions('month', resp);

            });

        }

        init();

    }

    function coffeeTableDirective () {
        return {
          restrict: 'E',
          scope: {},
          controller: coffeeTableCtrl,
          controllerAs: 'vm',
          templateUrl: './scripts/coffee-table/directives/coffee-table.html'
      };
    }

    coffeeTableCtrl.$inject = [
        'CoffeeService'
    ];

    angular.module('coffee-app')
        .directive('coffeeTable', coffeeTableDirective);

}());
