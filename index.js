"use strict";

let annotator = {
    folders : [
        {name:"test_folder"},
        {name:"test_folder2"}
    ],
    classification_tags : [
        {name: "Dog", backgroundcolor:"#ff7575", index:0},
        {name: "Cat", backgroundcolor:"#ff75ba", index:1}
    ],
    classification_labels : [
        {name: "Dog", backgroundcolor:"#ff7575", index:0}
    ],
    detection_tags : [
        {name: "Dog", backgroundcolor:"#ff7575", index:0},
        {name: "Cat", backgroundcolor:"#ff75ba", index:1}
    ],
    detection_labels : [
        {name: "Dog", backgroundcolor:"#ff7575", xmin: 0, ymin:10, xmax: 100, ymax: 110}
    ],
    segmentation_tags : [
        {name: "Dog", backgroundcolor:"#ff7575", index:0},
        {name: "Cat", backgroundcolor:"#ff75ba", index:1}
    ],
    colors : [
        "#ff7575",
        "#ff75ba",
        "#ff75ff",
        "#ba75ff",
        "#7575ff",
        "#75baff",
        "#75ffff",
        "#75ffba",
        "#75ff75",
        "#baff75",
        "#ffff75",
        "#ffba75"
    ] // https://www.colordic.org/v/
};

let app = angular.module('myApp', [ 'ui.router' ])
    .config(function($stateProvider) {
        $stateProvider.state('main', {
            url: '/main',
            templateUrl: 'views/main.html',
            controller: 'MainController'
        })
    })
    .config(function($stateProvider) {
        $stateProvider.state('main.classification', {
            url: '.classification',
            templateUrl: 'views/classification.html',
            controller: 'ClassificationController'
        })
    })
    .config(function($stateProvider) {
        $stateProvider.state('main.detection', {
            url: '.detection',
            templateUrl: 'views/detection.html',
            controller: 'DetectionController'
        })
    })
    .config(function($stateProvider) {
        $stateProvider.state('main.segmentation', {
            url: '.segmentation',
            templateUrl: 'views/segmentation.html',
            controller: 'SegmentationController'
        })
    })
    .config(function($urlRouterProvider) {
        $urlRouterProvider.otherwise(function($injector) {
            let $state = $injector.get('$state');
            $state.go('main.classification');
        })
    })
    .controller('MainController', ['$scope', function($scope) {
        $scope.folders = annotator.folders;
        $scope.folder = $scope.folders[0].name;
    }])
    .controller('ClassificationController', ['$scope', '$state', '$interval', function($scope, $state, $interval) {
        $scope.change = function(state){
            $state.go(state);
        };
        $scope.current_tag = annotator.classification_labels[0].name;
        $scope.tag_query = "";
        $scope.tags = annotator.classification_tags;
        $scope.searched_tags = annotator.classification_tags;
        let pre_tag_query = "";
        $scope.tag_search = function(){
            const r = [];
            for(let i=0; i<$scope.tags.length; i++){
                if ($scope.tags[i].name.toLowerCase().indexOf($scope.tag_query.toLowerCase()) >= 0){
                    r.push($scope.tags[i])
                }
            }
            $scope.searched_tags = r;
        };
        let incremental = function(){
            if ($scope.tag_query != pre_tag_query){
                pre_tag_query = $scope.tag_query;
                if ($scope.tag_query != ""){
                    $scope.tag_search();
                } else {
                    $scope.searched_tags = $scope.tags;
                }
            }
        };
        $interval(incremental, 500);
        $scope.add = function(){

        }
    }])
    .controller('DetectionController', ['$scope', '$state', function($scope, $state) {
        $scope.change = function(state){
            $state.go(state);
        };
    }])
    .controller('SegmentationController', ['$scope', '$state', function($scope, $state) {
        $scope.change = function(state){
            $state.go(state);
        };
    }]);
