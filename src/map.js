import React from "react"


class Map extends React.Component {

// Google MAPS With Foursquare API Integration

// Initializing variables
state = {
   map : [],
   markers : [],
   currentMarkers : [],
   placeMarkers : [],

}

componentDidMount(){
this.initMap()
}

initMap() {

  // Map styling from SnazzyMaps ( https://snazzymaps.com/style/61/blue-essence )
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

  const {google}= this.props
  // Initialize map to be opened on the city of Liege
  this.map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 50.632885, lng: 5.579185 },
    maxZoom: 18,
    zoom: 14,
    styles: styles,
    mapTypeControl: false
  })

  // Autocomplete the text input field with Google recommendations
  var zoomAutocomplete = new google.maps.places.Autocomplete(
    document.getElementById("zoom-to-area-text")
  )
  // Automatically zooms into the searched location
  zoomAutocomplete.bindTo("bounds", this.map)

  // My favorite location data (to be used with Foursquare and Google Maps)
  var locations = [
    {
      title: "Théâtre de Liège",
      location: { lat: 50.6405905, lng: 5.5747113 },
      venueId: "52307eec11d20269e1c41015"
    },
    {
      title: "Get your mug",
      location: { lat: 50.639573, lng: 5.573682 },
      venueId: "539d9ad6498ef1b1c9cfa042"
    },
    {
      title: "Cathédrale Saint-Paul",
      location: { lat: 50.6404139, lng: 5.5715023 },
      venueId: "50390d3fe4b092ff12bc9860"
    },
    {
      title: "Le Palais des Princes-Évêques",
      location: { lat: 50.645729, lng: 5.5729943 },
      venueId: "4c6d7005d5c3a1cd4b77c52b"
    },
    {
      title: "Le Pot au Lait",
      location: { lat: 50.6404783, lng: 5.5733067 },
      venueId: "4b981cbcf964a520382d35e3"
    },
    {
      title: "Cinéma Churchill",
      location: { lat: 50.6411672, lng: 5.5703101 },
      venueId: "4b9bb361f964a520831b36e3"
    }
  ]

  // Creating a variable for the information window
  var largeInfowindow = new google.maps.InfoWindow()

  // Choosing the icon design
  var defaultIcon =this.makeMarkerIcon("0091ff")
  // Choosing the icon desing when hover
  var highlightedIcon = this.makeMarkerIcon("FFFF24")

  // Creates an array of maakers with my locations
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
    // test
    var {markers} = this.state
    markers.push(marker)

    marker.addListener("click", function() {
      this.populateInfoWindow(this, largeInfowindow)
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
    .addEventListener("click", this.showListings)

  document
    .getElementById("hide-listings")
    .addEventListener("click", function() {
      this.hideMarkers(markers, this.currentMarkers)
    })

  document.getElementById("zoom-to-area").addEventListener("click", function() {
    this.zoomToArea()
  })

  // EventListener for each of my locations
  document.getElementById("l1").addEventListener("click", showOne)
  document.getElementById("l2").addEventListener("click", showOne)
  document.getElementById("l3").addEventListener("click", showOne)
  document.getElementById("l4").addEventListener("click", showOne)
  document.getElementById("l5").addEventListener("click", showOne)
  document.getElementById("l6").addEventListener("click", showOne)

  // Binds the ElementId with its correct index in the markers array
  function showOne(event) {
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

    // simple solution to make the loop end
    var end = index + 1
    // creates a backup array with all markers
    var oldMarkers = markers
    // Empty the array
    markers = []

    // put the specific location informations into a marker and then push it into the array
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
      index++
      document.getElementById(event.target.id).style.display = "none"
    }
    // fit the map to the new location
    var bounds = new google.maps.LatLngBounds()
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(this.map)
      bounds.extend(markers[i].position)
    }
    this.map.fitBounds(bounds)

    // push every markers in the second array
    for (var i = 0; i < markers.length; i++) {
      this.currentMarkers.push(markers[i])
    }

    marker.addListener("click", function() {
      this.populateInfoWindow(this, largeInfowindow)
    })

    marker.addListener("mouseover", function() {
      this.setIcon(highlightedIcon)
    })
    marker.addListener("mouseout", function() {
      this.setIcon(defaultIcon)
    })

    // set markers to its original state
    markers = oldMarkers

  }
}
// html functions
 showMenu(){

  var x = document.getElementById("options-box");
  var y = document.getElementById("map");
  if(x.style.display === "none") {
    x.style.display = "inline-block";
  } else {
    x.style.display = "none";
  }
}

 hideMenu(){

  var x = document.getElementById("options-box");

  if(x.style.display === "inline-block") {
    x.style.display = "none";
  }
}
// html functions end
// Fills the info window with current markers data
 populateInfoWindow(marker, infowindow) {
  if (infowindow.marker != marker) {
    infowindow.setContent("")
    infowindow.marker = marker

    infowindow.addListener("closeclick", function() {
      infowindow.marker = null
    })

    // Foursquare API : starting by getting the current markers data
    var getFoursquare = (marker) => {
      //Initializing a default blank venueId
      let venueId = ""

      // If the current marker title is in my location list then assing venueId to it's ID
      console.log(marker.title)
      if (marker.title == "Get your mug") {
        venueId = "539d9ad6498ef1b1c9cfa042"
      } else if (marker.title == "Théâtre de Liège") {
        venueId = "52307eec11d20269e1c41015"
      } else if (marker.title == "Cathédrale Saint-Paul") {
        venueId = "50390d3fe4b092ff12bc9860"
      } else if (marker.title == "Le Palais des Princes-Évêques") {
        venueId = "4c6d7005d5c3a1cd4b77c52b"
      } else if (marker.title == "Le Pot au Lait") {
        venueId = "4b981cbcf964a520382d35e3"
      } else if (marker.title == "Cinéma Churchill") {
        venueId = "4b9bb361f964a520831b36e3"
      }

      // ID needed by the API
      const clientId = "M0CDRTVNVTZVZPB1WT1L52GHH11CA5QEBWVVQQ5MDLTOXUI5"
      const clientSecret = "ULD1LIH14YO02PRHXC4GLHF0NZ1YOHQGI2E2X0N2LSSZHC2F"

      // url to call the API with the location ID and API ID
      const url =
        "https://api.foursquare.com/v2/venues/" +
        venueId +
        "?&client_id=" +
        clientId +
        "&client_secret=" +
        clientSecret +
        "&v=20180802"

      // this function is from Udacity Neighborhood Map Chat with student Mason W. and mentor Manish B.
      // it fetches the repsonse and uses the data to print it into the info window
      fetch(url)
        .then(function(response) {
          if (response.status !== 200) {
            infowindow.setContent("Data failed to load")
            return
          }

          response.json().then(function(data) {
            let name_data = data.response.venue.name
            let location_data = data.response.venue.location.formattedAddress
            let contact_data = data.response.venue.contact.formattedPhone
            let url_data = data.response.venue.url
            let rating_data = data.response.venue.rating

            let name = "<b>" + name_data + "</b>" + "<br>"
            let address = "<b>Address: </b>" + location_data + "<br>"
            let phone = "<b>Phone: </b>" + contact_data + "<br>"
            let site = "<b>Website: </b>" + url_data + "<br>"
            let rating = "<b>Rating: </b>" + rating_data + "<br>"
            let more =
              '<a href="https://foursquare.com/v/' +
              data.response.venue.id +
              '" target="_blank">Read More on Foursquare Website</a>'

            infowindow.setContent(name + address + phone + site + rating + more)
          })
        })

        .catch(function(error) {
          infowindow.setContent("Data failed to load")
        })
    }

    infowindow.marker = marker
    this.getFoursquare(marker)

    infowindow.open(this.map, marker)
  }
}
// END of Foursquare API

// function to show all the locations at once and fit the map accordingly
 showListings() {
   const {google} = this.props
   const {markers} = this.state
  var bounds = new google.maps.LatLngBounds()

  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(this.map)
    bounds.extend(markers[i].position)
  }
  this.map.fitBounds(bounds)
}

// function to hide all markers
 hideMarkers(markers, currentMarkers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null)
  }
  for (var i = 0; i < currentMarkers.length; i++) {
    currentMarkers[i].setMap(null)
  }
  for (var i = 1; i < 7; i++) {
    document.getElementById("l" + i).style.display = "inline-block"
  }
}

// function to change marker icon
 makeMarkerIcon(markerColor) {
   const {google} = this.props
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

// function to zoom into searched area

 zoomToArea() {
   const {google} = this.props
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
          this.map.setCenter(results[0].geometry.location)
          this.map.setZoom(15)
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



}
export default Map
