(function () {
    "use strict";

    angular.module("app").factory("dataService", dataServiceFactory);

    function dataServiceFactory(logger, $q, $timeout, $http, $cacheFactory) {

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
            reportError: reportError,
            getUserSummary: getUserSummary,
            invalidateUserSummaryCache: invalidateUserSummaryCache,
            invalidateBooksHttpCache: invalidateBooksHttpCache
        };

        function invalidateUserSummaryCache(){
            var dataCache = $cacheFactory.get("bookLoggerCache");
            if(!dataCache){
                return;
            }
            dataCache.remove("summaryData");
        }

        function invalidateBooksHttpCache(){
            var httpCache = $cacheFactory.get("$http");
            if(!httpCache){
                return;
            }
            httpCache.remove("/books");
        }

        function getUserSummary(){
            var deferred = $q.defer();

            var dataCache = $cacheFactory.get("bookLoggerCache");
            if(!dataCache){
                dataCache = $cacheFactory("bookLoggerCache");
            }
            var cachedSummary = dataCache.get("summaryData");
            if(cachedSummary) {
                deferred.resolve(cachedSummary);

            } else {
                logger.output("Calculating total minutes read...");

                $q.all([getAllBooks(), getAllReaders()]).then(function(responses){

                    var totalMinutesRead = 0;
                    for(var i=0; i<responses[1].length; i++){
                        totalMinutesRead += responses[1][i].totalMinutesRead;
                    }

                    var summaryData = {
                        bookCount : responses[0].length,
                        readerCount : responses[1].length,
                        grandTotalMinutes: totalMinutesRead
                    };

                    deferred.resolve(summaryData);
                    dataCache.put("summaryData", summaryData);
                }).catch(function(reason){
                    deferred.reject(reason);
                });
            }

            return deferred.promise;
        }

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
                deferred.notify("Please wait patiently....");
                $timeout(function(){
                    $http.get("/books", {cache:true}).then(function(result){
                        deferred.resolve(result["data"]);
                    }).catch(function(error){
                        deferred.reject(error);
                    });
                }, 500);

            }, 1000);

            return deferred.promise;
        }

        function getAllReaders(){

            logger.output("Getting all readers.");
            var deferred = $q.defer();
            $timeout(function(){
                if(getAllReadersCount++ % 15 == 14){
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

    dataServiceFactory.$inject = ["logger", "$q", "$timeout", "$http", "$cacheFactory"];
}());