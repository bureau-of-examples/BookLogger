(function(){
    "use strict";

    angular.module("app").value("badgeService", {
        retrieveBadge : retrieveBadge
    });

    function retrieveBadge(minutesread){
        var badge = null;
        if(minutesread > 5000){
            badge = "Book Worm";
        } else if(minutesread > 2500){
            badge = "Page Turner";
        } else {
            badge = "Getting Started";
        }
        return badge;
    }

}());