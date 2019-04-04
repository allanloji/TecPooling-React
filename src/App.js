import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Signup from './components/Signup'
import UserHome from './components/User/UserHome'
import DriverCar from './components/Driver/DriverCar'
import DriverHome from './components/Driver/DriverHome'
import Profile from './components/Profile'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DriverSchedule from './components/Driver/DriverSchedule'
import HistoryDetail from './components/User/HistoryDetail/HistoryDetail'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    // const user = { uuid: '506563d8-af8d-4d54-b292-a6b49792fcda' }
    const apiAdrr = { api: 'http://10.48.213.246:8080' }
    const auth = { auth: 'http://10.48.213.246:9999' }
    // localStorage.setItem('user')
    localStorage.setItem('api', JSON.stringify(apiAdrr))
    localStorage.setItem('auth', JSON.stringify(auth))
  }

  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <MuiThemeProvider>
            <Switch>
              <Route exact path="/" component={UserHome} />
              <Route path="/signup" component={Signup} />
              <Route path="/homedriver/:uuid" component={DriverHome} />
              <Route path="/cars/:uuid" component={DriverCar} />
              <Route path="/schedules/:uuid" component={DriverSchedule} />
              <Route path="/profile/:uuid" component={Profile} />
              <Route path="/historyDetail/:uuid" component={HistoryDetail} />
              <Redirect from="*" to="/" />
            </Switch>
          </MuiThemeProvider>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
