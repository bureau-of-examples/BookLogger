//mocking
(function(){

    angular.module("httpMock", ["ngMockE2E"]).run(["$httpBackend", mockHttpResponses]);


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

    var nextBookId = 4;

    function mockHttpResponses($httpBackend) {

        if(!$httpBackend)
            return;

        var getRegex = new RegExp("/books/[0-9]+");
        $httpBackend.whenGET(getRegex).respond(function(method, url){

            var idIndex = url.lastIndexOf("/") + 1;
            var bookId = parseInt(url.substring(idIndex));
            for(var i=0; i< booksArray.length; i++){

                if(booksArray[i].book_id == bookId){
                    return [200, booksArray[i]];
                }
            }

            return [400, {status: "Error"}];
        });

        $httpBackend.whenGET("/books").respond(booksArray);

        $httpBackend.whenGET("/readers").respond(readersArray);

        $httpBackend.whenPOST("/books/save").respond(function(method, url, data){
            var response = {status:"Error"};
            var code = 400;
            data = angular.fromJson(data);
            if(data && data["book_id"]){
                for(var i=0; i<booksArray.length; i++) {
                    if(booksArray[i].book_id == data["book_id"]){
                        booksArray[i] = data;
                        break
                    }
                }
                response.status = "Ok";
                code = 200;
            }

            return [code,  response];
        });

        $httpBackend.whenPOST("/books/add").respond(function(method, url, data){
            var response = {status:"Error"};
            var code = 400;
            data = angular.fromJson(data);
            if(data && data["title"]){
                data.book_id = nextBookId++;
                booksArray.push(data);
                response.status = "Ok";
                code = 200;
            }

            return [code, response];
        });

        $httpBackend.whenPOST("/books/delete").respond(function(method, url, data){

            for(var i=0; i<booksArray.length; i++){
                if(booksArray[i].book_id == data){
                    booksArray.splice(i, 1);
                    return [200, {status: "Ok"}];
                }
            }

            return [400, {status: "Error"}];

        });

        $httpBackend.whenGET(/app/).passThrough();
    }
}());
