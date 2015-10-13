(function(){
    "use strict";

    angular.module("app").controller("BooksController", ["books", "dataService", "logger", "badgeService", BooksController]);

    function BooksController(books, dataService, logger, badgeService){

        var vm = this;

        vm.appName  = books.appName;
        vm.appDesc = books.appDesc;
        vm.allBooks = [];

        dataService.getAllBooks().then(getBooksSuccess, getBooksError, getBooksNotification);

        function getBooksSuccess(array){
            vm.allBooks = array;
        }

        function getBooksError(errorMessage){
            logger.output(errorMessage);
        }

        function getBooksNotification(message){
            logger.output(message);
        }

        dataService.getAllReaders().then(getReadersSuccess).catch(getReadersError).finally(getAllReadersComplete);;//catch handler can also handle exceptions thrown from the success handler.

        function getReadersSuccess(array) {
            if(Math.random() * 100 >= 50) {
                vm.allReaders = array;
            } else {
                throw "An exception occurred while displaying all readers.";
            }
        }

        function getReadersError(errorMessage){
            alert(errorMessage);
        }

        function getAllReadersComplete(){ //no arguments passed
            logger.output("getAllReaders completed.");
        }

        vm.getBadge = function(minutesRead){
            return badgeService.retrieveBadge(minutesRead);
        };


        logger.output("BooksController has been created.");
    }

}());