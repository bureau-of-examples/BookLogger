(function(){
    "use strict";

    var app = angular.module("app", []);

    app.config(["$provide", configApp]);

    function configApp($provide){

        $provide.provider("books", booksProvider);

        function booksProvider(){

            this.$get = function(){

                return {
                    appName : "Book Logger",
                    appDesc : "Track which books you read."
                };
            };

        }


    }
}());
