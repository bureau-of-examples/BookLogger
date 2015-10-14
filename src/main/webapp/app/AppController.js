(function(){
    "use strict";

    angular.module("app").controller("AppController", ["books", appController]);

    function appController(books){

        var vm = this;

        vm.appName  = books.appName;
        vm.appDesc = books.appDesc;
    }

}());