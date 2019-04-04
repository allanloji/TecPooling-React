import React, { Component } from 'react'
import './UserRoute.css'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RouteInfo from '../RouteInfo/RouteInfo'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { DirectionsCar } from '@material-ui/icons'
import { MapContainer } from '../../Maps/MapContainer/MapContainer'
import { GoogleApiWrapper } from 'google-maps-react'
import Autocomplete from '../../Maps/Autocomplete/Autocomplete'
import axios from 'axios'

class UserRoute extends Component {
  constructor(props) {
    super(props)
    this.state = { locations: [], user: null, destiny: null, center: null }
    this.seePoints = this.seePoints.bind(this)
    this.seeDestiny = this.seeDestiny.bind(this)
    this.setCenter = this.setCenter.bind(this)
    this.resetCenter = this.resetCenter.bind(this)
  }

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem('user'))
    this.setState({ user })
    /*let locations = [
            { name: "New York County Supreme Court", location: {lat: 19.384921, lng: -99.076734}}
            ];
        this.setState(locations);*/
  }

  componentDidMount() {}

  seePoints(points) {
    let api = JSON.parse(localStorage.getItem('api'))
    axios.get(api.api + '/v1/schedules/lat/' + points.lat + '/lon/' + points.lng).then(res => {
      this.setState({ locations: res.data })
    })
    /*let locations = [
            { name: "New York County Supreme Court", location: {lat: 19.384921, lng: -99.076734}}
        ];
        this.setState(locations);*/
  }

  seeDestiny(points) {
    let destiny = { latitude: points.location.lat, longitude: points.location.lng }
    console.log('El destino' + destiny.latitude + ' lon ' + destiny.longitude)
    this.setState({ destiny })
    this.setState({ center: destiny })
  }

  setCenter(points) {
    let center = points
    this.setState({ center })
  }

  resetCenter() {
    this.setState({ center: this.state.destiny })
  }

  render() {
    return (
      <Card className="userRouteCard">
        <CardTitle className="userRouteTitle">
          <DirectionsCar color="#FFF" /> Buscar Rutas
        </CardTitle>
        <CardText>
          <div className="routeMap">
            <div className="userRouteAutocomplete">
              <Autocomplete seePoints={this.seePoints} seeDestiny={this.seeDestiny} />
            </div>

            <MapContainer
              google={this.props.google}
              locations={this.state.locations}
              destiny={this.state.destiny}
              center={this.state.center}
            />
          </div>
          <div className="routeInfoContainer">
            <RouteInfo
              resetCenter={this.resetCenter}
              setCenter={this.setCenter}
              nearDrivers={this.state.locations}
              updateReservations={this.props.updateReservations}
            />
          </div>
        </CardText>
        <CardActions />
      </Card>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB9DhM7c87_HNYsY9a6kKvN8EKALqCc6r8'
})(UserRoute)
