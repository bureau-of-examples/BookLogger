(function(){
    "use strict";

    angular.module("app").controller("AppController", ["books", "$cookies", "$cookieStore", "$scope", appController]);

    function appController(books, $cookies, $cookieStore, $scope){

        var vm = this;

        vm.appName  = books.appName;
        vm.appDesc = books.appDesc;

        $scope.$watch(function(){
            return $cookies.get("favoriteBook");
        },function(newValue){
            vm.favoriteBook = newValue;
        });

        $scope.$watch(function(){
            var lastEdited = $cookieStore.get("lastEdited");
            if(lastEdited){
                return lastEdited["book_id"];
            }
            return null;

        }, function(newValue){
            vm.lastEdited = newValue;
        });


    }

}());