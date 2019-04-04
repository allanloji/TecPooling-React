import React from "react";
import "./RequestList.css";
import Request from "../Request/Request";
import { List } from "material-ui/List";
import BookingList from "../../DriverBookings/BookingList/BookingList";
import PropTypes from "prop-types";

const RequestList = ({ requests }) => {
  return (
    <div>
      <List>
        {requests.map((request, i) => <Request key={i} {...request} />)}
      </List>
    </div>
  );
};

RequestList.propTypes = {
    requests: PropTypes.arrayOf(PropTypes.shape({
        passenger: PropTypes.shape({
            firstName:PropTypes.string,
            lastName:PropTypes.string,
            tecIdentification:PropTypes.string,
            email:PropTypes.string,
            phone:PropTypes.string,
            phone2:PropTypes.string,
        }),
        status: PropTypes.shape({
            name:PropTypes.string,
        }),
        comments:PropTypes.string
    }))
};

RequestList.defaultProps = {
    requests: []
};

export default RequestList;
