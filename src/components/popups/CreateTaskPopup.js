import React from "react";
import InputLabelTop from "../misccomponents/InputLabelTop";
import { useState } from "react";
import CategorySelector from "../misccomponents/CategorySelector";
import ButtonWithProgress from "../misccomponents/ButtonWithProgress";
import AuthContext from "../../misc/AuthContext";
import * as apiCalls from "../../api/apiCalls";
import TaskContext from "../../misc/TaskContext";

const CreateTaskPopup = props => {
    const contextType = React.useContext(AuthContext);
    const contextTypeTasks = React.useContext(TaskContext);

    const [taskName, setTaskName] = useState('');
    const [category, setCategory] = useState();
    const [deadlineDate, setDeadlineDate] = useState('');
    const [deadlineTime, setDeadlineTime] = useState('');

    function onChangeName(event) {
        setTaskName(event.target.value);
    }

    function onChangeDeadlineDate(event) {
        setDeadlineDate(event.target.value);
    }

    function onChangeDeadlineTime(event) {
        setDeadlineTime(event.target.value);
    }

    function onChangeCategory(event) {
        setCategory(event);
    }

    async function onClickCreateTask() {
        let body = {
            taskName: taskName,
            taskCategoryId: category,
            username: contextType.getUser().data.name
        };
        if (deadlineDate !== '' && deadlineTime !== '') {
            body = {
                ...body,
                deadlineDate: deadlineDate,
                deadlineTime: deadlineTime
            }
        }
        await apiCalls.addTask(contextType.getUser(), body).then(props.handleClose)
            .finally(contextTypeTasks.setTasks('ragbecca'));
    }

    let disableSubmit = false;
    if (taskName === '' || category === undefined) {
        disableSubmit = true;
    }

    return (
        <div className="popup-box">
            <div className="box">
                <div className="popup-header">
                    <div>Add a Task</div>
                    <div className="close-icon" onClick={props.handleClose}>X</div>
                </div>
                <div className="popup-line-1">
                    <InputLabelTop
                        label="Name task"
                        mandatory={true}
                        value={taskName} onChange={onChangeName} />
                </div>
                <div className="popup-line-2">
                    <CategorySelector onChange={onChangeCategory} />
                </div>
                <div className="popup-line-3">
                    <InputLabelTop label="Deadline date"
                        type="date"
                        value={deadlineDate} onChange={onChangeDeadlineDate} />
                    <InputLabelTop label="Deadline time"
                        type="time"
                        value={deadlineTime} onChange={onChangeDeadlineTime} />
                </div>
                <div className="popup-line-4">Mandatory field<span className="red-color">*</span></div>
                <div className="popup-line-5">
                    <ButtonWithProgress onClick={onClickCreateTask}
                        disabled={disableSubmit}
                        text="Create Task"
                        classes="create-task-button" />
                </div>
            </div>
        </div>
    );
};

export default CreateTaskPopup;