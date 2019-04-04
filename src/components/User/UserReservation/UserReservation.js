import React, { Component } from 'react'
import './UserReservation.css'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import ReservationList from '../ReservationList/ReservationList'
import { Message } from '@material-ui/icons'
import BookingList from '../BookingList/BookingList'
import axios from 'axios'
import { AssignmentTurnedIn } from '@material-ui/icons'
import { Announcement } from '@material-ui/icons'

class UserReservation extends Component {
  constructor(props) {
    super(props)
    this.state = { reservations: [], bookings: [], user: null }
    this.changeReservations = this.changeReservations.bind(this)
  }

  componentWillMount() {
    let user = JSON.parse(localStorage.getItem('user'))
    let api = JSON.parse(localStorage.getItem('api'))
    this.setState({ user }, () => {
      axios.get(api.api + '/v1/users/' + this.state.user.uuid + '/bookings/passenger').then(res => {
        this.setState({ bookings: res.data })
      })
      this.setState({reservations: this.props.reservations});
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.reservations !== this.state.reservations){
      this.setState({reservations:nextProps.reservations}, () => {
        this.renderReservations();
      })
    }
  }

  renderReservations() {
    if (this.state.reservations.length !== 0) {
      return (
        <ReservationList
          reservations={this.state.reservations}
          changeReservations={this.changeReservations}
        />
      )
    } else {
      return (
        <div>
          <p>
            <Announcement /> Peticiones
          </p>
          <p>No has realizado ninguna reservacion</p>
        </div>
      )
    }
  }

  renderBookings() {
    if (this.state.bookings.length !== 0) {
      return <BookingList bookings={this.state.bookings} />
    } else {
      return (
        <div>
          <p>
            <AssignmentTurnedIn /> Confirmacion
          </p>
          <p>No se ha confirmado ninguna reservacion</p>
        </div>
      )
    }
  }

  changeReservations() {
    let api = JSON.parse(localStorage.getItem('api'))
    axios.get(api.api + '/v1/users/' + this.state.user.uuid + '/requests/passenger').then(res => {
      this.setState({ reservations: res.data })
    })
  }

  render() {
    return (
      <Card className="userReservationCard">
        <CardTitle className="userReservationTitle">
          <Message color="#fff" /> Estado Actual
        </CardTitle>
        <CardText>
          {this.renderBookings()}
          {this.renderReservations()}
        </CardText>
        <CardActions />
      </Card>
    )
  }
}

export default UserReservation
