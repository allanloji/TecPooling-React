import React, { Component } from 'react'
import './NearDriverDetail.css'
import RaisedButton from 'material-ui/RaisedButton'
import { ArrowBack } from '@material-ui/icons'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import PersonIcon from 'material-ui-icons/Person'
import Avatar from 'material-ui/Avatar'
import TextField from 'material-ui/TextField'
import axios from 'axios'
import Booking from "../Booking/Booking";
import PropTypes from "prop-types";

class NearDriverDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      comments: ''
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = name => event => {
    console.log(name)
    this.setState({
      [name]: event.target.value
    })
  }

  handleConfirmRequest = () => {
    const nearDriver = this.props
    const api = JSON.parse(localStorage.getItem('api'))
    const user = JSON.parse(localStorage.getItem('user'))

    axios
      .post(api.api + '/v1/requests', {
        passenger: {
          uuid: user.uuid
        },
        schedule: {
          uuid: nearDriver.nearDriver.uuidSchedule
        },
        comments: this.state.comments
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      }).then(this.props.updateReservations)
    this.setState({
      open: false
    })
  }

  render() {
    const actions = [<FlatButton label="Ok" primary={true} onClick={this.handleConfirmRequest} />]

    return (
      <div>
        <ArrowBack onClick={this.props.backDetail} />
        <p className="driverDetailName">{this.props.nearDriver.name}</p>
        <p className="driverDetailSubTitle">
          <b>Horario: </b> {this.props.nearDriver.hour}
        </p>
        <p className="driverDetailSubTitle">
          <b>Punto de Salida: </b> {this.props.nearDriver.origin}
        </p>
        <p className="driverDetailSubTitle">
          <b>Punto Final: </b> {this.props.nearDriver.destination}
        </p>
        <p className="driverDetailSubTitle">
          <b>Comentarios: </b> {this.props.nearDriver.comment}
        </p>
        <RaisedButton label="Reservar Asiento" onClick={this.handleClickOpen} />
        <Dialog
          title={'Solicitud'}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <div className=" NDInfo">
            <Avatar style={{ width: 60, height: 60 }}>
              <PersonIcon style={{ width: 50, height: 50 }} />
            </Avatar>
            <p>
              Conductor:
              {' ' + this.props.nearDriver.name}
            </p>
            <p>Destino: {' ' + this.props.nearDriver.destination}</p>
            <p>Comentarios:{' ' + this.props.nearDriver.comment}</p>

            <TextField
              className="comments"
              floatingLabelText="Comentarios"
              hintText="Escribe un comentario para el conductor"
              fullWidth
              onChange={this.handleChange('comments')}
            />
          </div>
        </Dialog>
      </div>
    )
  }
}

NearDriverDetail.propTypes = {
    backDetail: PropTypes.func,
    nearDriver: PropTypes.shape({
        owner: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            tecIdentification: PropTypes.string,
            phone: PropTypes.string,
        }),
        car: PropTypes.shape({
            licensePlates: PropTypes.string,
            model: PropTypes.shape({
                name: PropTypes.string,
                parent: PropTypes.shape({
                    name: PropTypes.string
                }),
            }),
            color: PropTypes.shape({
                name: PropTypes.string
            }),
        }),
        day: PropTypes.shape({
            name: PropTypes.string
        }),
        hour: PropTypes.string,
        startingPoint: PropTypes.shape({
            name: PropTypes.string
        }),
        comments: PropTypes.string
    }),
};

NearDriverDetail.defaultProps = {
    backDetail:  () => console.log("Se espera funcion"),
    schedule: {
        owner: {
            firstName: "[firstName]",
            lastName: "[lastName]",
            tecIdentification: "[tecIdentification]",
            phone: "[phone]",
        },
        car: {
            licensePlates: "[licensePlates]",
            model: {
                name: "[name]",
                parent: {
                    name: "[name]"
                },
            },
            color: {
                name: "[name]"
            },
        },
        day: {
            name: "[name]"
        },
        hour: "[hour]",
        startingPoint: {
            name: "[name]"
        },
        comments: "[comments]"

    }
}
export default NearDriverDetail
