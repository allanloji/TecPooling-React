import React, { Component } from 'react'
import './Request.css'
import Avatar from 'material-ui/Avatar'
import CancelIcon from 'material-ui-icons/Cancel'
import CheckIcon from 'material-ui-icons/CheckCircle'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import { ListItem } from 'material-ui/List'
import Dialog from 'material-ui/Dialog'
import PersonIcon from 'material-ui-icons/Person'
import TextField from 'material-ui/TextField/TextField'
import axios from 'axios'
import PropTypes from 'prop-types'
import ArrowIcon from 'material-ui-icons/KeyboardArrowRight'
class Request extends Component {
  state = {
    open: false,
    comments: ''
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState(nextProps)
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleConfirmRequest = () => {
    const request = this.props
    this.setState({
      open: false
    })

    let api = JSON.parse(localStorage.getItem('api'))

    axios
      .post(api.api + '/v1/bookings', {
        passenger: {
          uuid: request.passenger.uuid
        },
        schedule: {
          uuid: request.schedule.uuid
        },
        comments: this.state.comments
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
  }

  handleChangeComments = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleRejectRequest = () => {
    const request = this.props
    const api = JSON.parse(localStorage.getItem('api'))
    axios
      .put(api.api + '/v1/requests/' + request.uuid + '/status/3', {
        passenger: {
          uuid: request.passenger.uuid
        },
        schedule: {
          uuid: request.schedule.uuid
        },
        comments: this.state.comments
      })
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
    this.setState({ open: false })
  }
  render() {
    const request = this.props
    const actions = [
      <div>
        <IconButton onClick={this.handleRejectRequest}>
          <CancelIcon />
        </IconButton>

        <IconButton onClick={this.handleConfirmRequest}>
          <CheckIcon />
        </IconButton>
      </div>
    ]
    return (
      <div>
        <Paper elevation={4}>
          <div variant="headline" component="h3">
            <ListItem
              className="requestItem"
              primaryText={request.passenger.firstName}
              secondaryText={request.status.name}
              leftAvatar={<Avatar>{request.passenger.firstName[0]}</Avatar>}
              onClick={this.handleClickOpen}
              rightIconButton={
                <IconButton onClick={this.handleClickOpen}>
                  <ArrowIcon />
                </IconButton>
              }
            />
          </div>
        </Paper>
        <Dialog
          title={request.passenger.firstName}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <div className=" dialogInfo">
            <div className="dialog" style={{ marginRight: '2%' }}>
              {request.status.name}{' '}
            </div>
            <Avatar style={{ width: 60, height: 60 }}>
              <PersonIcon style={{ width: 50, height: 50 }} />
            </Avatar>
            <p>
              Nombre:
              {' ' + request.passenger.firstName + ' ' + request.passenger.lastName}
            </p>
            <p>Matrícula: {' ' + request.passenger.tecIdentification}</p>
            <p>Email: {' ' + request.passenger.email}</p>
            <p>Teléfono:{' ' + request.passenger.phone}</p>
            <p>Teléfono 2:{' ' + request.passenger.phone2}</p>
            <p>Comentarios: {' ' + request.comments}</p>
            <TextField
              className="comments"
              floatingLabelText="Comentarios"
              hintText="Escribe un comentario para el pasajero"
              fullWidth
              onChange={this.handleChangeComments('comments')}
            />
          </div>
        </Dialog>
      </div>
    )
  }
}

Request.propTypes = {
  passenger: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    tecIdentification: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    phone2: PropTypes.string
  }),
  status: PropTypes.shape({
    name: PropTypes.string
  }),
  comments: PropTypes.string
}

Request.defaultProps = {
  passenger: {
    firstName: '[firstName]',
    lastName: '[lastName]',
    tecIdentification: '[tecIdentification]',
    email: '[email]',
    phone: '[phone]',
    phone2: '[phone2]'
  },
  status: {
    name: '[name]'
  },
  comments: '[comments]'
}

export default Request
