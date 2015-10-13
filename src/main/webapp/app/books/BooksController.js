(function(){
    "use strict";

    angular.module("app").controller("BooksController", ["books", "dataService", "logger", "badgeService", BooksController]);

    function BooksController(books, dataService, logger, badgeService){

        var vm = this;

        vm.appName  = books.appName;
        vm.appDesc = books.appDesc;

        vm.allBooks = dataService.getAllBooks();
        vm.allReaders = dataService.getAllReaders();

        vm.getBadge = function(minutesRead){
            return badgeService.retrieveBadge(minutesRead);
        };


        logger.output("BooksController has been created.");
    }

}());