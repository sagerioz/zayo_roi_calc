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

  // ------- functions that return revenue totals --------->

  $scope.oneTimeTotalRevenues = function() {
    var count;
    count = 0;

    if($scope.revenues.length == 1){
      count += $scope.revenues[0].oneTime;
      return `${count}`;
    };

    angular.forEach($scope.revenues, function(revenue) {
      return count += revenue.oneTime;
    });
    return `${count}`;
  };

  $scope.monthlyTotalRevenues = function() {
    var count;
    count = 0;

    if($scope.revenues.length == 1){
      count = $scope.revenues[0].monthly || 0;
      return `${count}`;
    };

    angular.forEach($scope.revenues, function(revenue) {
      return count += revenue.monthly;
      console.log("monthly revenue total", count);
    });

    return `${count}`;
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
      return `${count}`;
    }else{
      count = count.toFixed(2)
      return `${count}`;
    }
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

// ------- functions that return expense totals --------->

  $scope.oneTimeTotalExpenses = function() {
    var count;
    count = 0;

    if($scope.expenses.length === 1){
      count += $scope.expenses[0].oneTime;
        return `${count}`;
    }

    angular.forEach($scope.expenses, function(expense) {
      count += expense.oneTime;
    });
    return `${count}`;
  };

  $scope.monthlyTotalExpenses = function() {
    var count;
    count = 0;

    if($scope.expenses.length === 1){
      count += $scope.expenses[0].monthly;
        return `${count}`;
    }

    angular.forEach($scope.expenses, function(expense) {
      console.log("monthly expense total", count);
      return count += expense.monthly;
    });

    return `${count}`;
  };

  $scope.grandTotalExpenses = function() {
    var count;
    count = 0;

    angular.forEach($scope.expenses, function(expense) {
        return count += ((expense.monthly + expense.oneTime) * 12);
    });
    count = count.toFixed(2)
    return `${count}`;
  };

// ---- Monthly Contribution Profit = Monthly Revenue – Monthly Expenses ---->

  $scope.monthlyContributionProfit = function(){
    console.log("made it into the function");
    let count;
    count = 0;
    let monthRev = $scope.monthlyTotalRevenues();
    let monthExp = $scope.monthlyTotalExpenses();
    count = (monthRev - monthExp) || 0;
    count = count.toFixed(2)
    return `$${count}`;
  }

  // ---- Total Contribution Profit = Total Revenue – Total Expenses ---->

  $scope.totalContributionProfit = function(){
    let count;
    count = 0;
    let totalRev = $scope.grandTotalRevenues();
    let totalExp = $scope.grandTotalExpenses();
    count = totalRev - totalExp;
    count = count.toFixed(2)
    return `$${count}`;

  }

  // ---- Contribution Margin = Total Contribution Profit / Total Revenue ---->

  $scope.contributionMargin = function(){
    let count;
    count = 0;
    let totalProfit = $scope.totalContributionProfit();
    let totalRev = $scope.grandTotalRevenues();
    count = totalProfit / totalRev;
    count = count.toFixed(2)
    if(count === 'NaN'){
      count = 0
    }
    return `${count}%`;

  }

  // ---- Capital ROI (Months) = (One-Time Expenses – One-Time Revenue) / Monthly Contribution Profit ---->

  $scope.capitalRoi = function() {
    let count;
    count = 0;
    let exp = $scope.oneTimeTotalExpenses();
    let rev = $scope.oneTimeTotalRevenues();
    let profitInStr = $scope.monthlyContributionProfit();
    profit = profitInStr.slice(1)
    profitNum = parseFloat(profit);
    count = (exp - rev ) / profit;
    count = count.toFixed(1);
    if(count === 'NaN'){
      count = 0
    }
    return `${count}`;
}
});
