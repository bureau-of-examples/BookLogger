(function(){
    "use strict";

    var app = angular.module("app", []);

    app.provider("books", ["constants", booksProvider]);

    //This constructs the book provider
    function booksProvider(constants){

        //configuration values; set in configuration phase and used when $get is called.
        var includeVersionInAppName = false;
        this.setIncludeVersionInAppName = function(val){
            includeVersionInAppName = val;
        };

        //the function used to create the service
        this.$get = function(){

            var appName = constants.APP_TITLE;
            var appVersion = constants.APP_VERSION;
            var appDesc = constants.APP_DESCRIPTION;

            return {
                appName : appName + (includeVersionInAppName ? " " + appVersion: ""),
                appDesc : appDesc
            };
        };

    }

    app.config(["booksProvider", "constants", "dataServiceProvider", configApp]);

    function configApp(booksProvider, constants, dataServiceProvider){
        console.log("Configuring " + constants.APP_TITLE);
        booksProvider.setIncludeVersionInAppName(true);

        console.log("at config phase all providers are ready for access:")
        console.log(dataServiceProvider.$get);
    }

}());
