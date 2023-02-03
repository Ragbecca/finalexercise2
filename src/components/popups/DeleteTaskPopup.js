import React from "react";
import InputLabelTop from "../misccomponents/InputLabelTop";
import CategorySelector from "../misccomponents/CategorySelector";
import ButtonWithProgress from "../misccomponents/ButtonWithProgress";
import * as apiCalls from "../../api/apiCalls";
import AuthContext from "../../misc/AuthContext";
import TaskContext from "../../misc/TaskContext";

const DeleteTaskPopup = props => {
    const contextType = React.useContext(AuthContext);
    const contextTypeTasks = React.useContext(TaskContext);

    function onClickDeleteTask() {
        apiCalls.deleteTask(contextType.getUser(), props.id).then(props.handleClose)
            .finally(contextTypeTasks.setTasks(contextType.getUser().data.name));
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
                        value={props.taskName} disabled={true} />
                </div>
                <div className="popup-line-2">
                    <CategorySelector currentValue={props.category} disabled={true} />
                </div>
                <div className="popup-line-3">
                    <InputLabelTop label="Deadline date"
                        type="date"
                        value={props.deadlineDate.split("T")[0]} disabled={true} />
                    <InputLabelTop label="Deadline time"
                        type="time"
                        value={props.deadlineTime} disabled={true} />
                </div>
                <div className="popup-line-5">
                    <ButtonWithProgress onClick={onClickDeleteTask}
                        text="Delete Task"
                        classes="create-task-button" />
                </div>
            </div>
        </div>
    );
};

export default DeleteTaskPopup;