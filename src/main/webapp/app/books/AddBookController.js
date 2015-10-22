(function(){
    "use strict";

    angular.module("app").controller("AddBookController", ["dataService", "$location", "statisticsService", addBookController]);

    function addBookController(dataService, $location, statisticsService){

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

    }
}());
