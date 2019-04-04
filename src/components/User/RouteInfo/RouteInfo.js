import React, { Component } from 'react'
import './RouteInfo.css'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import NearDriverList from '../NearDriverList'
import NearDriverDetail from '../NearDriverDetail'
import { AddLocation } from '@material-ui/icons'

class RouteInfo extends Component {
  constructor(props) {
    super(props)
    this.state = { neardrivers: [], detail: false, detailDriver: null }
    this.renderInfo = this.renderInfo.bind(this)
    this.backDetail = this.backDetail.bind(this)
  }

  componentWillMount() {
    this.setState({ detail: false })
  }

  backDetail() {
    this.setState({ detail: false })
    this.props.resetCenter()
  }

  renderInfo(driver) {
    this.setState({ detail: true })
    this.setState({ detailDriver: driver })
    const center = { latitude: driver.latitude, longitude: driver.longitude }
    this.props.setCenter(center)
  }

  renderDrivers() {
    if (this.props.nearDrivers.length !== 0) {
      return <NearDriverList nearDrivers={this.props.nearDrivers} onClickInfo={this.renderInfo} />
    }
    return (
      <p className="emptyDrivers">Ingresa una dirección nueva para encontrar rutas disponibles</p>
    )
  }

  render() {
    let elements = null
    if (this.state.detail) {
      elements = (
        <NearDriverDetail nearDriver={this.state.detailDriver} backDetail={this.backDetail} updateReservations={this.props.updateReservations} />
      )
    } else {
      elements = this.renderDrivers()
    }
    return (
      <Card className="routeInfoCard">
        <CardTitle className="routeInfoTitle">
          <AddLocation color="#fff" /> Info de la ruta
        </CardTitle>
        <CardText>{elements}</CardText>
        <CardActions />
      </Card>
    )
  }
}

export default RouteInfo
