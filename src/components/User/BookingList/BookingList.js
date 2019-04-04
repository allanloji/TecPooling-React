import React from 'react';
import Booking from '../Booking';
import './BookingList.css';
import {AssignmentTurnedIn} from '@material-ui/icons';
import PropTypes from "prop-types";

const BookingList = ({bookings}) => {

    return(
        <div>
            <p><AssignmentTurnedIn/>   Confirmacion</p>
            <ul className='listBookingList'>
                {bookings.map((booking, i) =>
                    <Booking key={i} {...booking} />
                )}
            </ul>
        </div>);
};

BookingList.propTypes = {
    bookings: PropTypes.arrayOf(PropTypes.shape({
        passenger: PropTypes.shape({
            firstName:PropTypes.string,
            lastName:PropTypes.string,
            tecIdentification:PropTypes.string,
            email:PropTypes.string,
            phone:PropTypes.string,
            phone2:PropTypes.string,
        }),
        comments:PropTypes.string
    }))
};

BookingList.defaultProps = {
    bookings: []
};

export default BookingList;
