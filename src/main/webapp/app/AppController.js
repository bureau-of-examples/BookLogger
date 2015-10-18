(function(){
    "use strict";

    angular.module("app").controller("AppController", ["books", "$cookies", "$cookieStore", appController]);

    function appController(books, $cookies, $cookieStore){

        var vm = this;

        vm.appName  = books.appName;
        vm.appDesc = books.appDesc;

        vm.favoriteBook = $cookies.get("favoriteBook");
        vm.lastEdited = $cookieStore.get("lastEdited");
    }

}());