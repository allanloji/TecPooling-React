import React, { Component } from 'react'
import './HistoryDetail.css'
import axios from 'axios'
import SideBar from '../../SideBar'
import HistoryDetailList from './HistoryDetailList/HistoryDetailList'
import Book from 'material-ui-icons/Book'
import HistoryDetailItem from "./HistoryDetailItem/HistoryDetailItem";
import PropTypes from "prop-types";

class HistoryDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { pastTrips: [] }
  }

  changeToSignUp() {
    if (!localStorage.getItem('accesstoken')) {
      this.props.history.push('/signup')
    }
  }

  componentWillMount() {
    this.changeToSignUp()
    //this.setState({pastTrips: null});
    let api = JSON.parse(localStorage.getItem('api'))
    let user = JSON.parse(localStorage.getItem('user'))
    axios.get(api.api + '/v1/users/' + user.uuid + '/bookings/history').then(res => {
      this.setState({ pastTrips: res.data })
    })
  }

  renderHistory() {
    if (this.state.pastTrips.length !== 0) {
      return <HistoryDetailList histories={this.state.pastTrips} />
    } else {
      return <p className="emptyHistory">No has realizado un viaje</p>
    }
  }

  render() {
    return (
      <div>
        <SideBar />
        <div className="historyDetailTitle">
          <p>Historial de Viajes</p>
          <div className="historyDetailCarTitle">
            <Book color="#FFF" />
          </div>
        </div>

        {this.renderHistory()}
      </div>
    )
  }
}

HistoryDetail.propTypes = {};

HistoryDetail.defaultProps = {

};

export default HistoryDetail
