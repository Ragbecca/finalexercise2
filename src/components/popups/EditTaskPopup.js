import React from "react";
import InputLabelTop from "../misccomponents/InputLabelTop";
import { useState } from "react";
import CategorySelector from "../misccomponents/CategorySelector";
import ButtonWithProgress from "../misccomponents/ButtonWithProgress";

const EditTaskPopup = props => {
    const [taskName, setTaskName] = useState(props.taskName);
    const [category, setCategory] = useState(props.categoryId);
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

    function onClickCreateTask() {
        let body = {};
        if (deadlineDate !== '' && deadlineTime !== '') {
            body = {
                username: props.user.username,
                taskName: taskName,
                taskCategory: category,
                deadlineDate: deadlineDate,
                deadlineTime: deadlineTime
            }
        } else {
            if (deadlineDate !== '') {
                body = {
                    username: props.user.username,
                    taskName: taskName,
                    taskCategory: category,
                    deadlineDate: deadlineDate
                }
            } else if (deadlineTime !== '') {
                body = {
                    username: props.user.username,
                    taskName: taskName,
                    taskCategory: category,
                    deadlineTime: deadlineTime
                }
            } else {
                body = {
                    username: props.user.username,
                    taskName: taskName,
                    taskCategory: category,
                }
            }
            console.log(body);
        }
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
                    <CategorySelector onChange={onChangeCategory} currentValue={category} />
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
                        text="Edit Task"
                        classes="create-task-button" />
                </div>
            </div>
        </div>
    );
};

export default EditTaskPopup;