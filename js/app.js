var map;


      var markers = [];





      var placeMarkers = [];

      function initMap() {

        var styles = [
          {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e0efef"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#1900ff"
            },
            {
                "color": "#c0e8e8"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 700
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#7dcdcd"
            }
        ]
    }

        ];


        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 50.585499, lng: 5.988555},
          zoom: 12,
          styles: styles,
          mapTypeControl: false
        });


        var zoomAutocomplete = new google.maps.places.Autocomplete(
            document.getElementById('zoom-to-area-text'));

        zoomAutocomplete.bindTo('bounds', map);

        var searchBox = new google.maps.places.SearchBox(
            document.getElementById('places-search'));

        searchBox.setBounds(map.getBounds());


        var locations = [
          {title: 'Lac de la Gileppe', location: {lat: 50.589357, lng: 5.974609}},
          {title: 'Parc naturel Hautes Fagnes - Eifel', location: {lat: 50.569816, lng: 6.091064}},
          {title: 'Cimetière américain de Henri-Chapelle', location: {lat: 50.697335, lng: 5.900831}},
          {title: 'Lac de Robertvile', location: {lat: 50.447490, lng: 6.122903}},
          {title: 'Wesertalsperre', location: {lat: 50.6189468, lng: 6.0908503}},
          {title: 'A plane near Spa aerodrome', location: {lat: 50.4792976, lng: 5.9067213}}
        ];

        var largeInfowindow = new google.maps.InfoWindow();

        var defaultIcon = makeMarkerIcon('0091ff');


        var highlightedIcon = makeMarkerIcon('FFFF24');

        for (var i = 0; i < locations.length; i++) {

          var position = locations[i].location;
          var title = locations[i].title;

          var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i
          });

          markers.push(marker);

          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });

          marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
          });
          marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
          });
        }

        document.getElementById('show-listings').addEventListener('click', showListings);

        document.getElementById('hide-listings').addEventListener('click', function() {
          hideMarkers(markers);
        });

        document.getElementById('zoom-to-area').addEventListener('click', function() {
          zoomToArea();
        });


        searchBox.addListener('places_changed', function() {
          searchBoxPlaces(this);
        });

        //TEST
        var l1Active = false;

             document.getElementById('l1').addEventListener('click', showOne);
              function showOne() {
                if (!l1Active) {
                var oldMarkers = markers;
                markers = [];


                console.log("into click");
                for (var i = 0; i < 1; i++) {
                  console.log("into loop");
                  var position = locations[i].location;
                  var title = locations[i].title;

                  var marker = new google.maps.Marker({

                    position: position,
                    title: title,
                    animation: google.maps.Animation.DROP,
                    icon: defaultIcon,
                    id: i
                  });

                  markers.push(marker);
                  console.log("after marker");

              }
              showListings();
              markers = oldMarkers;
              l1Active = true;
            } else {
              markers[1].setMap(null);
              l1Active = false;
            }
            }
        //TEST

      }


      function populateInfoWindow(marker, infowindow) {

        if (infowindow.marker != marker) {

          infowindow.setContent('');
          infowindow.marker = marker;

          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });


          var streetViewService = new google.maps.StreetViewService();
          var radius = 50;

          function getStreetView(data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
              var nearStreetViewLocation = data.location.latLng;
              var heading = google.maps.geometry.spherical.computeHeading(
                nearStreetViewLocation, marker.position);
                infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
                var panoramaOptions = {
                  position: nearStreetViewLocation,
                  pov: {
                    heading: heading,
                    pitch: 20
                  }
                };
              var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('pano'), panoramaOptions);
            } else {
              infowindow.setContent('<div>' + marker.title + '</div>' +
                '<div>No Street View Found</div>');
            }
          }

          streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);

          infowindow.open(map, marker);
        }
      }

      function showListings() {
        var bounds = new google.maps.LatLngBounds();
        console.log("into listings");
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
      }


      function hideMarkers(markers) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
      }


      function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }


      function zoomToArea() {

        var geocoder = new google.maps.Geocoder();

        var address = document.getElementById('zoom-to-area-text').value;

        if (address == '') {
          window.alert('You must enter an area, or address.');
        } else {

          geocoder.geocode(
            { address: address,
              componentRestrictions: {locality: 'New York'}
            }, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                map.setZoom(15);
              } else {
                window.alert('We could not find that location - try entering a more' +
                    ' specific place.');
              }
            });
          }
        }
