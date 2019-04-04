import React, { Component } from 'react'
import './Signup.css'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'
import queryString from 'query-string'
import LoginIcon from 'material-ui-icons/Fingerprint'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import Profile from "../Profile/Profile";
class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            tecIdentification: '',
            email: '',
            phone: '',
            phone2: '',
            user: null,
            password: '',
            open: false
        }
    }

    remove_hash_from_url() {
        const uri = window.location.toString()
        if (uri.indexOf('#') > 0) {
            const clean_uri = uri.substring(0, uri.indexOf('#'))
            window.history.replaceState({}, document.title, clean_uri)
        }
    }

    componentWillMount() {
        if (!localStorage.getItem('accesstoken')) {
            localStorage.removeItem('user')
        }
        const parsedHash = queryString.parse(window.location.hash)
        this.remove_hash_from_url()
        if (parsedHash.access_token) {
            localStorage.setItem('accesstoken', parsedHash.access_token)
        }

        if (localStorage.getItem('accesstoken')) {
            const config = {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('accesstoken') }
            }
            axios
                .get('http://10.48.213.246:9999/user', config)
                .then(resp => {
                    localStorage.setItem('user', JSON.stringify({ uuid: resp.data.principal.uuid }))
                    this.props.history.push('/')
                    this.setState({ user: resp.data.principal })
                })
                .catch(error => console.log(error))
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    postUser = () => {
        const user = this.state
        const api = JSON.parse(localStorage.getItem('api'))
        console.log(this.state)
        axios
            .post(api.api + '/v1/users', {
                firstName: user.firstName,
                lastName: user.lastName,
                tecIdentification: user.tecIdentification,
                email: user.email,
                phone: user.phone,
                phone2: user.phone2,
                password: user.password
            })
            .then(res => {
                console.log(res)
            })
        this.setState({
            open: true,
            firstName: '',
            lastName: '',
            tecIdentification: '',
            email: '',
            phone: '',
            phone2: '',
            password: ''
        })
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        const { firstName, lastName, tecIdentification, email, phone, phone2 } = this.state
        // const submit = e => {
        //   e.preventDefault()
        //   if (
        //     firstName.trim().length < 2 ||
        //     lastName.trim().length < 2 ||
        //     tecIdentification.trim().length < 8 ||
        //     phone.trim().length < 8 ||
        //     phone2.trim().length < 8
        //   ) {
        //     alert('Los campos no cuentan con la longitud requerida')
        //   } else if (isNaN(phone) || isNaN(phone2)) {
        //     alert('El campo tiene que ser un número')
        //   } else if (
        //     email.trim().length < 9 ||
        //     email.substring(email.length - 9, email.length) !== '@itesm.mx'
        //   ) {
        //     console.log(email.substring(email.length - 10, email.length - 1))
        //     alert('El correo no es de la institucion')
        //   } else {
        //     const user = {
        //       firstName: firstName,
        //       lastName: lastName,
        //       tecIdentification: tecIdentification,
        //       email: email,
        //       phone: phone,
        //       phone2: phone2
        //     }

        //     this.postUser(user)
        //   }
        //}
        const actions = [<FlatButton label="Ok" primary={true} onClick={this.handleClose} />]
        return (
            <div>
                <div className="signUpBackground">
                    <div className="loginButton">
                        <a href="http://10.48.213.246:9999/oauth/authorize?client_id=demo&response_type=token&redirect_uri=http://localhost:3000/signup">
                            <FlatButton
                                backgroundColor="rgba(255, 250, 253, 1)"
                                style={{ marginLeft: '75%' }}
                                label="Login"
                                labelPosition="before"
                                primary={true}
                                icon={<LoginIcon />}
                            />
                        </a>
                    </div>
                    <div className="signUpTitleTec">
                        <p>TecPooling</p>
                    </div>
                </div>
                <div className="formRegister">
                    <Card className="card">
                        <CardTitle className="loginCardHeader">Registro</CardTitle>
                        <TextField
                            type="text"
                            value={this.state.firstName}
                            onChange={this.handleChange('firstName')}
                            floatingLabelText="Nombre"
                        />
                        <br />
                        <TextField
                            required
                            type="text"
                            value={this.state.lastName}
                            onChange={this.handleChange('lastName')}
                            floatingLabelText="Apellidos"
                        />
                        <br />
                        <TextField
                            type="text"
                            value={this.state.tecIdentification}
                            onChange={this.handleChange('tecIdentification')}
                            floatingLabelText="Matricula"
                        />
                        <br />
                        <TextField
                            type="text"
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            floatingLabelText="Correo institucional"
                        />
                        <br />
                        <TextField
                            type="text"
                            value={this.state.phone}
                            onChange={this.handleChange('phone')}
                            floatingLabelText="Telefono"
                        />
                        <br />
                        <TextField
                            type="text"
                            value={this.state.phone2}
                            onChange={this.handleChange('phone2')}
                            floatingLabelText="Telefono alternativo"
                        />
                        <br />
                        <TextField
                            type="password"
                            value={this.state.password}
                            floatingLabelText="Contrasena"
                            onChange={this.handleChange('password')}
                        />
                        <CardActions>
                            <RaisedButton label="Enviar" className="signUpButton" onClick={this.postUser} />
                        </CardActions>
                    </Card>
                </div>
                <div>
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}>
                        ¡Registrado Correctamente!
                    </Dialog>
                </div>
            </div>
        )
    }
}

Signup.propTypes = {

}

Signup.defaultProps = {
}

export default Signup
