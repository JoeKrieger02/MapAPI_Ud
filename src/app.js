import React from "react"
import "./main.css"
//import { Route } from "react-router-dom"
import Map from "./map.js"
//import { GoogleMap } from "react-google-maps"
import { GoogleApiWrapper } from 'react-google-maps'
//import { GoogleMapLoader } from "react-google-maps-loader"
import { BrowserRouter } from "react-router-dom"


class App extends React.Component {
   render() {
    return (




<BrowserRouter>
   <div className="app">
      <div class="title-container">
         <div class="hamburger-box">
            <button class="hamburger-button" onClick="showMenu()"><img src="img/Hamburger.svg" /> </button>
         </div>
         <div class="title-box">
            <h1> Krieger MAPS</h1>
         </div>
         <div class="search-box">
            <input id="zoom-to-area-text" type="text" placeholder=" Zoom near a location" />
            <input id="zoom-to-area" type="button" value="Search"/>
         </div>
      </div>
      <div class="container">
         <div id="options-box" style={{display: 'none'}}>
            <div>
               <p> My favorite places</p>
               <input id="show-listings" type="button" value="Show All"/>
               <input id="hide-listings" type="button" value="Hide All"/>
            </div>
            <div class='list'>
               <ol>
                  <li ><span class="toggle"><button class="show" id="l1"> SHOW </button></span> Théâtre de Liège </li>
                  <li ><span class="toggle"><button class="show" id="l2"> SHOW </button></span> Get your mug </li>
                  <li ><span class="toggle"><button class="show" id="l3"> SHOW </button></span> Cathédrale Saint-Paul </li>
                  <li ><span class="toggle"><button class="show" id="l4"> SHOW </button></span> Le Palais des Princes-Évêques </li>
                  <li ><span class="toggle"><button class="show" id="l5"> SHOW </button></span> Le Pot au Lait </li>
                  <li ><span class="toggle"><button class="show" id="l6"> SHOW </button></span> Cinéma Churchill </li>
               </ol>
            </div>
            <h2 id="krieger"> Krieger MAPS</h2>
         </div>
         <div id="map" onClick="hideMenu()"></div>
         <Map google={this.props.google}/>
      </div>
      </div>
      </BrowserRouter>


)}}

export default App
/*
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBD14b8LrFS-VzQBzSzEgSZcaq1NhCu7Do'
})(App)
*/
