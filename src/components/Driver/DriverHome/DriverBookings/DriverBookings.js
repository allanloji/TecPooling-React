import React, { Component } from 'react'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import Bookmark from 'material-ui-icons/Bookmark'
import Divider from 'material-ui/Divider'
import Badge from 'material-ui/Badge'
import CarIcon from 'material-ui-icons/DirectionsCar'
import BookingList from './BookingList/BookingList'
import './DriverBookings.css'
import axios from 'axios'
import DriverCar from '../../DriverCar/DriverCar'

class DriverBookings extends Component {
  constructor(props) {
    super()
    this.state = { bookings: [], todayBooking: [] }
  }

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('user'))
    const api = JSON.parse(localStorage.getItem('api'))

    axios.get(api.api + '/v1/users/' + user.uuid + '/schedules/today').then(res => {
      this.setState({ todayBooking: res.data })
    })
    axios.get(api.api + '/v1/users/' + user.uuid + '/bookings/driver').then(res => {
      this.setState({ bookings: res.data })
    })
  }

  handleGetDate() {
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    let day = today.getDay()
    let weekday = new Array(7)
    weekday[0] = 'Domingo'
    weekday[1] = 'Lunes'
    weekday[2] = 'Martes'
    weekday[3] = 'Miércoles'
    weekday[4] = 'Jueves'
    weekday[5] = 'Viernes'
    weekday[6] = 'Sábado'

    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    today = weekday[day] + '    ' + dd + '/' + mm
    return today
  }

  renderBookings() {
    if (this.state.bookings !== []) {
      return <BookingList bookings={this.state.bookings} />
    }
  }
  render() {
    const { bookings, todayBooking } = this.state
    return (
      <div>
        <div>
          <Card className="driverBookingsCard">
            <CardTitle className="driverBookingsTitle">
              <Bookmark color="#ffff" /> Tu Viaje
            </CardTitle>
            <Badge
              style={{ marginLeft: '92%' }}
              badgeStyle={{ top: 12, right: 12, backgroundColor: '#46a651' }}
              badgeContent={bookings.length}
              primary={true}
            />
            {todayBooking.length !== 0 ? (
              <div>
                <CardText>
                  <div className="dayText">{this.handleGetDate()}</div>
                  <div className="destinationText">{todayBooking.address}</div>
                  <div style={{ fontWeight: 600, textAlign: 'right' }}>
                    {todayBooking.car.model.name}
                    <CarIcon style={{ color: '#46a651' }} />
                  </div>
                </CardText>
                <Divider />
                {this.renderBookings()}
              </div>
            ) : (
              <p className="emptyBookings">No tienes ninguna reservación</p>
            )}
            <CardActions />
          </Card>
        </div>
      </div>
    )
  }
}

DriverBookings.propTypes = {}

DriverBookings.defaultProps = {}

export default DriverBookings
