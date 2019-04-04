import React, { Component } from 'react'
import './RegisteredCars.css'
import Card, { CardText, CardTitle } from 'material-ui/Card'
import CarIcon from 'material-ui-icons/DirectionsCar'
import CarList from '../CarList/CarList'
import DriverCar from '../DriverCar'
import PropTypes from 'prop-types'

class RegisteredCars extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cars: []
    }
  }

  componentWillMount(){
      this.setState({
          cars: this.props.cars
      })
  }

  componentDidMount() {
      this.setState({
          cars: this.props.cars
      })
  }



  componentWillReceiveProps(nextProps) {
    if (this.state.car !== nextProps.cars) {
      this.setState({cars:nextProps.cars})
    }
  }

  renderCars() {
    const cars = this.state.cars;
    if (cars.length !== 0) {
      return <CarList cars={this.state.cars} updateCars={this.props.updateCars} />
    } else {
      return <p className="emptyCars">No has registrado ningún automóvil</p>
    }
  }
  render() {
    return (
      <Card className="carsCard">
        <CardTitle className="carsTitle">
          <CarIcon color="#ffff" /> Automóviles
        </CardTitle>
        <CardText>{this.renderCars()}</CardText>
      </Card>
    )
  }
}

RegisteredCars.propTypes = {
  cars: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      capacity: PropTypes.number,
      uuid: PropTypes.string,
      licensePlates: PropTypes.string,
      make: PropTypes.shape({
        uuid: PropTypes.string
      }),
      model: PropTypes.shape({
        name: PropTypes.string,
        uuid: PropTypes.string,
        parent: PropTypes.shape({
          name: PropTypes.string
        })
      }),
      color: PropTypes.shape({
        uuid: PropTypes.string,
        name: PropTypes.string
      })
    })
  )
}

RegisteredCars.defaultProps = {
  cars: []
}

export default RegisteredCars
