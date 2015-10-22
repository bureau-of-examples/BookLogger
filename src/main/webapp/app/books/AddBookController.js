(function(){
    "use strict";

    angular.module("app").controller("AddBookController", ["dataService", "$location", addBookController]);

    function addBookController(dataService, $location){

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


    }
}());
