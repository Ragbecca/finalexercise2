import React from "react";
import InputLabelTop from "../misccomponents/InputLabelTop";
import { useState } from "react";
import CategorySelector from "../misccomponents/CategorySelector";
import ButtonWithProgress from "../misccomponents/ButtonWithProgress";
import AuthContext from "../../misc/AuthContext";
import * as apiCalls from "../../api/apiCalls";
import TaskContext from "../../misc/TaskContext";

const EditTaskPopup = props => {
    const contextType = React.useContext(AuthContext);
    const contextTypeTasks = React.useContext(TaskContext);

    const [taskName, setTaskName] = useState(props.taskName);
    const [category, setCategory] = useState(props.category);
    const [deadlineDate, setDeadlineDate] = useState(props.deadlineDate.split("T")[0]);
    const [deadlineTime, setDeadlineTime] = useState(props.deadlineTime);

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

    async function onClickEditTask() {
        let body = {};
        body = {
            id: props.id,
            username: contextType.getUser().data.name,
            taskName: taskName,
            taskCategoryId: category,
        }
        if (deadlineDate !== '') {
            if (deadlineTime !== '') {
                body = {
                    ...body,
                    deadlineDate: deadlineDate,
                    deadlineTime: deadlineTime
                }
            } else {
                body = {
                    ...body,
                    deadlineDate: deadlineDate,
                }
            }
        }
        await apiCalls.editTask(contextType.getUser(), body).then(props.handleClose)
            .finally(contextTypeTasks.setTasks(contextType.getUser().data.name));

    }

    let disableSubmit = false;
    if (taskName === '' || category === '') {
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
                    <CategorySelector onChange={onChangeCategory} currentValue={category} selectorOrigin={props.selectorOrigin} />
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
                    <ButtonWithProgress onClick={onClickEditTask}
                        disabled={disableSubmit}
                        text="Edit Task"
                        classes="create-task-button" />
                </div>
            </div>
        </div>
    );
};

export default EditTaskPopup;