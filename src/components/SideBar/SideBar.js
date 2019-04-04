import React from 'react'
import './SideBar.css'
import { AccountCircle, AddLocation, LocalTaxi, HighlightOff } from '@material-ui/icons'
import Divider from 'material-ui/Divider'
import { Link } from 'react-router-dom'
import Profile from "../Profile/Profile";

const SideBar = () => {
  return (
    <div className="sideBarContainer">
      <p className="sideBarTitle">TecPooling</p>
      <Divider />
      <ul className="sideBarList">
        <Link to="/">
          <li>
            <AddLocation color="#FFF" className="sideBarIcon" />Inicio
          </li>
        </Link>

        <Link to={'/homedriver/' + JSON.parse(localStorage.getItem('user')).uuid}>
          <li>
            <LocalTaxi color="#FFF" className="sideBarIcon" />Conductor
          </li>
        </Link>
        <Link to={'/profile/' + JSON.parse(localStorage.getItem('user')).uuid}>
          <li>
            <AccountCircle color="#FFF" className="sideBarIcon" />Perfil
          </li>
        </Link>
          <li
              onClick={() => {
                  localStorage.removeItem("accesstoken");
                  window.location.href = "http://10.48.213.246:9999/logout";
              }
              }
          >
            <HighlightOff color="#FFF" className="sideBarIcon" />Cerrar Sesion
          </li>
      </ul>
    </div>
  )
}

SideBar.propTypes = {

}

SideBar.defaultProps = {
}

export default SideBar
