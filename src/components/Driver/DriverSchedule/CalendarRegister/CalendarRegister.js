import React, { Component } from 'react'
import './CalendarRegister.css'
import Card, { CardTitle, CardText, CardActions } from 'material-ui/Card'
import { MenuItem } from 'material-ui/Menu'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import AlarmAddIcon from 'material-ui-icons/AlarmAdd'
import Autocomplete from '../../../Maps/Autocomplete'
import MapContainer from '../../../Maps/MapContainer'
import { GoogleApiWrapper } from 'google-maps-react'
import axios from 'axios'
import _ from "lodash"
import PropTypes from "prop-types";
let places = []
let days = []
let cars = []
let daysItems = []
let placesItems = []
let carItems = []
let capacityItems = []

const initialState = {
  day: {
    name: '',
    uuid: '',
    value: undefined
  },
  origin: {
    name: '',
    uuid: '',
    value: undefined
  },
  car: {
    name: '',
    uuid: '',
    capacity: '',
    value: undefined
  },
  capacity: undefined,
  capacityItems: [],
  description: '',
  owner: {
    uuid: ''
  },
  hour: '14:30',
  locations: [],
  daysData: [],
  originData: [],
  carData: [],
  comments: ''
}

class CalendarRegister extends Component {
  constructor(props) {
    super()
    this.state = { ...initialState, destiny: null }
  }
  componentWillMount() {
    let user = JSON.parse(localStorage.getItem('user'))
    let api = JSON.parse(localStorage.getItem('api'))
    axios.get(api.api + '/v1/references/day').then(res => {
      this.setState({ daysData: res.data })
    })
    axios.get(api.api + '/v1/references/startingPoint').then(res => {
      this.setState({ originData: res.data })
    })
    axios.get(api.api + '/v1/users/' + user.uuid + '/cars').then(res => {
      this.setState({ carData: res.data })
    })
  }

  getValues = () => {
    console.log(this.state)
    const daysdata = this.state.daysData
    const origins = this.state.originData
    const carsArray = this.state.carData
    places = []
    cars = []
    days = []

    for (let i = 0; i < daysdata.length; i++) {
      days.push({
        name: _.capitalize(daysdata[i].name),
        uuid: daysdata[i].uuid
      })
    }

    for (let i = 0; i < origins.length; i++) {
      places.push({
        name: _.capitalize(origins[i].name),
        uuid: origins[i].uuid
      })
    }
    for (let i = 0; i < carsArray.length; i++) {
      cars.push({
        name: _.capitalize(carsArray[i].model.name),
        capacity: carsArray[i].capacity,
        uuid: carsArray[i].uuid
      })
    }

    this.getMenuItems()
  }

  getMenuItems = () => {
    daysItems = []
    for (let i = 0; i < days.length; i++) {
      daysItems.push(<MenuItem value={i} key={i} primaryText={days[i].name} />)
    }
    placesItems = []
    for (let i = 0; i < places.length; i++) {
      placesItems.push(<MenuItem value={i} key={i} primaryText={places[i].name} />)
    }
    carItems = []
    for (let i = 0; i < cars.length; i++) {
      carItems.push(<MenuItem value={i} key={i} primaryText={cars[i].name} />)
    }
  }

  handleDayChange = (event, index, value) => {
    const selectedDay = days[value]
    this.setState({ day: { ...selectedDay, value: value } })
  }

  handleOriginChange = (event, index, value) => {
    const place = places[value]
    this.setState({ origin: { ...place, value: value } })
  }

  handleCarChange = (event, index, value) => {
    const car = cars[value]
    this.setState({ car: { ...car, value: value } }, () => {
      this.getCapacity()
    })
  }

  getCapacity = () => {
    const carCapacity = this.state.car.capacity
    capacityItems = []
    for (let i = 1; i <= carCapacity; i++) {
      capacityItems.push(<MenuItem value={i} key={i} primaryText={i} />)
    }
    this.setState({ capacityItems })
  }

  handleCapacityChange = (event, index, value) => {
    this.setState({ capacity: value })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = () => {
    const schedule = this.state
    let user = JSON.parse(localStorage.getItem('user'))
    //let user = '506563d8-af8d-4d54-b292-a6b49792fcda'
    let api = JSON.parse(localStorage.getItem('api'))

    axios
      .post(api.api + '/v1/schedules', {
        owner: {
          uuid: user.uuid
        },
        car: {
          uuid: schedule.car.uuid
        },
        latitude: schedule.destiny.latitude,
        longitude: schedule.destiny.longitude,
        address: schedule.destiny.name,
        day: {
          uuid: schedule.day.uuid
        },
        hour: schedule.hour,
        capacity: schedule.capacity,
        startingPoint: {
          uuid: schedule.origin.uuid
        },
        comments: schedule.comments
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      }).then(this.props.refreshSchedule)

  }

  seeDestiny = points => {
    let destiny = {
      name: points.name,
      latitude: points.location.lat,
      longitude: points.location.lng
    }
    this.setState({ destiny: destiny })
  }

  render() {
    if (this.state.daysData !== []) {
      this.getValues()
    }
    return (
      <Card className="calendarRegisterCard">
        <CardTitle className="calendarRegisterCardHeader">
          <AlarmAddIcon color="#ffff" /> Registro Horario
        </CardTitle>
        <CardText>
          <SelectField
            floatingLabelText="Día"
            value={this.state.day.value}
            onChange={this.handleDayChange}>
            {daysItems}
          </SelectField>
          <TextField
            id="hour"
            label="Hora"
            floatingLabelText="Hora"
            type="time"
            className="timePicker"
            onChange={this.handleChange('hour')}
            value={this.state.hour}
          />
          <SelectField
            floatingLabelText="Lugar"
            value={this.state.origin.value}
            onChange={this.handleOriginChange}>
            {placesItems}
          </SelectField>
          <SelectField
            floatingLabelText="Auto"
            value={this.state.car.value}
            onChange={this.handleCarChange}>
            {carItems}
          </SelectField>
          <SelectField
            floatingLabelText="Asientos"
            value={this.state.capacity}
            onChange={this.handleCapacityChange}>
            {this.state.capacityItems}
          </SelectField>
          <br />
          <TextField
            floatingLabelText="Comentarios"
            hintText="Ejemplo: Salgo por la puerta 1"
            multiLine={true}
            rows={1}
            rowsMax={4}
            onChange={this.handleChange('comments')}
            value={this.state.comments}
          />
          <br />
          <br />
          <div>
            <h4>Destino</h4>
            <Autocomplete seeDestiny={this.seeDestiny} />
            <br />
            <MapContainer
              type={'calendarRegister'}
              google={this.props.google}
              destiny={this.state.destiny}
              center={this.state.destiny}
              locations={[]}
            />
          </div>
        </CardText>
        <CardActions>
          <FlatButton primary onClick={this.handleSubmit} label="Enviar" />
        </CardActions>
      </Card>
    )
  }
}

CalendarRegister.propTypes ={
    google:PropTypes.string
};

CalendarRegister.defaultProps = {
    google:"[google]"
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyB9DhM7c87_HNYsY9a6kKvN8EKALqCc6r8'
})(CalendarRegister)
