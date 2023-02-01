import { ReactComponent as ThreeDotsIcon } from '../../img/dots.svg';
import EditTaskPopup from '../popups/EditTaskPopup';
import { useState } from 'react';
import { greenColor, purpleColor, redColor, yellowColor, blueColor } from '../../misc/Colors';
import AuthContext from '../../misc/AuthContext';
import React from 'react';
import * as apiCalls from '../../api/apiCalls';

const SingleTask = (props) => {
    const contextType = React.useContext(AuthContext);
    let difficultyColorCode = "#000000";
    const oneDayInMs = 86400000;
    const oneHourInMs = 3600000;
    let deadlineMoment = "";
    const now = Date.now();
    let date = undefined;
    let dateSplit = "No deadline";

    if (props.date !== null) {
        date = new Date(props.date.split("T")[0] + "T" + props.time).getTime();
        dateSplit = props.date.split("T")[0].split("-").reverse().join("-");
    }

    const [isOpen, setIsOpen] = useState(false);

    function togglePopUp() {
        setIsOpen(!isOpen);
    }
    if (date === undefined) {
        difficultyColorCode = blueColor;
        deadlineMoment = "No deadline";
    } else if ((now - date) > 0) {
        difficultyColorCode = purpleColor;
        deadlineMoment = "The deadline has expired";
    } else if ((now - date) > -oneDayInMs) {
        difficultyColorCode = redColor;
        const diffHours = Math.ceil((Math.abs(now - date)) / oneHourInMs);
        deadlineMoment = "Deadline in " + diffHours + " hours";
    } else if ((now - date) > (-oneDayInMs * 7)) {
        difficultyColorCode = yellowColor;
        const diffDays = Math.ceil((Math.abs(now - date)) / oneDayInMs);
        deadlineMoment = "Deadline in " + diffDays + " days";
    } else {
        difficultyColorCode = greenColor;
        const diffDays = Math.ceil((Math.abs(now - date)) / oneDayInMs);
        deadlineMoment = "Deadline in " + diffDays + " days";
    }

    function changeStatusToChecked() {
        apiCalls.changeStatusTaskToTrue(contextType.getUser(), props.id).then(props.refreshGlobalTasks(true));
    }

    return <div className={"task-shower-task " + props.class}>
        <div className='task-line-1'>
            <div className="task-three-dots" onClick={togglePopUp}><ThreeDotsIcon /></div>
        </div>
        <div className='task-line-2'>
            {props.category}
        </div>
        <div className='task-line-3'>
            <h1>{props.name}</h1>
        </div>
        <div className='task-line-4'>
            <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={difficultyColorCode} viewBox="0 0 32 32"><path d="M16,0.5C7.45001,0.5,0.5,7.45001,0.5,16S7.45001,31.5,16,31.5S31.5,24.54999,31.5,16S24.54999,0.5,16,0.5z M14.5,23.5v-1.09003c0-0.83002,0.66998-1.5,1.5-1.5s1.5,0.66998,1.5,1.5V23.5c0,0.82996-0.66998,1.5-1.5,1.5S14.5,24.32996,14.5,23.5z M17.5,18.03998c0,0.82001-0.66998,1.5-1.5,1.5s-1.5-0.67999-1.5-1.5V8.5C14.5,7.66998,15.16998,7,16,7s1.5,0.66998,1.5,1.5V18.03998z" /></svg></div>
            <div className='task-deadline-moment'>{deadlineMoment}</div>
            <div className='task-line-4-subline'>{dateSplit} {props.time}</div>
        </div>
        <div className='task-line-5'>
            <label className='task-line-5-container'>
                <input type="checkbox" onClick={changeStatusToChecked} />
                <span className='checkmark'></span>
            </label>
        </div>
        {isOpen && <EditTaskPopup id={props.id} handleClose={togglePopUp} taskName={props.name} categoryId={props.categoryId} deadlineDate={props.date} deadlineTime={props.time} />}
    </div>
}

export default SingleTask;