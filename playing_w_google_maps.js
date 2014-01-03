var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map; 

var stops = {
    a: new google.maps.LatLng(37.7800, -122.4150),
    b: new google.maps.LatLng(37.7850, -122.4200),
    c: new google.maps.LatLng(37.7900, -122.4100),
    d: new google.maps.LatLng(37.7950, -122.4050)
}

var service = new google.maps.DistanceMatrixService();


function findDistances() {
    service.getDistanceMatrix(
    {
        origins: [stops.a, stops.b, stops.c, stops.d],
        destinations: [stops.a, stops.b, stops.c, stops.d],
        travelMode: google.maps.TravelMode.DRIVING,
        avoidHighways: false,
        avoidTolls: false
    }, function(response, status){
        if (status == google.maps.DistanceMatrixStatus.OK) {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;
            var distAB = response.rows[0].elements[1].distance.value;
            var distAC = response.rows[0].elements[2].distance.value;
            var distCD = response.rows[2].elements[3].distance.value;
            var distDB = response.rows[3].elements[1].distance.value;
            var distCA = response.rows[2].elements[0].distance.value;
            var distBD = response.rows[1].elements[3].distance.value;
            var routeOne = (distAC + distCD + distDB ) - distAB;
            var routeTwo = (distCA + distAB + distBD ) - distCD; 
            console.log(routeOne);
            console.log(routeTwo);
            // pick which route is shorter and then find directions and show them 
            if (routeOne < routeTwo) {
                 var request = {
                    origin:stops.a,
                    destination:stops.b,
                    travelMode: google.maps.TravelMode.DRIVING,
                    waypoints: [waypoints.c, waypoints.d]
                };
                directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response); 
                }});
            } else {
                var request = {
                    origin:stops.c,
                    destination:stops.d,
                    travelMode: google.maps.TravelMode.DRIVING,
                    waypoints: [waypoints.a, waypoints.b]
                };
                directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response); 
                }});
            }

    }

    });
}

var waypoints = {
    a: {location: stops.a},
    b: {location: stops.b},
    c: {location: stops.c},
    d: {location: stops.d}
}

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var sanFrancisco = new google.maps.LatLng(37.7833, -122.4167);
    var mapOptions = {
        zoom:7,
        center: sanFrancisco
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
}

    

google.maps.event.addDomListener(window, 'load', initialize);

// findDistances();

//calcRoute(responseHandler);

// a - b - (a - c + c - d  + d - b)

// c - d - (c - a + a - b + b  - d)