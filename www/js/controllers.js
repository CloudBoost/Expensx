angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicPopup) {

  $scope.init = function(){
      //ADD MESSAGE METHOD
      $scope.expenses = [];

      CB.CloudObject.on('Expense','created', function(expense){
        $scope.expenses = [expense].concat($scope.expenses);
      });

      var query = new CB.CloudQuery('Expense');
      query.orderByDesc('createdBy');
      query.find({
        success : function(list){
            //list is an array of CloudObject.
            $scope.expenses = list;
            console.log($scope.expenses);

            $scope.$digest();
        }, error : function(error){
          console.log(err);
           var myPopup = $ionicPopup.show({
            title: 'Oops! We cannot get the list of posts right now.',
            scope: $scope,
            buttons: [
              { text: 'Ok' }
            ]
          });
        }
      });

  }
  $scope.init();

  $scope.getTotal = function(){
    var rtnTotal = 0;
    for(var i=0; i < $scope.expenses.length; i++){
      rtnTotal += $scope.expenses[i].document.amount;
    }
    return rtnTotal;
  }
})

.controller('ExpenseCtrl', function($scope, $filter, $ionicPopup) {

  //ADD MESSAGE METHOD
  $scope.addExpense = function(e){
    var expenseDate = $filter('date')(e.date, "dd/MMM/yyyy")
    var expense = new CB.CloudObject('Expense');
    expense.set('expense',e.label);
    expense.set('amount',e.cost);
    expense.set('date',expenseDate);
    expense.save({
      success : function (expense){
        //success
        // $scope.init();

      },error : function(error){
        var myPopup = $ionicPopup.show({
          title: 'Oops! We cant save the post right now.',
          scope: $scope,
          buttons: [
            { text: 'Ok' }
          ]
        });
      }
    });

  }

})
.controller('AccountCtrl', function($scope) {
   $scope.showLoginForm = false; //Checking if user is logged in


   //Login method
   // $scope.login = function(em, pwd){
   //  fireBaseData.ref().authWithPassword({
   //    email:em,
   //    password:pwd
   //  }, function(error, authData){
   //    if(error === null){
   //      console.log("User ID:"+ authData.provider);
   //      $scope.user = fireBaseData.ref().getAuth();
   //      $scope.showLoginForm = false;
   //      $scope.$apply();
   //    }else{
   //      console.log("Error authenticating user:", error);
   //    }
   //  });
   // }

  //Logout method
  $scope.logout = function(){
    // fireBaseData.ref().unauth();
    $scope.showLoginForm = true;
  }
});
