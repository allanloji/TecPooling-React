import React, { Component } from 'react'
import './History.css'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import PastTripList from '../PastTripList'
import { Book } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import BookingList from "../../Driver/DriverHome/DriverBookings/BookingList/BookingList";
import PropTypes from "prop-types";

class History extends Component {
  constructor(props) {
    super(props)
    this.state = { pastTrips: [], user: null }
  }

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem('user'))
    this.setState({ user })
    let api = JSON.parse(localStorage.getItem('api'))
    //this.setState({pastTrips: null});
    axios.get(api.api + '/v1/users/' + user.uuid + '/bookings/history').then(res => {
      this.setState({ pastTrips: res.data })
    })
  }

  renderHistory() {
    if (this.state.pastTrips.length !== 0) {
      return <PastTripList pastTrips={this.state.pastTrips} />
    } else {
      return <p className="emptyHistory">No has realizado un viaje</p>
    }
  }

  render() {
    const style = {
      textDecoration: 'none'
    }
    return (
      <Card className="userHistoryCard">
        <Link to={'/historyDetail/' + this.state.user.uuid} style={style}>
          <CardTitle className="userHistoryTitle">
            <Book color="#fff" /> Historial de viajes
          </CardTitle>
        </Link>
        <CardText>{this.renderHistory()}</CardText>
        <CardActions />
      </Card>
    )
  }
}

History.propTypes = {
};

History.defaultProps = {
};

export default History
