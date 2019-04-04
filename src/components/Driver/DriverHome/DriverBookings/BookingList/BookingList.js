import React from "react";
import "./BookingList.css";
import Booking from "../Booking/Booking";
import { List } from "material-ui/List";
import CarList from "../../../DriverCar/CarList/CarList";
import PropTypes from "prop-types";

const BookingList = ({ bookings }) => {
  return (
    <div>
      <List>
        {bookings.map((booking, i) => <Booking key={i} {...booking} />)}
      </List>
    </div>
  );
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
