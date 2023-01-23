import { ReactComponent as ThreeDotsIcon } from '../../img/dots.svg';
import { useState } from 'react';
import DeleteTaskPopup from '../popups/DeleteTaskPopup';

const FinishedTask = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    return <div className="finished-task">
        <div className='finished-task-line-1'>
            <div>{props.category}</div>
            <div className="task-three-dots" onClick={togglePopUp}><ThreeDotsIcon /></div>
        </div>
        <div className='finished-task-line-2'>
            <h1>{props.name}</h1>
            <label className='finished-task-checkbox'>
                <input type="checkbox" checked disabled />
                <span className='checkmark'></span>
            </label>
        </div>
        {isOpen && <DeleteTaskPopup handleClose={togglePopUp} taskName={props.name} category={props.category} deadlineDate={props.deadlineDate} deadlineTime={props.deadlineTime} />}
    </div>
}

export default FinishedTask;