(function(){
    "use strict";

    var app = angular.module("app", ["ngRoute", "httpMock"]);

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

    app.config(["$routeProvider", configRoute]);

    function configApp(booksProvider, constants, dataServiceProvider){
        console.log("Configuring " + constants.APP_TITLE);
        booksProvider.setIncludeVersionInAppName(true);

        console.log("at config phase all providers are ready for access:")
        console.log(dataServiceProvider.$get);
    }

    function configRoute($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/app/books/books.html",
                controller: "BooksController as vm"
            })
            .when("/addBook", {
                templateUrl: "app/books/addBook.html",
                controller: "AddBookController as vm"
            })
            .when("/editBook/:bookId", {
                templateUrl: "app/books/addBook.html",
                controller: "EditBookController as vm",
                resolve: {
                    book : ["$route","dataService", function($route, dataService){
                        var bookId = $route.current.params["bookId"];
                        return dataService.getBook(bookId);
                    }]
                }
            }).otherwise("/");
    }

    app.run(["$rootScope", "$log", handleRouteError]);

    function handleRouteError($rootScope, $log){

        $rootScope.$on("$routeChangeError", function(event, current, previous, rejection){
            $log.output("An routing error has occurred:");
            $log.output(rejection);
        });
    }
}());
