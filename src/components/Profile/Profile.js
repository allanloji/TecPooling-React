import React, { Component } from "react";
import "./Profile.css";
import Card, {
  CardTitle,
  CardText,
  CardActions} from "material-ui/Card";
import PersonIcon from "material-ui-icons/Person";
import FlatButton from "material-ui/FlatButton";
import SideBar from "../SideBar";
import Dialog from "material-ui/Dialog";
import TextField from "material-ui/TextField";
import Avatar from "material-ui/Avatar";
import SaveIcon from "material-ui-icons/Save";
import { IconButton } from "material-ui";
import axios from "axios";
import Divider from "material-ui/Divider";
import Request from "../Driver/DriverHome/DriverRequests/Request/Request";
import PropTypes from "prop-types";

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
      uuid: "",
      firstName: "",
      lastName: "",
      tecIdentification: "",
      email: "",
      phone: "",
      phone2: ""
    };
  }

    changeToSignUp(){
        if(!localStorage.getItem('accesstoken')) {
            this.props.history.push('/signup');
        }
    }

  componentWillMount() {
    this.changeToSignUp();
    let user = JSON.parse(localStorage.getItem("user"));
    let api = JSON.parse(localStorage.getItem("api"));
    axios.get(api.api + "/v1/users/" + user.uuid).then(res => {
      this.setState({
        ...res.data
      });
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = () => {
    this.setState({ open: false });
    const user = this.state;
    let userUuid = JSON.parse(localStorage.getItem("user"));

    let api = JSON.parse(localStorage.getItem("api"));
    axios
      .put(api.api + "/v1/users/" + userUuid.uuid, {
        uuid: userUuid.uuid,
        firstName: user.firstName,
        lastName: user.lastName,
        tecIdentification: user.tecIdentification,
        password: "12345",
        email: user.email,
        phone: user.phone,
        phone2: user.phone2
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    const actions = [
      <IconButton onClick={this.handleSubmit}>
        <SaveIcon />
      </IconButton>
    ];
    const user = this.state;
    console.log(user);
    return (
      <div>
        <SideBar />
        {user !== {} ? (
          <div>
            <Card className="profileCard">
              <CardTitle className="profileTitle">
                Perfil
                <PersonIcon color="#ffff" />
              </CardTitle>
              <CardText>
                <div className="profileFields">
                  <p>
                    Nombre:
                    {" " + user.firstName + " " + user.lastName}
                  </p>
                  <Divider />
                  <p>Matrícula: {" " + user.tecIdentification}</p>
                  <Divider />
                  <p>Email: {" " + user.email}</p>
                  <Divider />
                  <p>Teléfono:{" " + user.phone}</p>
                  <Divider />
                  <p>Teléfono 2:{" " + user.phone2}</p>
                </div>
              </CardText>
              <CardActions>
                <FlatButton
                  style={{ marginLeft: "45%", marginTop: "4%" }}
                  backgroundColor="rgba(0, 0, 0, 0.06)"
                  primary
                  onClick={this.handleClickOpen}
                  label="Editar"
                />
              </CardActions>
            </Card>
            <Dialog
              title={user.firstName}
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              <div className="profileDialog">
                <Avatar style={{ width: 60, height: 60}}>
                  <PersonIcon style={{ width: 50, height: 50 }} />
                </Avatar>
              </div>
              <div className="profileFieldsDialog">
                <TextField
                  className="firstName"
                  floatingLabelText="Nombre"
                  value={user.firstName}
                  onChange={this.handleChange("firstName")}
                />
                <TextField
                  className="lastName"
                  floatingLabelText="Apellido"
                  value={user.lastName}
                  onChange={this.handleChange("lastName")}
                />
                <TextField
                  className="tecIdentification"
                  floatingLabelText="Matrícula"
                  value={user.tecIdentification}
                  onChange={this.handleChange("tecIdentification")}
                />
                <TextField
                  className="email"
                  floatingLabelText="Email"
                  value={user.email}
                  onChange={this.handleChange("email")}
                />
                <TextField
                  className="phone"
                  floatingLabelText="Teléfono"
                  value={user.phone}
                  onChange={this.handleChange("phone")}
                />
                <TextField
                  className="phone2"
                  floatingLabelText="Teléfono 2"
                  value={user.phone2}
                  onChange={this.handleChange("phone2")}
                />
              </div>
              <br />
              <br />
            </Dialog>
          </div>
        ) : null}
      </div>
    );
  }
}

Profile.propTypes = {

}

Profile.defaultProps = {
}

export default Profile;
