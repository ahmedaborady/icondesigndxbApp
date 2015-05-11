// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('icondesign', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(function($stateProvider,$urlRouterProvider){
      $stateProvider
          .state(
          'home',{
            url:"/",
            templateUrl:"views/home.html"
          }).state(
          'thanks',{
            url:"/thanks/:mail",
            templateUrl:"views/thanks.html"
          });
      $urlRouterProvider.otherwise('/');
    })


    .controller('regCtrl', function($scope, $http,$state) {

      $scope.rsponseText = "";
      $scope.registerUser = function () {


        if(isValid()){


        var request = $http({
          method: "post",
          url: "http://icondesigndxb.com/external/addcustomer3.php",
          crossDomain : true,
          data: {
            'fname': $scope.fname,
            'lname': $scope.lname,
            'password': $scope.pwd,
            'passwordc': $scope.pwdconfirm,
            'email': $scope.email,
            'tel': $scope.ccode + $scope.phonebody,
            'adress': $scope.address,
            'emirate': parseInt($("#emi option:selected").attr("data-id"))
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }

        }).success(function(data, status, headers, config) {
          //$scope.responseMessage = data;

          if(data == "Done"){
            $state.go('thanks', { mail: $scope.email });
              $('input, select, button').attr('disabled','disabled');
              setTimeout(function(){
                  $scope.fname = "";
                  $scope.lname = "";
                  $scope.password = "";
                  $scope.email = "";
                  $scope.adress = "";
                  $scope.tel = "";
                  $scope.emirate = "";

                  $('input,textarea').val("");
                  $('input,textarea').parent('label').css('border','3px solid white');

                  $('input, select, button').removeAttr('disabled');

              },2000);


          }else{
              $scope.rsponseText = data.slice(0,data.indexOf("SQLSTAT"));
          }

        }).error(function(data, status, headers, config){

        });//end request

        }else{

        }
      }; // end register

        function isValid(){

        if(nameValid() && validEmail() && validPass() && validPhone() && validAddress() && validEmi()){
            return true;
        }else{
            return false;
        }

        }

        function nameValid(){

            if($('#firstname').val() != "" && $('#lastname').val() != "" ){
                $scope.rsponseText = "";
                return true;
            }else{
                $scope.rsponseText = "Please Enter Your First and Last Name";
                return false;
            }

        }

        function validEmail(){

            if($('#email').val() != "" ){
                $scope.rsponseText = "";
                return true;
            }else{
                $scope.rsponseText = "Email Field is Required";
                return false;
            }
        }

        function validPass(){
            if($('#pwd').val() != "" && $('#pwdc').val() != "" && $('#pwdc').val() == $('#pwd').val() && $('#pwdc').val().length >= 6 && $('#pwd').val().length >= 6){
                $scope.rsponseText = "";
                return true;

            }else if($('#pwd').val() != "" && $('#pwdc').val() != "" && $('#pwdc').val() == $('#pwd').val() && $('#pwdc').val().length < 6 && $('#pwd').val().length < 6){
                $scope.rsponseText = "Password Field is Must at least 6 Characters!";
                return false;
            }
            else if($('#pwd').val() == "" || $('#pwdc').val() == ""){
                $scope.rsponseText = "Password Field is Required!";
                return false;
            }
            else if($('#pwd').val() != "" && $('#pwdc').val() != "" && $('#pwdc').val() != $('#pwd').val()){

                $scope.rsponseText = "Password Confirmation doesn't match!";
                return false;

            }
            else{
                $scope.rsponseText = "Password Field is Required!";
                return false;
            }
        }

        function validPhone(){

            if($('#ccode option:selected').text().length == 3 && $('#phone').val().length == 7){
                $scope.rsponseText = "";
                return true;
            }

            else{
                $scope.rsponseText = "Please Enter Valid Phone Number!";
                return false;
            }
        }

        function validAddress(){
            if($('#address').val() == ""){
                $scope.rsponseText = "Address Is Required!";
                return false;
            }else if($('#address').val().length < 5){
                $scope.rsponseText = "Address Is Too Short!";
                return false;
            }else{
                $scope.rsponseText = "";
                return true;
            }
        }

        function validEmi(){
            if($("#emi option:selected").text() != ""){
                $scope.rsponseText = "";
                return true;
            }else{
                $scope.rsponseText = "Please Choose your Emirate";
                return false;
            }
        }



        $('#phone').bind('keyup',function(){
            if (/\D/g.test($('#phone').val())){ $('#phone').val(  $('#phone').val().replace(/\D/g,''));}
        });


        $('#pwd').bind('keyup',function(){
            if($('#pwd').val().length < 6)
            {

                $('#pwd').parent('label').css('border','3px solid #E16455');

            }else if($('#pwdc').val() == $('#pwd').val() && $('#pwdc').val().length >= 6 && $('#pwd').val().length >= 6){
                $('#pwd').parent('label').css('border','3px solid green');
            }

            else{

                $('#pwd').parent('label').css('border','3px solid green');

            }
        });

        $('#pwdc').bind('keyup',function(){
            if($('#pwdc').val() == $('#pwd').val() && $('#pwdc').val().length >= 6 && $('#pwd').val().length >= 6)
            {
                $('#pwdc').parent('label').css('border','3px solid green');
                $('#pwd').parent('label').css('border','3px solid green');
                $scope.rsponseText = "";
            }else{
                $('#pwdc').parent('label').css('border','3px solid #E16455');
                $('#pwd').parent('label').css('border','3px solid #E16455');
            }
        });

        $('#email').bind('keyup',function(){
            if ($('#email').val().indexOf("@") >= 0 && $('#email').val().indexOf(".com") >= 0){

                $('#email').parent('label').css('border','3px solid green');
            }else{
                $('#email').parent('label').css('border','3px solid #E16455');
            }
        });





    }).controller('thanksCtrl', function($scope,$state) {
        $scope.mail = $state.params.mail;
        setTimeout(function(){
            $state.go('home');
        },5000);
    });
