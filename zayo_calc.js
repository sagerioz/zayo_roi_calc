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
      return `${count}`;
    };

    angular.forEach($scope.revenues, function(revenue) {
      return count += revenue.oneTime;
      console.log("one time revenue total", count);
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
      //count = count.toFixed(2);
      return `${count}`;
    }else{
      count = count.toFixed(2)
      return `${count}`;
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

    //
    // let monthExp = $scope.monthlyTotalExpenses();
    // console.log("MONTH EXP?", monthExp);
    // let monthRev = $scope.monthlyTotalRevenues();
    // console.log("MONTH REV?", monthRev);
    // count = ((monthRev - monthExp) || 0);
    // console.log("COUNT", count);
    // return `$${count}`;
    let monthRev = $scope.monthlyTotalRevenues();
    //console.log("return from funct as rev", monthRev);
    let monthExp = $scope.monthlyTotalExpenses();
    //console.log("return from funct as exp", monthExp);

    // let rev = parseInt(monthRev);
    // let exp = parseInt(monthExp);
    // console.log("monthExp", exp);
    // console.log("monthReb", );


    count = (monthRev - monthExp) || 0;
    //console.log("COUNT", count);
    count = count.toFixed(2)

    return `${count}`;
  }

  // ---- Total Contribution Profit = Total Revenue – Total Expenses ---->

  $scope.totalContributionProfit = function(){
    //console.log("made it to total contribution func");
    let count;
    count = 0;
    let totalRev = $scope.grandTotalRevenues();
    let totalExp = $scope.grandTotalExpenses();
    count = totalRev - totalExp;
    count = count.toFixed(2)
    return `${count}`;

  }

  // ---- Contribution Margin = Total Contribution Profit / Total Revenue ---->

  $scope.contributionMargin = function(){
    //console.log("made it to contribution Margin func");
    let count;
    count = 0;
    let totalProfit = $scope.totalContributionProfit();
    // console.log("NaN? =>",totalProfit);
    let totalRev = $scope.grandTotalRevenues();
    //console.log("NaN? =>",totalRev);

    count = totalProfit / totalRev;
    count = count.toFixed(2)
    return `${count}%`;

  }

  // ---- Capital ROI (Months) = (One-Time Expenses – One-Time Revenue) / Monthly Contribution Profit ---->

  $scope.capitalRoi = function() {
    console.log("made it to capital ROI func");
    let count;
    count = 0;
    let exp = $scope.oneTimeTotalExpenses();
    console.log("NaN? one time expenses =>", exp);
    let rev = $scope.oneTimeTotalRevenues();
    console.log("NaN? one time total revenue =>", rev);
    let profit = $scope.monthlyContributionProfit();
    console.log("PROFIT? =>", profit);
    count = (exp - rev ) / profit;
    count = count.toFixed(2);
    return `$${count}`;
}
});

// app.controller('RoiCtrl', function ($scope) {
//   let monthRev = 0;
//   let monthExp = 0;
//   var count;
//   count = 0;
//
//     $scope.monthlyContributionProfit = function(){
      // console.log("made it here");
      // let monthRev = $scope.monthlyTotalExpenses();
      // let monthExp = $scope.monthlyTotalRevenues();
      // rev = parseInt(monthRev);
      // exp = parseInt(monthExp);
      // console.log("monthExp", monthExp);
      //
      // count = (rev - exp) || 0;
      // console.log("COUNT", count);
      // return `$${count}`;
//     }
// });
