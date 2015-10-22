(function(){
    "use strict";

    angular.module("app").factory("statisticsService", statisticsServiceFactory);

    function statisticsServiceFactory(){

        var counts = {cancel:0};
        return {
            incrementCancel: function () {
                counts["cancel"]++;
            },
            getCancel: function(){
                return counts["cancel"];
            }

        };
    }

}());