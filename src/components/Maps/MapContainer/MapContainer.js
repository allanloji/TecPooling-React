import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import BookingList from "../../Driver/DriverHome/DriverBookings/BookingList/BookingList";
import PropTypes from "prop-types";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { locations: [], type: null , destiny:null, center:null, newCenter:false};
  }

  componentWillMount() {
      if(this.props.type){
          this.setState({ type: this.props.type });
      }

  }

    componentWillReceiveProps(nextProps) {

            if (nextProps.destiny !== null && nextProps.locations !==  []) {
                this.setState({ locations: nextProps.locations }, () => {
                    this.setState({ destiny: nextProps.destiny }, () => {
                        this.loadMap();
                    });
                });
            }

            if(nextProps.center !== this.state.center){
                this.setState({ center: nextProps.center }, () => {
                    this.loadMap();
                });
            }
    }


    componentDidMount() {
        if(!this.props.type){
            this.setState({ locations: this.props.locations }, () => {
                this.setState({ destiny: this.props.destiny }, () => {
                    this.loadMap();
                });
            });
        }else {
            this.setState({ destiny: this.props.destiny }, () => {
                this.loadMap();
            });
        }
    }

  loadMap() {
    if (this.props && this.props.google) {
      // checks to make sure that props have been passed
      const { google } = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      let mapConfig = null;
      if (this.state.locations.length === 0 && !this.state.center) {
        mapConfig = Object.assign(
          {},
          {
            center: { lat: 19.2839371, lng: -99.1387145 }, // sets center of google map to NYC.
            zoom: 13, // sets zoom. Lower numbers are zoomed further out.
            mapTypeId: "roadmap" // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
          }
        );
      }else if(this.state.locations.length === 0 && this.state.center){
          mapConfig = Object.assign(
              {},
              {
                  center: {
                      lat: this.state.center.latitude, lng: this.state.center.longitude
                  }, // sets center of google map to NYC.
                  zoom: 16, // sets zoom. Lower numbers are zoomed further out.
                  mapTypeId: "roadmap" // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
              }
          );
      } else if(this.state.center){
        //--- Check of center is null--->
        mapConfig = Object.assign(
          {},
          {
            center: {
              lat: this.state.center.latitude,
              lng: this.state.center.longitude
            }, // sets center of google map to NYC.
            zoom: 16, // sets zoom. Lower numbers are zoomed further out.
            mapTypeId: "roadmap" // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
          }
        );
      }

      this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.

        if(this.state.destiny){
            const destiny = new google.maps.Marker({
                // creates a new Google maps Marker object.
                position: { lat: this.state.destiny.latitude, lng: this.state.destiny.longitude }, // sets position of marker to specified location
                map: this.map, // sets markers to appear on the map we just created on line 35
                title: "Destino", // the title of the marker is set to the name of the location
                icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            });
        }

        if(this.state.locations !== []){
            this.state.locations.forEach(location => {
                // iterate through locations saved in state
                const marker = new google.maps.Marker({
                    // creates a new Google maps Marker object.
                    position: { lat: location.latitude, lng: location.longitude }, // sets position of marker to specified location
                    map: this.map, // sets markers to appear on the map we just created on line 35
                    title: location.owner.firstName + " " + location.owner.lastName // the title of the marker is set to the name of the location
                });
            });
        }
    }
  }

  render() {
    let style = {
      width: "100%", // 90vw basically means take up 90% of the width screen. px also works.
      height: "550px"
    };

    if (this.props.type === "calendarRegister") {
      style = {
        // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
        width: "100%", // 90vw basically means take up 90% of the width screen. px also works.
        height: "200px" // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
      };
    }

    return (
      // in our return function you must return a div with ref='map' and style.
      <div ref="map" style={style}>
        loading map...
      </div>
    );
  }
}

MapContainer.propTypes = {
    type: PropTypes.string,
    locations: PropTypes.arrayOf(PropTypes.object),
    desiny: PropTypes.object,
    center: PropTypes.object,
    google: PropTypes.object

};

MapContainer.defaultProps = {
    type: "[type]",
    locations: [],
    desiny: {lat:0.0, long:0.0},
    center: {lat:0.0, long:0.0},
    google: []
};

export default MapContainer;
