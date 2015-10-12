(function(){
    "use strict";

    var app = angular.module("app", []);

    app.provider("books", booksProvider);

    //This constructs the book provider
    function booksProvider(){

        //configuration values; set in configuration phase and used when $get is called.
        var includeVersionInAppName = false;
        this.setIncludeVersionInAppName = function(val){
            includeVersionInAppName = val;
        };

        //the function used to create the service
        this.$get = function(){

            var appName = "Book Logger";
            var appVersion = "1.0";
            var appDesc = "Track which books you read.";

            return {
                appName : appName + (includeVersionInAppName ? " " + appVersion: ""),
                appDesc : appDesc
            };
        };

    }

    app.config(["booksProvider", configApp]);

    function configApp(booksProvider){
        booksProvider.setIncludeVersionInAppName(true);

    }
}());
