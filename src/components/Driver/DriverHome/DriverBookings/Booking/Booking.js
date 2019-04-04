import React, { Component } from 'react'
import './Booking.css'
import Avatar from 'material-ui/Avatar'
import { IconButton } from 'material-ui'
import Paper from 'material-ui/Paper'
import { ListItem } from 'material-ui/List'
import ArrowIcon from 'material-ui-icons/KeyboardArrowRight'
import PersonIcon from 'material-ui-icons/Person'
import CloseIcon from 'material-ui-icons/Close'
import Dialog from 'material-ui/Dialog'
import PropTypes from 'prop-types'

class Booking extends Component {
  state = {
    open: false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState(nextProps)
    }
  }

  render() {
    const booking = this.props
    return (
      <div>
        <Paper elevation={4}>
          <div variant="headline" component="h3">
            <ListItem
              className={'requestItem'}
              disabled
              primaryText={booking.passenger.firstName}
              secondaryText="Confirmado"
              leftAvatar={<Avatar>{booking.passenger.firstName[0]}</Avatar>}
              rightIconButton={
                <IconButton onClick={this.handleClickOpen}>
                  <ArrowIcon />
                </IconButton>
              }
            />
          </div>
        </Paper>
        <Dialog
          title={booking.passenger.firstName}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}>
          <Avatar style={{ width: 60, height: 60 }}>
            <PersonIcon style={{ width: 50, height: 50 }} />
          </Avatar>
          <p>
            Nombre:
            {' ' + booking.passenger.firstName + ' ' + booking.passenger.lastName}
          </p>
          <p>Matrícula: {' ' + booking.passenger.tecIdentification}</p>
          <p>Email: {' ' + booking.passenger.email}</p>
          <p>Teléfono:{' ' + booking.passenger.phone}</p>
          <p>Teléfono 2:{' ' + booking.passenger.phone2}</p>
          <p>Comentarios: {' ' + booking.comments}</p>
          <div className="dialog">Confirmado </div>
        </Dialog>
      </div>
    )
  }
}

Booking.propTypes = {
  passenger: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    tecIdentification: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    phone2: PropTypes.string
  }),
  comments: PropTypes.string
}

Booking.defaultProps = {
  passenger: {
    firstName: '[firstName]',
    lastName: '[lastName]',
    tecIdentification: '[tecIdentification]',
    email: '[email]',
    phone: '[phone]',
    phone2: '[phone2]'
  },
  comments: '[comments]'
}

export default Booking
