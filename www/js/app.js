// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase', 'ngOpenFB'])

.run(function($ionicPlatform, ngFB) {
    
  ngFB.init({appId: '515232208671925'});
    
    
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


angular.module('starter')
         .controller("loginCtrl", loginController);
    
   loginController.$inject = ['$scope', '$firebaseAuth', 'ngFB']; 
  function loginController($scope, $firebaseAuth, ngFB) {
    var vm = this;
      
    vm.loggedin = false;
      
    vm.test = function(){
        vm.testInfo = "dit is een test";
    }
      
    /*vm.login = function() {
        console.log("doing login....");
        vm.clickInfo = "doing login";
        
        
        $cordovaOauth.facebook("515232208671925", ["email"])
        .then(function(result){
            vm.info = "cordova auth is working with result: " + result;
            
            firebase.auth().$authWithOAuthToken("facebook", result.access_token)
            .then(function(user) {
                console.log("logged in!", user);
                vm.authInfo = JSON.stringify(authData);
                
            },
            function(error) {
                console.log("error happend when doing firebase oauth");
                vm.authInfo = error;
            });
            
        },
        function(error) {
            console.log("error on cordova oauth", error);
            vm.info = error;
        });
    }*/
    
    vm.login = function() {
        ngFB.login({scope: 'email'}).then(
        function (response) {
            var token = response.authResponse.accessToken;
            var credential = firebase.auth.FacebookAuthProvider.credential(token);
            vm.clickInfo = credential;
            
            firebase.auth().signInWithCredential(credential)
                .catch(function(error){
                    vm.info = error;
                });
        })
        .catch(function(error){
            vm.info(error);
        });
    }
    
    firebase.auth().onAuthStateChanged(function(user) {
      if (user !== null) {
        console.log('logged in!');
        vm.info = "success!";
        vm.loggedin = true;
      }
    });
    
      
  }
