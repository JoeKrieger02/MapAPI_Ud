import React from "react"
import "./src/css/main.css"
import { Route } from "react-router-dom"
import App from "./App.js"
import { BrowserRouter } from "react-router-dom"

class Main extends React.Component {
/* <!DOCTYPE html>
<html>
   <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="css/main.css">
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet">
      <script src="js/app.js"></script>
   </head>
   <body> */
   render() {
    return (
      <BrowserRouter>
   <div className="app">
      <div class="title-container">
         <div class="hamburger-box">
            <button class="hamburger-button" onClick="showMenu()"><img src="img/Hamburger.svg" /> </button>
         </div>
         <script>
            function showMenu(){

              var x = document.getElementById("options-box");
              var y = document.getElementById("map");
              if(x.style.display === "none") {
                x.style.display = "inline-block";
              } else {
                x.style.display = "none";
              }
            }

            function hideMenu(){

              var x = document.getElementById("options-box");

              if(x.style.display === "inline-block") {
                x.style.display = "none";
              }
            }
         </script>
         <div class="title-box">
            <h1> Krieger MAPS</h1>
         </div>
         <div class="search-box">
            <input id="zoom-to-area-text" type="text" placeholder=" Zoom near a location" >
            <input id="zoom-to-area" type="button" value="Search">
         </div>
      </div>
      <div class="container">
         <div id="options-box" style="display: none;">
            <div>
               <p> My favorite places</p>
               <input id="show-listings" type="button" value="Show All">
               <input id="hide-listings" type="button" value="Hide All">
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
      </div>
      </div>
      </BrowserRouter>
      <script async defer
         src=
         "https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=AIzaSyBD14b8LrFS-VzQBzSzEgSZcaq1NhCu7Do&v=3&callback=initMap"></script>
   </body>
</html>

}
export default Main