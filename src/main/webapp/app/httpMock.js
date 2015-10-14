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

    function mockHttpResponses($httpBackend) {

        if(!$httpBackend)
            return;

        $httpBackend.whenGET("/books").respond(booksArray);

        $httpBackend.whenPOST("book/save").respond(function(method, url, data){
            var response = {status:"Error"};
            if(data && data["title"]){
                booksArray.push(data);
                response.status = "Ok";
            }

            return response;
        });

        $httpBackend.whenGET(/app/).passThrough();
    }
}());
