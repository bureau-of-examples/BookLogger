(function(){
    "use strict";

    angular.module("app").factory("readerService", ["$resource", "badgeService", readerServiceFactory]);

    function readerServiceFactory($resource, badgeService) {

        var Reader = $resource('/readers/:readerId', {readerId:'@readerId'});

        return {
            getReader: getReader
        };

        function getReader (readerId){
            var reader = Reader.get({readerId : readerId}, function(){
                reader.badge = badgeService.retrieveBadge(reader.totalMinutesRead);
            });
            return reader;
        }
    }

}());