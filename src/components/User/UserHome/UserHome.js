import React, {Component} from 'react';
import './UserHome.css';
import UserReservation from '../UserReservation';
import History from '../History';
import UserRoute from '../UserRoute';
import SideBar from '../../SideBar';
import queryString from "query-string";
import axios from "axios";

class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state = {user:null, reservations:[]};
        this.updateReservations = this.updateReservations.bind(this);
    }


    changeToSignUp(){
        if(!localStorage.getItem('accesstoken')) {
            this.props.history.push('/signup');
        }
    }

    componentWillMount(){
        this.changeToSignUp();
        let user = JSON.parse(localStorage.getItem("user"));
        let api = JSON.parse(localStorage.getItem("api"));
        axios.get(api.api + "/v1/users/" + user.uuid).then(res => {
            this.setState({
                user:res.data
            });
        });
        axios.get(api.api + '/v1/users/' + user.uuid + '/requests/passenger').then(res => {
            this.setState({ reservations: res.data })
        })

    }

    updateReservations(){
        let api = JSON.parse(localStorage.getItem('api'));
        axios.get(api.api + '/v1/users/' + this.state.user.uuid + '/requests/passenger').then(res => {
            this.setState({ reservations: res.data })
        })
    }

    render() {
        let user = this.state.user;
        if(!user){
            user = {first_name: ""};
        }
        return (
            <div className="container">
                <div>
                    <SideBar/>
                    <div className='userHomeContainer'>
                        <h1 className='homeTitle'>Bienvenido {user.firstName}</h1>
                        <UserRoute updateReservations={this.updateReservations} />
                        <div className='userSectionsContainer'>
                            <UserReservation reservations={this.state.reservations}>

                            </UserReservation>
                            <History/>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

export default UserHome;