(function(){
    "use strict";

    angular.module("app").controller("BooksController", ["books", "dataService", "logger", BooksController]);

    function BooksController(books, dataService, logger){

        var vm = this;

        vm.appName  = books.appName;
        vm.appDesc = books.appDesc;

        vm.allBooks = dataService.getAllBooks();

        logger.output("BooksController has been created.");
    }

}());