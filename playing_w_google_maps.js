var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map; 
var service = new google.maps.DistanceMatrixService();


function findDistances() {
    var a = document.getElementById('a').value;
    var b = document.getElementById('b').value;
    var c = document.getElementById('c').value;
    var d = document.getElementById('d').value;

    var waypoints = {
        a: {location: a},
        b: {location: b},
        c: {location: c},
        d: {location: d}
    }

    service.getDistanceMatrix(
    {
        origins: [a, b, c, d],
        destinations: [a, b, c, d],
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
            // pick which route is shorter and then find directions and show them 
            if (routeOne < routeTwo) {
                 var request = {
                    origin:a,
                    destination:b,
                    travelMode: google.maps.TravelMode.DRIVING,
                    waypoints: [waypoints.c, waypoints.d]
                };
                directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response); 
                }});
            } else {
                var request = {
                    origin:c,
                    destination:d,
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

