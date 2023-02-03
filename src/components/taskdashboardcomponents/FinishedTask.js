import { ReactComponent as ThreeDotsIcon } from '../../img/dots.svg';
import React, { useState } from 'react';
import DeleteTaskPopup from '../popups/DeleteTaskPopup';
import * as apiCalls from '../../api/apiCalls';
import AuthContext from '../../misc/AuthContext';
import TaskContext from '../../misc/TaskContext';

const FinishedTask = (props) => {
    const contextType = React.useContext(AuthContext);
    const contextTypeTasks = React.useContext(TaskContext);
    const [isOpen, setIsOpen] = useState(false);

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    function changeStatusToUnChecked() {
        apiCalls.changeStatusTaskToFalse(contextType.getUser(), props.id).finally(contextTypeTasks.setTasks(contextType.getUser().data.name));
    }

    return <div className="finished-task">
        <div className='finished-task-line-1'>
            <div>{props.category}</div>
            <div className="task-three-dots" onClick={togglePopUp}><ThreeDotsIcon /></div>
        </div>
        <div className='finished-task-line-2'>
            <h1>{props.name}</h1>
            <label className='finished-task-checkbox'>
                <input type="checkbox" checked onChange={changeStatusToUnChecked} />
                <span className='checkmark'></span>
            </label>
        </div>
        {isOpen && <DeleteTaskPopup handleClose={togglePopUp} id={props.id} taskName={props.name} category={props.categoryId} deadlineDate={props.deadlineDate} deadlineTime={props.deadlineTime} refreshGlobalTasks={props.refreshGlobalTasks} />}
    </div>
}

export default FinishedTask;