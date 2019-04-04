import React, { Component } from 'react'
import './DriverSchedule.css'
import SideBar from '../../SideBar'
import CalendarRegister from './CalendarRegister/CalendarRegister'
import RegisteredSchedules from './RegisteredSchedules/RegisteredSchedules'
import axios from 'axios'

class DriverSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      schedules: []
    }
  }

  changeToSignUp() {
    if (!localStorage.getItem('accesstoken')) {
      this.props.history.push('/signup')
    }
  }

  componentWillMount() {
    this.changeToSignUp()
    const user = JSON.parse(localStorage.getItem('user'))
    const api = JSON.parse(localStorage.getItem('api'))
    axios.get(api.api + '/v1/users/' + user.uuid + '/schedules').then(res => {
      this.setState({ schedules: res.data })
    })
    console.log('hola', this.state.schedules)
  }

  refreshSchedule = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    const api = JSON.parse(localStorage.getItem('api'))
    axios.get(api.api + '/v1/users/' + user.uuid + '/schedules').then(res => {
      this.setState({ schedules: res.data })
    })
  }

  render() {
    const schedules = this.state.schedules
    return (
      <div className="container">
        <SideBar />
        <div className="driverScheduleContainer">
          <h1 className="homeTitle">Bienvenido</h1>
          <div className="driverScheduleSectionsContainer">
            <CalendarRegister refreshSchedule={this.refreshSchedule} />
            <RegisteredSchedules schedules={schedules} refreshSchedule={this.refreshSchedule} />
          </div>
        </div>
      </div>
    )
  }
}

DriverSchedule.propTypes = {}

DriverSchedule.defaultProps = {}

export default DriverSchedule
