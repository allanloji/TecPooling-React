import React, {Component} from 'react';
import './HistoryDetailList.css';
import HistoryDetailItem from "../HistoryDetailItem/HistoryDetailItem";
import PropTypes from "prop-types";

const HistoryDetailList = ({histories}) => {

    return(
        <div className="historyDetailListDiv">
            <ul>
                {histories.map((history, i) =>
                    <HistoryDetailItem key={i} {...history}/>
                )}
            </ul>
        </div>);
};

HistoryDetailList.propTypes = {
    histories: PropTypes.arrayOf({
    schedule: PropTypes.shape({
        owner: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            tecIdentification: PropTypes.string,
            phone: PropTypes.string,
        }),
        car: PropTypes.shape({
            licensePlates: PropTypes.string,
            model: PropTypes.shape({
                name: PropTypes.string,
                parent: PropTypes.shape({
                    name: PropTypes.string
                }),
            }),
            color: PropTypes.shape({
                name: PropTypes.string
            }),
        }),
        day: PropTypes.shape({
            name: PropTypes.string
        }),
        hour: PropTypes.string,
        startingPoint: PropTypes.shape({
            name: PropTypes.string
        }),
        comments: PropTypes.string
    })
    })
};

HistoryDetailItem.defaultProps = {
    histories:[]
};

export default HistoryDetailList;