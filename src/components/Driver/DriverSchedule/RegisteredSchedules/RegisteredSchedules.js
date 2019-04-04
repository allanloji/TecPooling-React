import React, { Component } from "react";
import "./RegisteredSchedules.css";
import Card, { CardText, CardTitle } from "material-ui/Card";
import ScheduleIcon from "material-ui-icons/Schedule";
import ScheduleList from "../ScheduleList/ScheduleList";
import Request from "../../DriverHome/DriverRequests/Request/Request";
import PropTypes from "prop-types";

class RegisteredSchedules extends Component {
  constructor(props) {
    super();
    this.state = {
      schedules: []
    };
  }

  componentWillMount(){
      this.setState({
          ...this.props
      });
    }

  componentDidMount() {
    this.setState({
      ...this.props
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState(nextProps);
      this.renderSchedules();
    }
  }
  renderSchedules() {
    const schedules = this.props.schedules;
    if (schedules.length !== 0) {
      return <ScheduleList schedules={schedules} refreshSchedule={this.props.refreshSchedule}/>;
    } else {
      return <p className="emptySchedules">No has registrado ningún horario</p>;
    }
  }
  render() {
      console.log(this.props.schedules);
    return (
      <Card className="schedulesCard">
        <CardTitle className="schedulesTitle">
          <ScheduleIcon color="#ffff" /> Horarios
        </CardTitle>
        <CardText>
          <div className="driverScheduleListContainer">
            {this.renderSchedules()}
          </div>
        </CardText>
      </Card>
    );
  }
}

RegisteredSchedules.propTypes = {
    schedules: PropTypes.arrayOf(PropTypes.shape({
        passenger: PropTypes.shape({
            firstName:PropTypes.string,
            lastName:PropTypes.string,
            tecIdentification:PropTypes.string,
            email:PropTypes.string,
            phone:PropTypes.string,
            phone2:PropTypes.string,
        }),
        status: PropTypes.shape({
            name:PropTypes.string,
        }),
        comments:PropTypes.string
    }))
};

RegisteredSchedules.defaultProps = {
    requests: []
};

export default RegisteredSchedules;
