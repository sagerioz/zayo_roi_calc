var app = angular.module('roiApp', []);

app.controller('RevenueCtrl', function ($scope) {

  $scope.revenues = [];

  $scope.addRevenue = function(){
    $scope.revenues.push({
      text: $scope.revenueText,
      oneTime: $scope.revenueOneTime,
      monthly: $scope.revenueMonthly
    });

    $scope.revenueText = "";
    $scope.revenueOneTime = 0;
    $scope.revenueMonthly = 0;
    return [$scope.revenueText, $scope.revenueOneTime, $scope.revenueMonthly];
  };

  $scope.remaining = function() {
    var count;
    count = 0;

    angular.forEach($scope.revenues, function(revenue) {
      return count += revenue.done ? 0 : 1;
    });

    return count;
  };

  // ------- functions that return totals --------->

  $scope.oneTimeTotalRevenues = function() {
    var count;
    count = 0;

    if(revenues.length === 1){
      count += revenues.oneTime;
        return `$${count}`;
    };

    angular.forEach($scope.revenues, function(revenue) {
      return count += revenue.oneTime;
      console.log("one time revenue total", count);
    });

    return count;
  };

  $scope.monthlyTotalRevenues = function() {
    var count;
    count = 0;

    if(revenues.length === 1){
      count += revenues.oneTime;
        return `$${count}`;
    };

    angular.forEach($scope.revenues, function(revenue) {
      return count += revenue.monthly;
      console.log("monthly revenue total", count);
    });

    return count;
  };

  $scope.grandTotalRevenues = function() {
    var count;
    count = 0;

    angular.forEach($scope.revenues, function(revenue) {
      return count += revenue.monthly;
      console.log("monthly expense total", count);
    });

    count = count.toFixed(2)
    return `$${count}`;
  };

  $scope.archive = function() {
    var oldRevenues;
    oldRevenues = $scope.revenues;
    $scope.revenues = [];

    angular.forEach(oldRevenues, function(revenue) {
      if (!revenue.done) {
        return $scope.revenues.push(revenue);
      }
    });
  };
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

// ------- functions that return totals --------->

  $scope.oneTimeTotalExpenses = function() {
    var count;
    count = 0;

    if(expenses.length === 1){
      count += expenses.oneTime;
      count = count.toFixed(2)
        return `$${count}`;
    }

    angular.forEach($scope.expenses, function(expense) {
      count += expense.oneTime;
    });
    count = count.toFixed(2)
    return `$${count}`;
  };

  $scope.monthlyTotalExpenses = function() {
    var count;
    count = 0;

    if(expenses.length === 1){
      count += expenses.monthly;
      count = count.toFixed(2)
        return `$${count}`;
    }

    angular.forEach($scope.expenses, function(expense) {
      return count += expense.monthly;
      console.log("monthly expense total", count);
    });

    count = count.toFixed(2)
    return `$${count}`;
  };

  $scope.grandTotalExpenses = function() {
    var count;
    count = 0;

    angular.forEach($scope.expenses, function(expense) {
      return count += expense.monthly;
      console.log("monthly expense total", count);
    });

    count = count.toFixed(2)
    return `$${count}`;
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
