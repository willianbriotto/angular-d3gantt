var app = angular.module('TestApp', ['angularD3Gantt']);

app.controller('MainController', ['$scope', function($scope) {
    $scope.title = "Angular D3Gantt - Example 1";
    
    $scope.addTask = function() {
        var last = Date.now();
        if($scope.chart_data.tasks.length > 0)
            last = $scope.chart_data.tasks[$scope.chart_data.tasks.length - 1].endDate;
        
        var newTaskDate =  d3.time.hour.offset(last, Math.ceil(1 * Math.random()));
        var taskStatusKeys = Object.keys($scope.chart_data.taskStatus);
        var taskStatusName = taskStatusKeys[Math.floor(Math.random() * taskStatusKeys.length)];
        var taskName = $scope.chart_data.taskNames[Math.floor(Math.random() * $scope.chart_data.taskNames.length)]; 

        $scope.chart_data.tasks.push({
            "startDate" : d3.time.hour.offset(newTaskDate, Math.ceil(1 * Math.random())),
	    "endDate" : d3.time.hour.offset(newTaskDate, (Math.ceil(Math.random() * 3)) + 1),
	    "taskName" : taskName,
	    "status" : taskStatusName
        });
    };

    $scope.removeTask = function() {
        $scope.chart_data.tasks.pop();
    }

    $scope.chart_data = {
        width: 800,
        height: 400,
        margin: {
            top: 50,
            bottom: 20,
            left: 100,
            right: 150
        },
        tasks: [
            {
                startDate:new Date("Sun Dec 09 01:00:00 EST 2015"),
                endDate:new Date("Sun Dec 09 02:00:00 EST 2015"),
                taskName:"Name 1",
                status:"In Progress"
            },
            {
                startDate:new Date("Sun Dec 09 02:00:01 EST 2015"),
                endDate:new Date("Sun Dec 09 04:00:00 EST 2015"),
                taskName:"Name 2",
                status:"Stop"
            },
            {
                startDate:new Date("Sun Dec 09 04:00:01 EST 2015"),
                endDate:new Date("Sun Dec 09 04:30:00 EST 2015"),
                taskName:"Name 3",
                status:"In Progress"
            },
            {
                startDate:new Date("Sun Dec 09 01:00:00 EST 2015"),
                endDate:new Date("Sun Dec 09 02:00:00 EST 2015"),
                taskName:"Name 4",
                status:"OFF"
            },
            {
                startDate:new Date("Sun Dec 09 02:00:01 EST 2015"),
                endDate:new Date("Sun Dec 09 04:00:00 EST 2015"),
                taskName:"Name 5",
                status:"Stop"
            }
        ],
        taskNames: [
            "Name 1", "Name 2",
            "Name 3", "Name 4",
            "Name 5"
        ],
        taskStatus: {
            "In Progress" : "bar-progress",
            "Stop" : "bar-stop",
            "OFF" : "bar-off"
        },
        format: "%H:%M"
    };
}]);
