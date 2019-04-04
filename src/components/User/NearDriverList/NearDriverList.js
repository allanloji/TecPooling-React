import React from 'react';
import NearDriver from '../NearDriver/index';
import './NearDriverList.css';
import NearDriverDetail from "../NearDriverDetail/NearDriverDetail";
import PropTypes from "prop-types";

const NearDriverList = ({nearDrivers, onClickInfo}) => {

    return(
        <div className="nearDriverListDiv">
            <ul className='listNearDriversList'>
                {nearDrivers.map((nearDriver, i) =>
                    <NearDriver key={i} {...nearDriver} onClickInfo={onClickInfo}/>
                )}
            </ul>
        </div>);
};

export default NearDriverList;

NearDriverList.propTypes = {
    backDetail: PropTypes.func,
    nearDriver: PropTypes.shape({
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
    }),
};