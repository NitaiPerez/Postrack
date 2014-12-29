/**
 * Postrack
 * Created by Nitai J. Perez
 * Nitai.Perez@Gmail.com
 * 19/10/2014
 */

var bg = chrome.extension.getBackgroundPage();

var app = angular.module("app", ["ngRoute"]);



app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {controller: "Tracks", templateUrl: "views/tracks.html"})
        .otherwise({redirectTo: "/"});
}]);

// MainCtrl:
app.controller("MainCtrl", ["$scope", function ($scope) {
}]);

// Main frame Ctrl for tracks:
app.controller("Tracks", ["$scope", function ($scope) {
    $scope.img = chrome.extension.getURL('app/adapters/img/israelPostAdapter.png');
    $scope.init = function () {
        $scope.tracks = bg.tracks;
        try {
            $scope.$digest()
        } catch (e) {
        }
        setTimeout($scope.init, 1000);
    };
    bg.updateTracks();
}]);

// Easy display of times via moment filter:
app.filter("timeToMoment", function () {
    return function (timestamp) {
        return moment(timestamp).fromNow();
    }
});



