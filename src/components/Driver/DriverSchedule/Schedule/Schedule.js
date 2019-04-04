import React, { Component } from 'react'
import './Schedule.css'
import Avatar from 'material-ui/Avatar'
import CancelIcon from 'material-ui-icons/Cancel'
import SaveIcon from 'material-ui-icons/Save'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import { ListItem } from 'material-ui/List'
import Dialog from 'material-ui/Dialog'
import ScheduleIcon from 'material-ui-icons/Schedule'
import CalendarRegister from '../CalendarRegister/CalendarRegister'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import _ from 'lodash'
import SelectField from 'material-ui/SelectField'
import axios from 'axios'
import MenuItem from 'material-ui/MenuItem'
import RequestList from '../../DriverHome/DriverRequests/RequestList/RequestList'
import PropTypes from 'prop-types'

class Schedule extends Component {
  state = {
    open: false,
    hour: '',
    capacity: 1,
    comments: '',
    carCapacity: 1,
    carItems: []
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      hour: this.props.hour,
      capacity: this.props.capacity,
      comments: this.props.comments,
      carCapacity: this.props.capacity
    })
  }

  handleGetCar = () => {
    const api = JSON.parse(localStorage.getItem('api'))
    const scheduleID = this.props.uuid

    axios.get(api.api + '/v1/schedules/' + scheduleID).then(res => {
      this.setState({ carCapacity: res.data.car.capacity })
    })
    this.handleGetCarItems()
  }

  handleGetCarItems = () => {
    const aux = []
    for (let i = 1; i <= this.state.carCapacity; i++) {
      aux.push(<MenuItem value={i} key={i} primaryText={i} />)
    }
    this.setState({
      carItems: aux
    })
  }

  handleClickOpen = () => {
    this.handleGetCar()
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  getTimeNoSeconds = time => {
    const aux = time.split(':')
    return aux[0] + ':' + aux[1]
  }

  handleEdit = () => {
    return <CalendarRegister isEditing="true" />
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleChangeCapacity = (event, index, value) => {
    this.setState({ capacity: value })
  }

  handleSubmit = () => {
    const schedule = this.state
    const api = JSON.parse(localStorage.getItem('api'))

    axios
      .put(api.api + '/v1/schedules/' + this.props.uuid, {
        ...this.props,
        hour: schedule.hour,
        comments: schedule.comments,
        capacity: schedule.capacity
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
    this.setState({
      open: false
    })
  }

  handleDeleteSchedule = () => {
    const api = JSON.parse(localStorage.getItem('api'))
    axios.delete(api.api + '/v1/schedules/' + this.props.uuid).then(this.props.refreshSchedule)
  }

  render() {
    const schedule = this.props
    const day = _.capitalize(schedule.day.name)
    const time = this.getTimeNoSeconds(schedule.hour)
    const { carItems } = this.state
    const actions = [
      <IconButton onClick={this.handleSubmit}>
        <SaveIcon />
      </IconButton>
    ]

    return (
      <div>
        <Paper elevation={4}>
          <div variant="headline" component="h3">
            <ListItem
              className={'requestItem'}
              primaryText={schedule.startingPoint.name}
              secondaryText={schedule.capacity + ' asientos'}
              leftAvatar={<Avatar>{day[0]}</Avatar>}
              rightIconButton={
                <IconButton onClick={this.handleDeleteSchedule}>
                  <CancelIcon />
                </IconButton>
              }
              onClick={this.handleClickOpen}>
              {day} - {time}
              <br />
            </ListItem>
          </div>
        </Paper>
        <Dialog
          title={day}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}>
          <div className="scheduleDialog">
            <Avatar style={{ width: 50, height: 50 }}>
              <ScheduleIcon style={{ width: 40, height: 40 }} />
            </Avatar>
          </div>
          <div className="scheduleFieldsDialog">
            <p>
              Origen:
              {' ' + schedule.startingPoint.name}
            </p>
            <Divider />
            <p>Destino: {' ' + schedule.address}</p>
            <Divider />
            <TextField
              id="hour"
              label="Hora"
              floatingLabelText="Hora"
              type="time"
              className="timePicker"
              onChange={this.handleChange('hour')}
              value={this.getTimeNoSeconds(this.state.hour)}
            />
            <SelectField
              floatingLabelText="Asientos"
              value={this.state.capacity}
              onChange={this.handleChangeCapacity}>
              {carItems}
            </SelectField>

            <Divider />
            <TextField
              floatingLabelText="Comentarios"
              multiLine={true}
              fullWidth
              rows={1}
              rowsMax={4}
              onChange={this.handleChange('comments')}
              value={this.state.comments}
            />
          </div>
          <br />
          <br />
        </Dialog>
      </div>
    )
  }
}

Schedule.propTypes = {
  uuid: PropTypes.string,
  schedule: PropTypes.shape({
    day: PropTypes.shape({
      name: PropTypes.string
    })
  }),
  hour: PropTypes.string,
  capacity: PropTypes.string,
  comments: PropTypes.string
}

Schedule.defaultProps = {
  requests: []
}

export default Schedule
