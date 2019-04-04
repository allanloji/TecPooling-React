import React, {Component} from 'react';
import './Booking.css';
import Avatar from "material-ui/Avatar";
import CancelIcon from "material-ui-icons/Cancel";
import IconButton from "material-ui/IconButton";
import Paper from "material-ui/Paper";
import { ListItem } from "material-ui/List";
import Dialog from "material-ui/Dialog";
import PersonIcon from "material-ui-icons/Person";
import PropTypes from "prop-types";

class Booking extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    render() {
        const booking = this.props;
        const actions = [
            <div>
                <IconButton onClick={this.handleClose}>
                    <CancelIcon />
                </IconButton>

            </div>
        ];

        return (
            <div>
                <Paper elevation={4}>
                    <div variant="headline" component="h3">
                        <ListItem
                            className={"requestItem"}
                            primaryText={booking.schedule.owner.firstName + " " + booking.schedule.owner.lastName}
                            secondaryText={booking.schedule.startingPoint.name + " " + this.capitalizeFirstLetter(booking.schedule.day.name) + " " + booking.schedule.hour}
                            leftAvatar={<Avatar>{booking.schedule.owner.firstName[0]}</Avatar>}
                            onClick={this.handleClickOpen}
                        />
                    </div>
                </Paper>
                <Dialog
                    title={"Información del viaje"}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <div className="userInfo">
                        <Avatar style={{ width: 60, height: 60 }}>
                            <PersonIcon style={{ width: 50, height: 50 }} />
                        </Avatar>
                        <p><b>Conductor:</b> {booking.schedule.owner.firstName + " " + booking.schedule.owner.lastName}</p>
                        <p><b>Matrícula:</b> {booking.schedule.owner.tecIdentification}</p>
                        <p><b>Teléfono:</b> {booking.schedule.owner.phone}</p>
                        <p><b>Carro:</b> {booking.schedule.car.model.parent.name + " " + booking.schedule.car.model.name + " "
                            + booking.schedule.car.color.name}</p>
                        <p><b>Placas:</b> {booking.schedule.car.licensePlates}</p>
                        <p><b>Hora de salida:</b> {this.capitalizeFirstLetter(booking.schedule.day.name) + " " + booking.schedule.hour}</p>
                        <p><b>Lugar de Salida:</b> {booking.schedule.startingPoint.name }</p>
                        <p><b>Comentarios:</b> {booking.schedule.comments}</p>
                    </div>
                </Dialog>
            </div>
        );
    }
}

Booking.propTypes = {
    schedule: PropTypes.shape({
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

Booking.defaultProps = {
    schedule: {
        owner: {
            firstName: "[firstName]",
            lastName: "[lastName]",
            tecIdentification: "[tecIdentification]",
            phone: "[phone]",
        },
        car:{
            licensePlates: "[licensePlates]",
            model:{
                name: "[name]",
                parent:{
                    name: "[name]"
                },
            },
            color:{
                name: "[name]"
            },
        },
        day: {
            name:"[name]"
        },
        hour: "[hour]",
        startingPoint: {
            name: "[name]"
        },
        comments: "[comments]"

    }
}




export default Booking;