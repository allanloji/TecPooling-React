import React, { Component } from 'react'
import './DriverCar.css'
import SideBar from '../../SideBar'
import CarRegister from './CarRegister/CarRegister'
import RegisteredCars from './RegisteredCars/RegisteredCars'
import axios from 'axios'
import PropTypes from 'prop-types'

class DriverCar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cars: []
    }
  }

  changeToSignUp() {
    if (!localStorage.getItem('accesstoken')) {
      this.props.history.push('/signup')
    }
  }

  componentWillMount(){
      this.changeToSignUp()
      let user = JSON.parse(localStorage.getItem('user'))
      let api = JSON.parse(localStorage.getItem('api'))
      axios.get(api.api + '/v1/users/' + user.uuid + '/cars').then(res => {
          this.setState({ cars: res.data })
      })
  }
  componentDidMount() {

  }

  updateCars= () =>{

      let user = JSON.parse(localStorage.getItem('user'))
      let api = JSON.parse(localStorage.getItem('api'))
      axios.get(api.api + '/v1/users/' + user.uuid + '/cars').then(res => {
          this.setState({cars: res.data});
      })
  }

  render() {
    const cars = this.state.cars
    return (
      <div className="container">
        <SideBar />
        <div className="carRegisterContainer">
          <h1 className="homeTitle">Bienvenido conductor!</h1>
          <div className="carRegisterSectionsContainer">
            <CarRegister updateCars={this.updateCars}/>
            <RegisteredCars cars={this.state.cars} updateCars={this.updateCars} />
          </div>
        </div>
      </div>
    )
  }
}

DriverCar.propTypes = {}

DriverCar.defaultProps = {}

export default DriverCar
