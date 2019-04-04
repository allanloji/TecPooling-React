import React, { Component } from 'react'
import './CarList.css'
import Car from '../Car/Car'
import { List } from 'material-ui/List'
import PropTypes from 'prop-types'

const CarList = ({ cars, updateCars }) => {
  return (
    <div>
      <List>{cars.map((car, i) => <Car key={i} {...car} updateCars={updateCars} />)}</List>
    </div>
  )
}

CarList.propTypes = {
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

CarList.defaultProps = {
  cars: []
}

export default CarList
