import { ReactComponent as ThreeDotsIcon } from '../../img/dots.svg';
import EditTaskPopup from '../popups/EditTaskPopup';
import { useState } from 'react';

const SingleTask = (props) => {
    let beforeDifficulty = "#02653c;";
    let deadlineMoment = "";
    const now = Date.now();
    const date = new Date(props.date + "T" + props.time).getTime();

    const dateSplit = props.date.split("-").reverse();

    let correctDate = "";

    const [isOpen, setIsOpen] = useState(false);

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    for (let index = 0; index < dateSplit.length; index++) {
        correctDate = correctDate + dateSplit[index];
        if (index !== 2) {
            correctDate = correctDate + "-";
        }
    }


    if ((now - date) > 0) {
        beforeDifficulty = "#330033";
        deadlineMoment = "The deadline has expired";
    } else if ((now - date) > -86400000) {
        beforeDifficulty = "#ed1b24";
        const diffTime = Math.abs(now - date);
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
        deadlineMoment = "Deadline in " + diffHours + " hours";
    } else if ((now - date) > -604800000) {
        beforeDifficulty = "#ffbf00";
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        deadlineMoment = "Deadline in " + diffDays + " days";
    } else {
        beforeDifficulty = "#02653c";
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        deadlineMoment = "Deadline in " + diffDays + " days";
    }

    const difficulty = beforeDifficulty;

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
            <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={difficulty} viewBox="0 0 32 32"><path d="M16,0.5C7.45001,0.5,0.5,7.45001,0.5,16S7.45001,31.5,16,31.5S31.5,24.54999,31.5,16S24.54999,0.5,16,0.5z M14.5,23.5v-1.09003c0-0.83002,0.66998-1.5,1.5-1.5s1.5,0.66998,1.5,1.5V23.5c0,0.82996-0.66998,1.5-1.5,1.5S14.5,24.32996,14.5,23.5z M17.5,18.03998c0,0.82001-0.66998,1.5-1.5,1.5s-1.5-0.67999-1.5-1.5V8.5C14.5,7.66998,15.16998,7,16,7s1.5,0.66998,1.5,1.5V18.03998z" /></svg></div>
            <div className='task-deadline-moment'>{deadlineMoment}</div>
            <div className='task-line-4-subline'>{correctDate} {props.time}</div>
        </div>
        <div className='task-line-5'>
            <label className='task-line-5-container'>
                <input type="checkbox" />
                <span className='checkmark'></span>
            </label>
        </div>
        {isOpen && <EditTaskPopup id={props.id} handleClose={togglePopUp} taskName={props.name} category={props.category} deadlineDate={props.date} deadlineTime={props.time} />}
    </div>
}

export default SingleTask;