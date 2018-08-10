import React from "react"
import "./main.css"
import Map from "./map.js"
import { GoogleApiWrapper } from 'google-maps-react'



class App extends React.Component {
   render() {
    return (
      <div>
        <Map google={this.props.google}/>
      </div>

)}}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBD14b8LrFS-VzQBzSzEgSZcaq1NhCu7Do'
})(App)
