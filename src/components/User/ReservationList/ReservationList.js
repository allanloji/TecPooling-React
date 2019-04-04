import React from 'react';
import Reservation from '../Reservation/index';
import './ReservationList.css';
import {Announcement} from '@material-ui/icons';

const ReservationList = ({reservations, changeReservations}) => {

    return(
        <div>
            <p><Announcement/>   Peticiones</p>
            <ul className='listReservationList'>
                {reservations.map((reservation, i) =>
                    <Reservation key={i} {...reservation} changeReservations={changeReservations} />
                )}
            </ul>
        </div>);
};

export default ReservationList;
