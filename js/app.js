var map

var markers = [];

//var polygon = null;

var currentMarkers = []
var placeMarkers = []

function initMap() {
  var styles = [
    {
      featureType: "landscape.natural",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on"
        },
        {
          color: "#e0efef"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "on"
        },
        {
          hue: "#1900ff"
        },
        {
          color: "#c0e8e8"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          lightness: 100
        },
        {
          visibility: "simplified"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on"
        },
        {
          lightness: 700
        }
      ]
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [
        {
          color: "#7dcdcd"
        }
      ]
    }
  ]

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 50.632885, lng: 5.579185 },
    maxZoom: 18,
    zoom: 14,
    styles: styles,
    mapTypeControl: false
  })

  var zoomAutocomplete = new google.maps.places.Autocomplete(
    document.getElementById("zoom-to-area-text")
  )

  zoomAutocomplete.bindTo("bounds", map)

  var locations = [
    { title: "Théâtre de Liège", location: { lat: 50.6405905, lng: 5.5747113 } },
    { title: "Get your mug", location: { lat: 50.639573, lng: 5.573682 }},
    { title: "Cathédrale Saint-Paul", location: { lat: 50.6404139, lng: 5.5715023 }},
    { title: "Le Palais des Princes-Évêques", location: { lat: 50.645729, lng: 5.5729943 } },
    { title: "Le Pot au Lait", location: { lat: 50.6404783, lng: 5.5733067 } },
    { title: "Cinéma Churchill", location: { lat: 50.6411672, lng: 5.5703101 } }
  ]

  var largeInfowindow = new google.maps.InfoWindow()

  var defaultIcon = makeMarkerIcon("0091ff")

  var highlightedIcon = makeMarkerIcon("FFFF24")

  for (var i = 0; i < locations.length; i++) {
    var position = locations[i].location
    var title = locations[i].title

    var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: i
    })

    markers.push(marker)

    marker.addListener("click", function() {
      populateInfoWindow(this, largeInfowindow)
    })

    marker.addListener("mouseover", function() {
      this.setIcon(highlightedIcon)
    })
    marker.addListener("mouseout", function() {
      this.setIcon(defaultIcon)
    })
  }

  document
    .getElementById("show-listings")
    .addEventListener("click", showListings)

  document
    .getElementById("hide-listings")
    .addEventListener("click", function() {
      hideMarkers(markers, currentMarkers)
    })

  document.getElementById("zoom-to-area").addEventListener("click", function() {
    zoomToArea()
  })

  //TEST

  //var one = 1;
  document.getElementById("l1").addEventListener("click", showOne)
  document.getElementById("l2").addEventListener("click", showOne)
  document.getElementById("l3").addEventListener("click", showOne)
  document.getElementById("l4").addEventListener("click", showOne)
  document.getElementById("l5").addEventListener("click", showOne)
  document.getElementById("l6").addEventListener("click", showOne)

  function showOne() {

    if (event.target.id === "l1") {
      var index = 0
    } else if (event.target.id === "l2") {
      var index = 1
    } else if (event.target.id === "l3") {
      var index = 2
    } else if (event.target.id === "l4") {
      var index = 3
    } else if (event.target.id === "l5") {
      var index = 4
    } else if (event.target.id === "l6") {
      var index = 5
    }

    var end = index + 1
    var oldMarkers = markers
    markers = []

    while (index < end) {
      var position = locations[index].location
      var title = locations[index].title

      var marker = new google.maps.Marker({
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon,
        id: i
      })
      markers.push(marker)
      //currentMarkers.push(markers);
      index++
      //document.getElementById(event.target.id).removeEventListener("click", showOne);
      document.getElementById(event.target.id).style.display = "none";
    }
    //showListings();
    var bounds = new google.maps.LatLngBounds()

    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map)
      bounds.extend(markers[i].position)
    }
    // Don't zoom in too far on only one marker from StackOverflow (https://stackoverflow.com/questions/3334729/google-maps-v3-fitbounds-zoom-too-close-for-single-marker)
/*
    if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
      var extendPoint1 = new google.maps.LatLng(
        bounds.getNorthEast().lat() + 0.01,
        bounds.getNorthEast().lng() + 0.01
      )
      var extendPoint2 = new google.maps.LatLng(
        bounds.getNorthEast().lat() - 0.01,
        bounds.getNorthEast().lng() - 0.01
      )
      bounds.extend(extendPoint1)
      bounds.extend(extendPoint2)
    }
    */
    map.fitBounds(bounds)
    //
    //currentMarkers.push(oldMarkers);
    //currentMarkers.push(markers);
    for (var i = 0; i < markers.length; i++) {
      currentMarkers.push(markers[i])
    }
    //currentMarkers = markers;
    markers = oldMarkers

    l1Active = true
  }

  //TEST
}

function populateInfoWindow(marker, infowindow) {
  if (infowindow.marker != marker) {
    infowindow.setContent("")
    infowindow.marker = marker

    infowindow.addListener("closeclick", function() {
      infowindow.marker = null
    })

    var streetViewService = new google.maps.StreetViewService()
    var radius = 50

    function getStreetView(data, status) {
      if (status == google.maps.StreetViewStatus.OK) {
        var nearStreetViewLocation = data.location.latLng
        var heading = google.maps.geometry.spherical.computeHeading(
          nearStreetViewLocation,
          marker.position
        )
        infowindow.setContent(
          "<div>" + marker.title + '</div><div id="pano"></div>'
        )
        var panoramaOptions = {
          position: nearStreetViewLocation,
          pov: {
            heading: heading,
            pitch: 20
          }
        }
        var panorama = new google.maps.StreetViewPanorama(
          document.getElementById("pano"),
          panoramaOptions
        )
      } else {
        infowindow.setContent(
          "<div>" + marker.title + "</div>" + "<div>No Street View Found</div>"
        )
      }
    }

    streetViewService.getPanoramaByLocation(
      marker.position,
      radius,
      getStreetView
    )

    infowindow.open(map, marker)
  }
}

function showListings() {
  var bounds = new google.maps.LatLngBounds()

  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map)
    bounds.extend(markers[i].position)
  }
  map.fitBounds(bounds)
}

function hideMarkers(markers, currentMarkers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null)
  }
  for (var i = 0; i < currentMarkers.length; i++) {
    currentMarkers[i].setMap(null)
  }
  for (var i=1; i< 7;i++){
    //document.getElementById("l"+i).addEventListener("click", showOne);
    document.getElementById("l"+i).style.display = "inline-block";
  }
}

function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    "http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|" +
      markerColor +
      "|40|_|%E2%80%A2",
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21, 34)
  )
  return markerImage
}

function zoomToArea() {
  var geocoder = new google.maps.Geocoder()

  var address = document.getElementById("zoom-to-area-text").value

  if (address == "") {
    window.alert("You must enter an area, or address.")
  } else {
    geocoder.geocode(
      {
        address: address,
        componentRestrictions: { locality: "New York" }
      },
      function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location)
          map.setZoom(15)
        } else {
          window.alert(
            "We could not find that location - try entering a more" +
              " specific place."
          )
        }
      }
    )
  }
}
