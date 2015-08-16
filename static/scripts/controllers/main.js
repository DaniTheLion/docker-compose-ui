'use strict';

/**
 * @ngdoc function
 * @name composeUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the composeUiApp
 */
angular.module('composeUiApp')
  .controller('MainCtrl', function ($scope, $resource) {

    var Projects = $resource('api/v1/projects/:id');

    function reload(init) {
      Projects.get(function (data) {
        $scope.projects = {};

        angular.forEach(data.projects, function(path,name) {
            Projects.get({id: name}, function(projectData){
              $scope.projects[name] = { id: name, path: path, containers: projectData.containers };
            });
        });

        if (!init) {
          alertify.success(Object.keys(data.projects).length + ' projects reloadeded');
        }
      });
    }

    $scope.reload = reload;

    
    $scope.isProjectRunning = function (project) {
      var isRunning = true
      project.containers.forEach(function(container){
        if(!container.is_running){
          isRunning = false;
        }
      });
      return isRunning;
    };


    $scope.isEmpty = function (obj) {
      return angular.equals({}, obj);
    };

    reload(true);

  });
