import React, { Component } from "react";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import "./Autocomplete.css";
import Divider from "material-ui/Divider";
import Request from "../../Driver/DriverHome/DriverRequests/Request/Request";
import PropTypes from "prop-types";

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        let points = { name: address, location: latLng };
        this.props.seeDestiny(points);
        if(this.props.seePoints){
            this.props.seePoints(latLng);
        }
      })
      .catch(error => console.error("Error", error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Buscar Lugares...",
                className: "location-search-input inputSearchLocation"
              })}
            />
            <div className="autocomplete-dropdown-container dropdownAutocomplete">
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? {
                      backgroundColor: "#fafafa",
                      cursor: "pointer",
                      padding: "5px"
                    }
                  : {
                      backgroundColor: "#ffffff",
                      cursor: "pointer",
                      padding: "5px"
                    };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                    <Divider />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

Autocomplete.propTypes = {
    seeDestiny: PropTypes.func,
    seePoints: PropTypes.func
}

Autocomplete.defaultProps = {
    seeDestiny: () => console.log("Se espera funcion"),
    seePoints: () => console.log("Se espera funcion")
}

export default Autocomplete;
