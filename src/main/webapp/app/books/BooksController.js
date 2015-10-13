(function(){
    "use strict";

    angular.module("app").controller("BooksController", ["books", "dataService", BooksController]);

    function BooksController(books, dataService){

        var vm = this;

        vm.appName  = books.appName;
        vm.appDesc = books.appDesc;

        vm.allBooks = dataService.getAllBooks();

    }

}());