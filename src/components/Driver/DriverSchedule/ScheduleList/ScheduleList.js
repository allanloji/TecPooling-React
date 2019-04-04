import React from "react";
import "./ScheduleList.css";
import Schedule from "../Schedule/Schedule";
import { List } from "material-ui/List";

const ScheduleList = ({ schedules, refreshSchedule }) => {
  return (
    <div>
      <List>
        {schedules.map((schedule, i) => <Schedule key={i} {...schedule}  refreshSchedule={refreshSchedule}/>)}
      </List>
    </div>
  );
};
export default ScheduleList;
