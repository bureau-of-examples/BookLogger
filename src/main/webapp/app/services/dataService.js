(function () {
    "use strict";

    angular.module("app").factory("dataService", dataServiceFactory);

    var readersArray = [
        {
            reader_id: 1,
            name: "Marie",
            weeklyReadingGoal: 315,
            totalMinutesRead: 5600
        },
        {
            reader_id: 2,
            name: "Daniel",
            weeklyReadingGoal: 210,
            totalMinutesRead: 3000
        },
        {
            reader_id: 3,
            name: "Lanier",
            weeklyReadingGoal: 140,
            totalMinutesRead: 600
        }

    ];

    function dataServiceFactory(logger, $q, $timeout, $http) {

        logger.output("Creating the dataService instance.");

        var getAllBooksCount = 0;
        var getAllReadersCount = 0;

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders,
            getBook: getBook,
            addBook: addBook,
            saveBook: saveBook,
            reportError: reportError
        };

        function reportError(obj){
            if(obj["status"]){
                alert("Generic server error.");
            } else {
                alert(obj);
            }
        }

        function getAllBooks() {

            logger.output("Getting all books.");
            var deferred = $q.defer();
            $timeout(function(){
                if(getAllBooksCount++ % 4 == 3){
                    deferred.reject("Error retrieving books.");
                } else {
                    deferred.notify("Please wait patiently....");
                    $timeout(function(){
                        $http.get("/books").then(function(result){
                            deferred.resolve(result["data"]);
                        }).catch(function(error){
                            deferred.reject(error);
                        });
                    }, 1000);
                }
            }, 1000);

            return deferred.promise;
        }

        function getAllReaders(){

            logger.output("Getting all readers.");
            var deferred = $q.defer();
            $timeout(function(){
                if(getAllReadersCount++ % 5 == 4){
                    deferred.reject("Error retrieving readers.");
                } else {
                    deferred.resolve(readersArray);
                }
            }, 1000);

            return deferred.promise;
        }

        function getBook(bookId){

            return $http.get("/books/" + bookId)
                .then(function(response){
                    return response.data;
                });
        }

        function addBook(book){

            return $http.post("/books/add", book);
        }

        function saveBook(book){
            return $http.post("/books/save", book);
        }
    }

    dataServiceFactory.$inject = ["logger", "$q", "$timeout", "$http"];
}());