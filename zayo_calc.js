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

  // ------- functions that return revenue totals --------->

  $scope.oneTimeTotalRevenues = function() {
    var count;
    count = 0;

    if($scope.revenues.length == 1){
      count += $scope.revenues[0].oneTime;
      console.log("HERE", count);
      return `$${count}`;
    };

    angular.forEach($scope.revenues, function(revenue) {
      return count += revenue.oneTime;
      console.log("one time revenue total", count);
    });


    return `$${count}`;
  };

  $scope.monthlyTotalRevenues = function() {
    var count;
    count = 0;

    if($scope.revenues.length == 1){
      count = $scope.revenues[0].monthly || 0;
      return `$${count}`;
    };

    angular.forEach($scope.revenues, function(revenue) {
      return count += revenue.monthly;
      console.log("monthly revenue total", count);
    });

    return `$${count}`;
  };

  $scope.grandTotalRevenues = function() {
    var count;
    count = 0;

    angular.forEach($scope.revenues, function(revenue) {
        count += ((revenue.monthly + revenue.oneTime) * 12);
    });

    if(count === 'NaN' ){
      count = 0;
      count = count.toFixed(2);
      return `$${count}`;
    }else{
      count = count.toFixed(2)
      return `$${count}`;
    }
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
  $scope.expenses = [];

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

// ------- functions that return expense totals --------->

  $scope.oneTimeTotalExpenses = function() {
    var count;
    count = 0;

    if($scope.expenses.length === 1){
      count += $scope.expenses[0].oneTime;
        return `$${count}`;
    }

    angular.forEach($scope.expenses, function(expense) {
      count += expense.oneTime;
    });
    return `$${count}`;
  };

  $scope.monthlyTotalExpenses = function() {
    var count;
    count = 0;

    if($scope.expenses.length === 1){
      count += $scope.expenses[0].monthly;
        return `$${count}`;
    }

    angular.forEach($scope.expenses, function(expense) {
      return count += expense.monthly;
      console.log("monthly expense total", count);
    });

    return `$${count}`;
  };

  $scope.grandTotalExpenses = function() {
    var count;
    count = 0;

    angular.forEach($scope.expenses, function(expense) {
        return count += ((expense.monthly + expense.oneTime) * 12);
    });
    count = count.toFixed(2)
    return `$${count}`;
  };

  // $scope.monthlyContributionProfit = function(){
  //   var count;
  //   count = 0;
  //
  //   let monthRev = $scope.monthlyTotalExpenses();
  //   let monthExp = $scope.monthlyTotalRevenues();
  //   count = (monthRev - monthExp) || 0;
  //   return `$${count}`;
  // }

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

app.controller('RoiCtrl', function ($scope) {
  let monthRev = 0;
  let monthExp = 0;
  var count;
  count = 0;

    $scope.monthlyContributionProfit = function(){
      let monthRev = $scope.monthlyTotalExpenses();
      let monthExp = $scope.monthlyTotalRevenues();
      count = (monthRev - monthExp) || 0;
      return `$${count}`;
    }
});
