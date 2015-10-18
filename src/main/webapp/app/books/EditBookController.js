(function () {
    "use strict";

    angular.module("app").controller("EditBookController", editBookController);

    function editBookController(book, dataService, $location) {
        var vm = this;

        vm.book = book.data;

        vm.saveBook = function(book){
            dataService.saveBook(book).then(function(){
                $location.url("/");
            }).catch(function(reason){
                dataService.reportError(reason);
            });
        };
    }

    editBookController.$inject = ["book", "dataService", "$location"];

}());