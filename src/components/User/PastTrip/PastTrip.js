import React, {Component} from 'react';
import './PastTrip.css';
import Divider from 'material-ui/Divider';
import IconButton from "material-ui/IconButton";
import Paper from "material-ui/Paper";
import { ListItem } from "material-ui/List";
import Dialog from "material-ui/Dialog";
import PersonIcon from "material-ui-icons/Person";
import DeleteIcon from "material-ui-icons/Delete";
import CancelIcon from "material-ui-icons/Cancel";
import Avatar from "material-ui/Avatar";




class PastTrip extends Component {

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
        const pastTrip = this.props;
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
                            primaryText={pastTrip.schedule.owner.firstName + " " + pastTrip.schedule.owner.lastName}
                            secondaryText={pastTrip.schedule.startingPoint.name + " " + this.capitalizeFirstLetter(pastTrip.schedule.day.name) + " " + pastTrip.schedule.hour}
                            leftAvatar={<Avatar>{pastTrip.schedule.owner.firstName[0]}</Avatar>}
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
                        <p><b>Conductor:</b> {pastTrip.schedule.owner.firstName + " " + pastTrip.schedule.owner.lastName}</p>
                        <p><b>Matrícula:</b> {pastTrip.schedule.owner.tecIdentification}</p>
                        <p><b>Teléfono:</b> {pastTrip.schedule.owner.phone}</p>
                        <p><b>Carro:</b> {pastTrip.schedule.car.model.parent.name + " " + pastTrip.schedule.car.model.name + " "
                        + pastTrip.schedule.car.color.name}</p>
                        <p><b>Placas:</b> {pastTrip.schedule.car.licensePlates}</p>
                        <p><b>Hora de salida:</b> {this.capitalizeFirstLetter(pastTrip.schedule.day.name) + " " + pastTrip.schedule.hour}</p>
                        <p><b>Lugar de Salida:</b> {pastTrip.schedule.startingPoint.name }</p>
                        <p><b>Comentarios:</b> {pastTrip.schedule.comments}</p>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default PastTrip;