(function(){
    "use strict";

    angular.module("app").controller("readerDetailsController", ["$route", "readerService", "$log", readerDetailsController]);

    function readerDetailsController($route, readerService, $log){

        var readerId = $route.current.params["readerId"];
        var vm = this;
        vm.reader = readerService.getReader(readerId);

        $log.debug("Reader now is:");
        $log.debug(vm.reader);

    }

}());