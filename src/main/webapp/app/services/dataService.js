(function () {
    "use strict";

    angular.module("app").factory("dataService", dataServiceFactory);

    var booksArray = [
        {
            book_id: 1,
            title: "Harry Potter and the Deathly Hallows",
            author: "J.K Rowling",
            year_published: 2000
        },
        {
            book_id: 2,
            title: "The Cat in the Hat",
            author: "Dr. Seuss",
            year_published: 1957
        },
        {
            book_id: 3,
            title: "Encyclopedia Brown, Boy Detective",
            author: "Donald J. Sobol",
            year_published: 1963
        }
    ];

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

    function dataServiceFactory(logger, $q, $timeout) {

        logger.output("Creating the dataService instance.");

        var getAllBooksCount = 0;

        return {
            getAllBooks: getAllBooks,
            getAllReaders: getAllReaders
        };

        function getAllBooks() {

            logger.output("Getting all books.");
            var deferred = $q.defer();
            $timeout(function(){
                if(getAllBooksCount % 4 == 3){
                    deferred.reject("Error retrieving books.");
                } else {
                    deferred.notify("Please wait patiently....");
                    $timeout(function(){
                        deferred.resolve(booksArray);
                    }, 1000);
                }
                getAllBooksCount++;
            }, 1000);

            return deferred.promise;
        }

        function getAllReaders(){

            logger.output("Getting all readers.");
            var deferred = $q.defer();
            $timeout(function(){
                deferred.resolve(readersArray);
            }, 1000);

            return deferred.promise;
        }
    }

    dataServiceFactory.$inject = ["logger", "$q", "$timeout"];
}());