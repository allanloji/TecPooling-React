import React from 'react';
import PastTrip from '../PastTrip/index';
import './PastTripList.css';

const PastTripList = ({pastTrips}) => {

    return(
        <div className="divPastTripList">
            <ul className='listPastTripList'>
                {pastTrips.map((pastTrip, i) =>
                    <PastTrip key={i} {...pastTrip} />
                )}
            </ul>
        </div>);
};

export default PastTripList;
