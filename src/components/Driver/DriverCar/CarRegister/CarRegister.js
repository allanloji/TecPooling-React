import React, { Component } from 'react'
import './CarRegister.css'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import axios from 'axios'
import EventNoteIcon from 'material-ui-icons/EventNote'
import _ from 'lodash'
import DriverCar from '../DriverCar'

const initialState = {
  licensePlates: '',
  make: {
    name: '',
    uuid: '',
    value: undefined
  },
  model: {
    name: '',
    uuid: '',
    value: undefined
  },
  color: {
    name: '',
    uuid: '',
    value: undefined
  },
  capacity: 1,
  description: '',
  owner: {
    uuid: ''
  },
  makesData: [],
  modelData: [],
  colorsData: []
}

class CarRegister extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState }
  }

  componentWillMount() {
    let api = JSON.parse(localStorage.getItem('api'))
    axios.get(api.api + '/v1/references/make').then(res => {
      this.setState({
        makesData: res.data
      })
    })
    axios.get(api.api + '/v1/references/color').then(res => {
      this.setState({
        colorsData: res.data
      })
    })
  }

  handleChangeMake = (event, index, value) => {
    const aux = this.state.makesData.map((branch, i) => [branch.name, branch.uuid])
    const make = aux[value]
    this.setState({
      make: {
        name: make[0],
        uuid: make[1],
        value: value
      }
    })
    this.handleGetModel(make[1])
  }
  handleGetModel = id => {
    let api = JSON.parse(localStorage.getItem('api'))
    axios.get(api.api + '/v1/references/' + id + '/child').then(res => {
      this.setState({
        modelData: res.data
      })
    })
  }

  handleChangeColor = (event, index, value) => {
    const aux = this.state.colorsData.map((color, i) => [color.name, color.uuid])
    const color = aux[value]
    this.setState({
      color: {
        name: color[0],
        uuid: color[1],
        value: value
      }
    })
  }

  handleChangeChild = (event, index, value) => {
    const aux = this.state.modelData.map((model, i) => [model.name, model.uuid])
    const child = aux[value]
    console.log(child)
    this.setState({
      model: {
        name: child[0],
        uuid: child[1],
        value: value
      }
    })
  }

  handleChangeCapacity = (event, index, value) => {
    this.setState({
      capacity: value
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = () => {
    const car = this.state
    let user = JSON.parse(localStorage.getItem('user'))
    let api = JSON.parse(localStorage.getItem('api'))

    axios
      .post(api.api + '/v1/cars', {
        licensePlates: car.licensePlates,
        make: { uuid: car.make.uuid },
        model: { uuid: car.model.uuid },
        color: { uuid: car.color.uuid },
        capacity: car.capacity,
        description: car.description,
        owner: { uuid: user.uuid }
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      }).then(this.props.updateCars);


  }

  render() {
    const { makesData, modelData, colorsData } = this.state

    return (
      <div>
        {makesData !== [] ? (
          <div>
            <Card className="carRegisterCard">
              <CardTitle className="carRegisterCardHeader">
                <EventNoteIcon color="#ffff" /> Registro Automóvil
              </CardTitle>
              <div className="carRegisterFields">
                <CardText>
                  <TextField
                    hintText=""
                    floatingLabelText="Placas"
                    onChange={this.handleChange('licensePlates')}
                  />
                  <br />
                  <SelectField
                    floatingLabelText="Marca"
                    value={this.state.make.value}
                    onChange={this.handleChangeMake}
                    maxHeight={200}>
                    {makesData.map((branch, i) => (
                      <MenuItem value={i} key={i} primaryText={branch.name} />
                    ))}
                  </SelectField>
                  <br />
                  <SelectField
                    floatingLabelText="Modelo"
                    value={this.state.model.value}
                    onChange={this.handleChangeChild}
                    maxHeight={200}>
                    {modelData.map((model, i) => (
                      <MenuItem value={i} key={i} primaryText={model.name} />
                    ))}
                  </SelectField>
                  <br />
                  <SelectField
                    floatingLabelText="Color"
                    value={this.state.color.value}
                    onChange={this.handleChangeColor}
                    maxHeight={200}>
                    {colorsData.map((color, i) => (
                      <MenuItem value={i} key={i} primaryText={_.capitalize(color.name)} />
                    ))}
                  </SelectField>

                  <SelectField
                    floatingLabelText="Asientos"
                    value={this.state.capacity}
                    onChange={this.handleChangeCapacity}>
                    <MenuItem value={1} primaryText="1" />
                    <MenuItem value={2} primaryText="2" />
                    <MenuItem value={3} primaryText="3" />
                    <MenuItem value={4} primaryText="4" />
                    <MenuItem value={5} primaryText="5" />
                  </SelectField>
                  <TextField
                    floatingLabelText="Descripción"
                    hintText="Ejemplo: Golpe en la puerta derecha"
                    multiLine={true}
                    rows={1}
                    rowsMax={4}
                    onChange={this.handleChange('description')}
                    value={this.state.description}
                  />
                </CardText>
                <CardActions>
                  <FlatButton primary onClick={this.handleSubmit} label="Enviar" />
                </CardActions>
              </div>
            </Card>
          </div>
        ) : null}
      </div>
    )
  }
}

CarRegister.propTypes = {}

CarRegister.defaultProps = {}

export default CarRegister
