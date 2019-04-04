import React, { Component } from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import Message from 'material-ui-icons/Announcement'
import RequestList from './RequestList/RequestList'
import './DriverRequests.css'
import axios from 'axios'
import DriverBookings from '../DriverBookings/DriverBookings'

class DriverRequests extends Component {
  constructor(props) {
    super(props)
    this.state = { requests: [] }
  }

  componentWillMount() {
    let api = JSON.parse(localStorage.getItem('api'))
    let user = JSON.parse(localStorage.getItem('user'))

    axios
      .get(api.api + '/v1/users/' + user.uuid + '/schedules/today')
      .then(res => {
        this.setState({ todaySchedule: res.data.uuid })
      })
      .then(res => {
        axios.get(api.api + '/v1/requests/schedule/' + this.state.todaySchedule).then(res => {
          this.setState({ requests: res.data })
        })
      })
  }

  renderRequests() {
    if (this.state.requests.length !== 0) {
      return <RequestList requests={this.state.requests} />
    } else {
      return <p className="emptyRequests">No tienes ninguna solicitud</p>
    }
  }
  render() {
    return (
      <div>
        <Card className="driverRequestsCard">
          <CardTitle className="driverRequestsTitle">
            <Message color="#ffff" /> Solicitudes
          </CardTitle>
          <CardText>{this.renderRequests()}</CardText>
        </Card>
      </div>
    )
  }
}

DriverRequests.propTypes = {}

DriverRequests.defaultProps = {}

export default DriverRequests
