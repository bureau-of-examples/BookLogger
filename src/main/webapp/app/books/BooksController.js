(function () {
    "use strict";

    angular.module("app").controller("BooksController", ["dataService", "logger", "badgeService", "$scope", "$route", BooksController]);

    function BooksController(dataService, logger, badgeService, $scope, $route) {

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

        dataService.getUserSummary().then(function(result){
            vm.summaryData = result;
            if ($scope.$root.$$phase != '$digest') {
                $scope.$digest();
            }
        });

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
                    dataService.invalidateUserSummaryCache();
                    dataService.invalidateBooksHttpCache();
                    $route.reload();
                })
                .catch(function(reason){
                    alert(reason);
                });
        };

        logger.output("BooksController has been created.");
    }

}());