import React, { useEffect, useState } from "react";
import SingleTask from "./SingleTask";
import CreateTaskPopup from "../popups/CreateTaskPopup";
import TaskContext from "../../misc/TaskContext";
import SelectorContext from "../../misc/SelectorContext";
import { dashboard, dashboardLocation, tasksLocation } from "../../misc/ConstantValues";

const TaskContainer = () => {
    const contextTypeTasks = React.useContext(TaskContext);
    const contextTypeSelector = React.useContext(SelectorContext);

    const [tasks, setTasks] = useState([]);
    const [isChangeTasks, setChangeTasks] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (contextTypeTasks.refreshCall === false) {
            return;
        }
        setChangeTasks(true);
    }, [contextTypeTasks.refreshCall]);

    useEffect(() => {
        if (contextTypeSelector.selectorState !== dashboardLocation || contextTypeTasks.initialCall === false) {
            return;
        }
        setChangeTasks(true);
    }, [contextTypeSelector.selectorState]);

    const dateStringToDate = (date, time) => new Date(date.split("T")[0] + "T" + time);

    const sortOnDeadLine = (a, b) => {
        if (a.deadlineDate === null) {
            if (b.deadlineDate === null) return a.taskName.localeCompare(b.taskName);
            else return 1;
        }
        if (b.deadlineDate === null) return -1;
        return dateStringToDate(a.deadlineDate, a.deadlineTime) - dateStringToDate(b.deadlineDate, b.deadlineTime);
    }

    if (isChangeTasks) {
        setChangeTasks(false);
        findThreeTasksClosestBy();
    }

    function findThreeTasksClosestBy() {
        const taskList = contextTypeTasks.getTasks().filter(t => !t.status).sort(sortOnDeadLine).slice(0, 3);
        setTasks(taskList);
    }

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    function changeSelectorStateToTasks() {
        contextTypeSelector.setSelectorState(tasksLocation);
    }


    return <div id="dashboard-task-shower">
        <div id="task-shower-header">
            <div><h2 id="task-shower-header-name">My Tasks</h2></div>
            <div className="clickable-link" onClick={changeSelectorStateToTasks}>See all</div>
        </div>
        {tasks.map((task) => {
            return <SingleTask key={task.id} id={task.id} name={task.taskName} categoryId={task.taskCategory.id} category={task.taskCategory.categoryName} time={task.deadlineTime} date={task.deadlineDate} selectorOrigin={dashboardLocation} />
        })}
        <div className="add-task"><span className="icon" onClick={togglePopUp}>+<span className="icon-tooltip">Add a Task</span></span></div>
        {isOpen && <CreateTaskPopup handleClose={togglePopUp} />}
    </div>
}

export default TaskContainer;