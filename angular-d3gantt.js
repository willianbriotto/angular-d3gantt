angular.module('angularD3Gantt', [])
.directive('d3Gantt', ['$window', '$timeout', function($window, $timeout) {
    return {
        restrict: 'AE',
        scope: {
            data: "=",
        },
        link: function(scope, element, attrs) {
            var gantt = new d3.gantt();
            
            gantt.taskTypes(scope.data.taskNames)
            .taskStatus(scope.data.taskStatus)
            .tickFormat(scope.data.format)
            .height(scope.data.height)
            .width(scope.data.width);
            
            var endDate = function() {
                var __end__ = scope.data.tasks;
                __end__.sort(function(a, b) {
                    return a-b;
                });
                return __end__[__end__.length - 1];
            }

            var startDate = function() {
                var __start__ = scope.data.tasks;
                __start__.sort(function(a, b) {
                    return a > b;
                });
                
                return new Date(__start__[__start__.length - 1]);
            }

            if(Object.keys(scope.data.margin).length > 0)
                gantt.margin(scope.data.margin);


            gantt.timeDomain([startDate(), endDate()])
            gantt(scope.data.tasks);

            scope.$watch('data', function(_old, _new) {
                    gantt.redraw(scope.data.tasks);
            }, true);
        }
    }
}]);
