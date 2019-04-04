import React, {Component} from 'react';
import './HistoryDetailItem.css';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import BookingList from "../../../Driver/DriverHome/DriverBookings/BookingList/BookingList";
import PropTypes from "prop-types";




class HistoryDetailItem extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    render() {
        const history = this.props;
        return (
            <Card className="historyItemDiv">
                <CardHeader
                    title={this.capitalizeFirstLetter(history.schedule.day.name) + " " + history.schedule.hour}
                    subtitle={history.schedule.startingPoint.name + " "}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardActions>
                </CardActions>
                <CardText expandable={true}>
                    <p><b>Conductor:</b> {history.schedule.owner.firstName + " " + history.schedule.owner.lastName}</p>
                    <p><b>Matrícula:</b> {history.schedule.owner.tecIdentification}</p>
                    <p><b>Teléfono:</b> {history.schedule.owner.phone}</p>
                    <p><b>Carro:</b> {history.schedule.car.model.parent.name + " " + history.schedule.car.model.name + " "
                    + history.schedule.car.color.name}</p>
                    <p><b>Placas:</b> {history.schedule.car.licensePlates}</p>
                    <p><b>Hora de salida:</b> {this.capitalizeFirstLetter(history.schedule.day.name) + " " + history.schedule.hour}</p>
                    <p><b>Lugar de Salida:</b> {history.schedule.startingPoint.name }</p>
                    <p><b>Comentarios:</b> {history.schedule.comments}</p>
                </CardText>
            </Card>
        );
    }
}

HistoryDetailItem.propTypes = {
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

HistoryDetailItem.defaultProps = {
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
};

export default HistoryDetailItem;