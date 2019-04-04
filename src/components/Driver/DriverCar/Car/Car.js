import React, { Component } from 'react'
import './Car.css'
import Avatar from 'material-ui/Avatar'
import CancelIcon from 'material-ui-icons/Cancel'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import { ListItem } from 'material-ui/List'
import axios from 'axios'
import Dialog from 'material-ui/Dialog'
import CarIcon from 'material-ui-icons/DirectionsCar'
import Divider from 'material-ui/Divider'
import SaveIcon from 'material-ui-icons/Save'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import _ from 'lodash'
import PropTypes from 'prop-types'
class Car extends Component {
  state = {
    open: false,
    description: '',
    capacity: 0
  }

  componentDidMount() {
    const car = this.props
    this.setState({
      description: car.description,
      capacity: car.capacity
    })
  }
  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleChangeCapacity = (event, index, value) => {
    this.setState({
      capacity: value
    })
  }

  handleDeleteCar = () => {
    let api = JSON.parse(localStorage.getItem('api'))
    axios.delete(api.api + '/v1/cars/' + this.props.uuid).then(this.props.updateCars)
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = () => {
    const car = this.state
    const props = this.props
    const user = JSON.parse(localStorage.getItem('user'))
    const api = JSON.parse(localStorage.getItem('api'))
    axios
      .put(api.api + '/v1/cars/' + this.props.uuid, {
        licensePlates: props.licensePlates,
        make: { uuid: props.make.uuid },
        model: { uuid: props.model.uuid },
        color: { uuid: props.color.uuid },
        capacity: car.capacity,
        description: car.description,
        owner: { uuid: user.uuid }
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

    this.setState({
      open: false
    })
  }

  render() {
    const car = this.props
    const model = car.model.name
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
              primaryText={car.licensePlates}
              secondaryText={car.description}
              leftAvatar={<Avatar>{model[0]}</Avatar>}
              rightIconButton={
                <IconButton onClick={this.handleDeleteCar}>
                  <CancelIcon />
                </IconButton>
              }
              onClick={this.handleClickOpen}>
              {model} - {car.model.parent.name}
              <br />
            </ListItem>
          </div>
        </Paper>
        <Dialog
          title={car.model.name}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}>
          <div className="carDialog">
            <Avatar style={{ width: 50, height: 50 }}>
              <CarIcon style={{ width: 40, height: 40 }} />
            </Avatar>
          </div>
          <div className="carFieldsDialog">
            <p>
              Placas:
              {' ' + car.licensePlates}
            </p>
            <Divider />
            <p>Modelo: {' ' + car.model.name}</p>
            <Divider />
            <p>Marca: {' ' + car.model.parent.name}</p>
            <Divider />
            <p>Color:{' ' + _.capitalize(car.color.name)}</p>
            <Divider />
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
            <br />
            <TextField
              floatingLabelText="Descripción"
              hintText="Ejemplo: Golpe en la puerta derecha"
              multiLine={true}
              rows={1}
              rowsMax={4}
              onChange={this.handleChange('description')}
              value={this.state.description}
            />
          </div>
          <br />
          <br />
        </Dialog>
      </div>
    )
  }
}

Car.propTypes = {
  description: PropTypes.string,
  capacity: PropTypes.number,
  uuid: PropTypes.string,
  licensePlates: PropTypes.string,
  make: PropTypes.shape({
    uuid: PropTypes.string
  }),
  model: PropTypes.shape({
    name: PropTypes.string,
    uuid: PropTypes.string,
    parent: PropTypes.shape({
      name: PropTypes.string
    })
  }),
  color: PropTypes.shape({
    uuid: PropTypes.string,
    name: PropTypes.string
  })
}

Car.defaultProps = {
  description: '[description]',
  capacity: 0,
  uuid: '[uuid]',
  licensePlates: '[licensePlates]',
  make: {
    uuid: '[uuid]'
  },
  model: {
    name: '[name]',
    uuid: '[uuid]',
    parent: {
      name: '[name]'
    }
  },
  color: {
    uuid: '[uuid]',
    name: '[name]'
  }
}

export default Car
