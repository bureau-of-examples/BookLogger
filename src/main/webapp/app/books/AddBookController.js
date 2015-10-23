(function(){
    "use strict";

    angular.module("app").controller("AddBookController", ["dataService", "$location", "statisticsService", "$log", addBookController]);

    function addBookController(dataService, $location, statisticsService, $log){

        var vm = this;

        vm.addBook = function(book){
            dataService.addBook(book).then(function(){
                dataService.invalidateUserSummaryCache();
                dataService.invalidateBooksHttpCache();
                $location.url("/");
            }).catch(function(reason){
                dataService.reportError(reason);
            });
        }

        vm.incrementCancel = statisticsService.incrementCancel;
        $log.log("add book controller is called.");

    }
}());
