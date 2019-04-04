import React, { Component } from "react";
import "./DriverHome.css";
import SideBar from "../../SideBar";
import DriverRequests from "./DriverRequests/DriverRequests";
import DriverBookings from "./DriverBookings/DriverBookings";
import DateRangeIcon from "material-ui-icons/DateRange";
import FlatButton from "material-ui/FlatButton";
import CarIcon from "material-ui-icons/DirectionsCar";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { Message } from '@material-ui/icons'

class DriverHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      user:null
    };
  }

    changeToSignUp(){
        if(!localStorage.getItem('accesstoken')) {
            this.props.history.push('/signup');
        }
    }

  componentWillMount(){
      this.changeToSignUp();
      let user = JSON.parse(localStorage.getItem("user"));

      //const user = "506563d8-af8d-4d54-b292-a6b49792fcda";
      let api = JSON.parse(localStorage.getItem("api"));
      axios.get(api.api + "/v1/users/" + user.uuid + "/cars").then(res => {
          this.setState({ cars: res.data });
      });
      axios.get(api.api + "/v1/users/" + user.uuid).then(res => {
          this.setState({
              user:res.data
          });
      });
  }

  componentDidMount() {
  }

  render() {
    const cars = this.state.cars;
    let user = this.state.user;
    if(!user){
      user = {first_name: ""};
    }
    return (
      <div className="container">
        <SideBar />
          <div className="driverHomeContainer">
              <h1 className="homeTitle">Bienvenido {user.firstName}!</h1>
              <div className="buttonsDriverHome">
                  <Link to={"/schedules/" + JSON.parse(localStorage.getItem("user")).uuid}>
                      <FlatButton
                          backgroundColor="rgba(255, 250, 253, 1)"
                          style={{marginLeft: "75%"}}
                          label="Horario"
                          labelPosition="before"
                          primary={true}
                          icon={<DateRangeIcon/>}
                      />
                  </Link>
                  <Link to={"/cars/" + JSON.parse(localStorage.getItem("user")).uuid}>
                      <FlatButton
                          backgroundColor="rgba(255, 250, 253, 1)"
                          style={{marginLeft: "95%"}}
                          label="Autos"
                          labelPosition="before"
                          primary={true}
                          icon={<CarIcon/>}
                      />
                  </Link>
              </div>
          {cars.length !== 0 ? (




              < div className="driverSectionsContainer">
              <DriverRequests  />
              <DriverBookings />
              </div>

              ) : (
              <div className="driverHomeNoCars">
                  <Card>
                      <CardTitle className="driverHomeNoCarsTitle">
                          <Message color="#fff" /> Aun no eres conductor!
                      </CardTitle>
                      <CardText>
                          <h1>¡Registra un carro y horario!</h1>
                      </CardText>
                      <CardActions />
                  </Card>
              </div>

        )}
              </div>
          </div>
    );
  }
}

DriverHome.propTypes ={
};

DriverHome.defaultProps = {
};

export default DriverHome;
