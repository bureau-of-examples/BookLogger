(function () {
    "use strict";

    angular.module("app").controller("BooksController", ["dataService", "logger", "badgeService", BooksController]);

    function BooksController(dataService, logger, badgeService) {

        var vm = this;

        vm.allBooks = [];

        dataService.getAllBooks().then(getBooksSuccess, getBooksError, getBooksNotification);

        function getBooksSuccess(array) {
            vm.allBooks = array;
        }

        function getBooksError(errorMessage) {
            alert(errorMessage);
        }

        function getBooksNotification(message) {
            logger.output(message);
        }

        dataService.getAllReaders().then(getReadersSuccess).catch(getReadersError).finally(getAllReadersComplete);//catch handler can also handle exceptions thrown from the success handler.

        function getReadersSuccess(array) {
            if (Math.random() * 100 >= 1) {
                vm.allReaders = array;
            } else {
                throw "An exception occurred while displaying all readers.";
            }
        }

        function getReadersError(errorMessage) {
            alert(errorMessage);
        }

        function getAllReadersComplete() { //no arguments passed
            logger.output("getAllReaders completed.");
        }

        vm.getBadge = function (minutesRead) {
            return badgeService.retrieveBadge(minutesRead);
        };

        vm.deleteBook = function (bookId) {

            dataService.deleteBook(bookId)
                .then(function(){
                    return dataService.getAllBooks().then(getBooksSuccess, getBooksError, getBooksNotification);
                })
                .catch(function(reason){
                    alert(reason);
                });
        };

        logger.output("BooksController has been created.");
    }

}());