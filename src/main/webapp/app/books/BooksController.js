(function(){
    "use strict";

    angular.module("app").controller("BooksController", ["books", BooksController]);

    function BooksController(books){

        var vm = this;

        vm.appName  = books.appName;
        vm.appDesc = books.appDesc;

    }

}());