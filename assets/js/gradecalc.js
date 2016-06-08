angular.module('gradeCalcApp', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/gradecalc_partials/calc.html',
      controller: 'CalcController',
      active: 'calc'
    }).when('/about', {
      templateUrl: '/gradecalc_partials/about.html',
      controller: 'AboutController',
      active: 'about'
    }).when('/weight', {
      templateUrl: '/gradecalc_partials/weight.html',
      controller: 'WeightController',
      active: 'weight'
    }).otherwise({
      redirectTo: '/'
    });
  }])
  .controller('MainController', ['$scope', '$route', function($scope, $route) {
    $scope.$route = $route;
  }])
  .controller('AboutController', ['$scope', function($scope) {
  }])
  .controller('CalcController', ['$scope', '$location', function ($scope, $location) {
    // contains mp1, mp2, mp3, mp4, mt, final, desired
    $scope.grades = [];
    $scope.$watch('grades', (newGrades, oldGrades) => {
        $scope.multiplier = 1;
        $scope.sum = 0;
        for (let i = 1; i <= 6; i++) {
            if (!newGrades[i] && parseInt(newGrades[i]) !== 0) {
                if (i > 4) {
                    $scope.multiplier -= 0.1;
                } else {
                    $scope.multiplier -= 0.2;
                }
                $scope.multipler = Math.round($scope.multiplier);
            } else {
                if (i > 4) {
                    $scope.sum += newGrades[i] * 0.5;
                } else {
                    $scope.sum += newGrades[i];
                }
            }
        }
        $scope.desired = $scope.grades[7];
        $scope.remaining = Math.round((1 - $scope.multiplier) * 100);
        $scope.average = Math.round(($scope.sum / (5 * $scope.multiplier)) * 100) / 100;
        if ($scope.remaining === 0) {
            $scope.needed = 0;
        } else {
            $scope.needed = Math.round((($scope.desired - ($scope.average * $scope.multiplier)) / (1-$scope.multiplier)) * 100) / 100;
        }
    }, true);
    // get grades from url if present
    if (typeof $location.search().grades !== 'undefined' && $location.search().grades !== '') {
      // grades query param is a list of comma-separated values
      const urlGrades = $location.search().grades.split(',').map((grade) => {
        if (typeof grade !== 'undefined' && grade !== '') {
          return parseInt(grade, 10);
        } else {
          return undefined;
        }
      });
      if (Array.isArray(urlGrades)) {
        for (let i = 0; i < urlGrades.length; i++) {
          $scope.grades.push(urlGrades[i]);
        }
      }
    }
  }])
  .controller('WeightController', ['$scope', function($scope) {
    $scope.year = [];
    $scope.calc1 = function(classArray, year) {
      if (classArray[year]) {
        return Math.round(((classArray[year].honors || 0) * 0.05 + (classArray[year].ap || 0) * 0.1) * 100) / 100;
      } else {
        return 0;
      }
    };
    $scope.total = function(classArray) {
      return Math.round(($scope.calc1(classArray, 1) + $scope.calc1(classArray, 2) + $scope.calc1(classArray, 3) + $scope.calc1(classArray, 4)) * 100) / 100;
    }
  }]);
