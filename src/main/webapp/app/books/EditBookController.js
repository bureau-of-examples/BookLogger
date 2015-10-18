(function () {
    "use strict";

    angular.module("app").controller("EditBookController", editBookController);

    function editBookController(book, dataService, $location, $cookies, $cookieStore) {
        var vm = this;

        vm.book = book;

        vm.saveBook = function (book) {
            dataService.saveBook(book).then(function () {
                $location.url("/");
            }).catch(function (reason) {
                dataService.reportError(reason);
            });
        };

        vm.setAsFavorite = function () {
            $cookies.put("favoriteBook", vm.book.title);
        };

        $cookieStore.put("lastEdited", vm.book);
    }

    editBookController.$inject = ["book", "dataService", "$location", "$cookies", "$cookieStore"];

}());