import React, {Component} from 'react';
import './Reservation.css';
import Avatar from "material-ui/Avatar";
import CancelIcon from "material-ui-icons/Cancel";
import CheckIcon from "material-ui-icons/CheckCircle";
import IconButton from "material-ui/IconButton";
import Paper from "material-ui/Paper";
import { ListItem } from "material-ui/List";
import Dialog from "material-ui/Dialog";
import PersonIcon from "material-ui-icons/Person";
import DeleteIcon from "material-ui-icons/Delete";
import axios from "axios";





class Reservation extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false, reservation:null};
    }

    componentDidMount(){
        this.setState({reservation: this.props});
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

    cancelReservation=(reservation)=>{
        let api = JSON.parse(localStorage.getItem("api"));
        axios.put(api.api+ "/v1/requests/" + reservation.uuid + "/status/4").then(this.props.changeReservations);
    };

    render() {
        const reservation = this.props;
        const actions = [
            <div>
                <IconButton onClick={this.handleClose}>
                    <CancelIcon />
                </IconButton>

            </div>
        ];


        const item = (
            <div>
                <IconButton onClick={()=>this.cancelReservation(reservation)}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        );

        return (
            <div>
                <Paper elevation={4}>
                    <div variant="headline" component="h3">
                        <ListItem
                            className={"requestItem"}
                            primaryText={reservation.schedule.owner.firstName + " " + reservation.schedule.owner.lastName}
                            secondaryText={reservation.schedule.startingPoint.name + " " + this.capitalizeFirstLetter(reservation.schedule.day.name) + " " + reservation.schedule.hour}
                            leftAvatar={<Avatar>{reservation.schedule.owner.firstName[0]}</Avatar>}
                            rightIconButton={item}
                            onClick={this.handleClickOpen}
                        />
                    </div>
                </Paper>
                <Dialog
                    title={"Información de la petición"}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <div className="userInfo">
                        <Avatar style={{ width: 60, height: 60 }}>
                            <PersonIcon style={{ width: 50, height: 50 }} />
                        </Avatar>
                        <p>Conductor: {reservation.schedule.owner.firstName + " " + reservation.schedule.owner.lastName}</p>
                        <p>Matrícula: {reservation.schedule.owner.tecIdentification}</p>
                        <p>Hora de salida: {this.capitalizeFirstLetter(reservation.schedule.day.name) + " " + reservation.schedule.hour}</p>
                        <p>Lugar de Salida: {reservation.schedule.startingPoint.name }</p>
                        <p>Comentarios: {reservation.comments}</p>
                        <div className="dialog">{this.capitalizeFirstLetter(reservation.status.name)} </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}


export default Reservation;