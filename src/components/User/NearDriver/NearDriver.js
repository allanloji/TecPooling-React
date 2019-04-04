import React, { Component } from 'react'
import './NearDriver.css'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import HistoryDetailItem from "../HistoryDetail/HistoryDetailItem/HistoryDetailItem";
import PropTypes from "prop-types";

class NearDriver extends Component {
  constructor(props) {
    super(props)
    this.onClickInfo = this.onClickInfo.bind(this)
  }

  componentWillMount() {}

  onClickInfo() {
    const nearDriver = {
      name: this.props.owner.firstName + ' ' + this.props.owner.lastName,
      destination: this.props.address,
      origin: this.props.startingPoint.name,
      hour: this.props.hour,
      comment: this.props.comments,
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      uuidSchedule: this.props.uuid
    }
    this.props.onClickInfo(nearDriver)
  }

  render() {
    return (
      <li>
        <Card className="nearDriverCard">
          <CardTitle className="">
            {this.props.owner.firstName + ' ' + this.props.owner.lastName}
          </CardTitle>
          <Divider />
          <CardText>
            <p>Hora: {this.props.hour}</p>
            <p>Origen: {this.props.startingPoint.name}</p>
            <p>Destino: {this.props.address}</p>
            <FlatButton label="Ver" onClick={this.onClickInfo} />
          </CardText>
        </Card>
      </li>
    )
  }
}

NearDriver.propTypes = {
        uuid: PropTypes.string,
        latitude: PropTypes.string,
        longitude: PropTypes.string,
        owner: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
        }),
        day: PropTypes.shape({
            name: PropTypes.string
        }),
        hour: PropTypes.string,
        startingPoint: PropTypes.shape({
            name: PropTypes.string
        }),
        comments: PropTypes.string
};

NearDriver.defaultProps = {
    uuid: "[uuid]",
    latitude: ["latitude"],
    longitude:["longitude"] ,
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
};

export default NearDriver
