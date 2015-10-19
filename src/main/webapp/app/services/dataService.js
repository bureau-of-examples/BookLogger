(function () {
    "use strict";

    angular.module("app").factory("dataService", dataServiceFactory);

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
            deleteBook: deleteBook,
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
                    $http.get("/readers", {
                        transformResponse : function(data, headers){
                            var result = angular.fromJson(data);
                            for(var i=0; i<result.length; i++){
                                result[i].dateDownloaded = new Date();
                            }
                            return result;
                        }
                    }).then(function(result){
                        deferred.resolve(result["data"]);
                    }).catch(function(error){
                        deferred.reject(error);
                    });
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
            return $http.post("/books/add", book, {
                transformRequest: function(data, headers){
                    data.dateUploaded = new Date();
                    return angular.toJson(data);
                }
            });
        }

        function saveBook(book){
            return $http.post("/books/save", book);
        }

        function deleteBook(bookId) {
            return $http.post("/books/delete", bookId);
        }
    }

    dataServiceFactory.$inject = ["logger", "$q", "$timeout", "$http"];
}());