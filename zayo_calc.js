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
      count = count.toFixed(2);
      return `$${count}`;
    };

    angular.forEach($scope.revenues, function(revenue) {
      return count += revenue.oneTime;
    });
    count = count.toFixed(2);
    return `$${count}`;
  };

  $scope.monthlyTotalRevenues = function() {
    var count;
    count = 0;

    if($scope.revenues.length == 1){
      count = $scope.revenues[0].monthly || 0;
      count = count.toFixed(2);
      return `$${count}`;
    };

    angular.forEach($scope.revenues, function(revenue) {
      return count += revenue.monthly;
    });
    count = count.toFixed(2);
    return `$${count}`;
  };

  $scope.grandTotalRevenues = function() {
    var count;
    count = 0;

    angular.forEach($scope.revenues, function(revenue) {
        count = (revenue.oneTime + (revenue.monthly * 12));
    });

    if(count === 'NaN' ){
      count = 0;
      count = count.toFixed(2);
      return `$${count}`;
    } else {
      count = count.toFixed(2)
      return `$${count}`;
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
      count = count.toFixed(2);
      return `$${count}`;
    }

    angular.forEach($scope.expenses, function(expense) {
      count += expense.oneTime;
    });
    count = count.toFixed(2);
    return `$${count}`;
  };

  $scope.monthlyTotalExpenses = function() {
    var count;
    count = 0;

    if($scope.expenses.length === 1){
      count += $scope.expenses[0].monthly;
      count = count.toFixed(2);
      return `$${count}`;
    }

    angular.forEach($scope.expenses, function(expense) {
      console.log("monthly expense total", count);
      return count += expense.monthly;
    });
    count = count.toFixed(2);
    return `$${count}`;
  };

  $scope.grandTotalExpenses = function() {
    var count;
    count = 0;

    angular.forEach($scope.expenses, function(expense) {
        return count += (expense.oneTime + (expense.monthly * 12));
    });

    count = count.toFixed(2);
    //count = Number(parseFloat(count).toFixed(4)).toLocaleString('en');
    return `$${count}`;
  };

// ---- Monthly Contribution Profit = Monthly Revenue – Monthly Expenses ---->

  $scope.monthlyContributionProfit = function(){
    let count;
    count = 0;
    let monthlyTotalRevenue = $scope.monthlyTotalRevenues();
    let monthRevNum = monthlyTotalRevenue.slice(1);
    let monthRev = parseFloat(monthRevNum);
    let monthlyExpenses = $scope.monthlyTotalExpenses();
    let monthExpNum = monthlyExpenses.slice(1);
    let monthExp = parseFloat(monthExpNum)
    count = (monthRev - monthExp) || 0;
    count = count.toFixed(2)
    return `$${count}`;
  }

  // ---- Total Contribution Profit = Total Revenue – Total Expenses ---->


  $scope.totalContributionProfit = function(){
    let count;
    count = 0;
    let grandTotalRevenue = $scope.grandTotalRevenues();
    let totalRevNum = grandTotalRevenue.slice(1);
    let totalRev = parseFloat(totalRevNum);
    let grandTotalExpenses = $scope.grandTotalExpenses();
    let totalExpNum = grandTotalExpenses.slice(1);
    let totalExp = parseFloat(totalExpNum);
    count = totalRev - totalExp;
    count = count.toFixed(2)
    return `$${count}`;

  }

  // ---- Contribution Margin = Total Contribution Profit / Total Revenue ---->

  $scope.contributionMargin = function(){
    let count;
    count = 0;

      let totalContributionProf = $scope.totalContributionProfit();
      let totalProfitNum = totalContributionProf.slice(1);
      let totalProfit = parseFloat(totalProfitNum);
      let grandTotalRevenue = $scope.grandTotalRevenues();
      let totalRevNum = grandTotalRevenue.slice(1);
      let totalRev = parseFloat(totalRevNum);
      if(totalRev === 0 && totalProfit === 0){
        return '0%'
      }else{
        count = (totalProfit / totalRev) * 100;
        count = count.toFixed(0);
        return `${count}%`;
      }
  }

  // ---- Capital ROI (Months) = (One-Time Expenses – One-Time Revenue) / Monthly Contribution Profit ---->

  $scope.capitalRoi = function() {
    let count;
    count = 0;
    let oneTimeTotalExpense = $scope.oneTimeTotalExpenses();
    let expNum = oneTimeTotalExpense.slice(1);
    let expenses = parseFloat(expNum);
    let oneTimeTotalRevenue = $scope.oneTimeTotalRevenues();
    let revNum = oneTimeTotalRevenue.slice(1);
    let revenue = parseFloat(revNum);
    let profitInStr = $scope.monthlyContributionProfit();
    let profit = profitInStr.slice(1);
    let profitNum = parseFloat(profit);
    if(profitNum === 0){
      return 0;
    }else{
      count = (expenses - revenue) / profitNum;
      count = count.toFixed(1);
      return `${count}`;
    }
}
   $scope.change = function(){
     capitalRoi();
     contributionMargin();
     totalContributionProfit();
     monthlyContributionProfit();
     grandTotalExpenses();
     grandTotalRevenues();
   }
});
