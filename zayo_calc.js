var app = angular.module('roiApp', []);

app.controller('RevenueCtrl', function ($scope) {

});

app.controller('ExpenseCtrl', function ($scope) {
  $scope.expenses = [
    // {
    //   text: "learn angular",
    //   done: true
    // }, {
    //   text: "build an angular app",
    //   done: false
    // }
  ];

  $scope.addExpense = function() {
    $scope.expenses.push({
      text: $scope.expenseText,
      oneTime: $scope.expenseOneTime,
      monthly: $scope.expenseMonthly
    });

    $scope.expenseText = "";
    $scope.expenseOneTime = 0;
    $scope.expenseMonthly = 0;
    return [$scope.expenseText, $scope.expenseOneTime, $scope.expenseMonthly];
  };

  $scope.remaining = function() {
    var count;
    count = 0;

    angular.forEach($scope.expenses, function(expense) {
      return count += expense.done ? 0 : 1;
    });

    return count;
  };

  $scope.oneTimeTotalExpenses = function() {
    var count;
    count = 0;

    angular.forEach($scope.expenses, function(expense) {
      return count += expense.oneTime;
      console.log("one time expense total", count);
    });

    return count;
  };

  $scope.monthlyTotalExpenses = function() {
    var count;
    count = 0;

    angular.forEach($scope.expenses, function(expense) {
      return count += expense.monthly;
      console.log("monthly expense total", count);
    });

    return count;
  };

  $scope.archive = function() {
    var oldExpenses;
    oldExpenses = $scope.expenses;
    $scope.expenses = [];

    angular.forEach(oldExpenses, function(expense) {
      if (!expense.done) {
        return $scope.expenses.push(expense);
      }
    });
  };
//};
});

app.controller('ItemController', function ($scope) {
    //Controller Code Here
});


// var ExpenseCtrl;
//
// ExpenseCtrl = function($scope) {
//   $scope.expenses = [
//     // {
//     //   text: "learn angular",
//     //   done: true
//     // }, {
//     //   text: "build an angular app",
//     //   done: false
//     // }
//   ];
//
//   $scope.addExpense = function() {
//     $scope.expenses.push({
//       text: $scope.expenseText,
//       oneTime: $scope.expenseOneTime,
//       monthly: $scope.expenseMonthly
//     });
//
//     $scope.expenseText = "";
//     $scope.expenseOneTime = 0;
//     $scope.expenseMonthly = 0;
//     return [$scope.expenseText, $scope.expenseOneTime, $scope.expenseMonthly];
//   };
//
//   $scope.remaining = function() {
//     var count;
//     count = 0;
//
//     angular.forEach($scope.expenses, function(expense) {
//       return count += expense.done ? 0 : 1;
//     });
//
//     return count;
//   };
//
//   $scope.archive = function() {
//     var oldExpenses;
//     oldExpenses = $scope.expenses;
//     $scope.expenses = [];
//
//     angular.forEach(oldExpenses, function(expense) {
//       if (!expense.done) {
//         return $scope.expenses.push(expense);
//       }
//     });
//   };
// };

// var RevenueCtrl;
//
// RevenueCtrl = function($scope){
//
// }

//angular.module("roiApp", []).controller("ExpenseCtrl", ExpenseCtrl);
