import React, { useEffect, useState } from "react";
import SingleTask from "./SingleTask";
import CreateTaskPopup from "../popups/CreateTaskPopup";
import TaskContext from "../../misc/TaskContext";
import SelectorContext from "../../misc/SelectorContext";

const TaskContainer = (props) => {
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
        if (contextTypeSelector.selectorState !== "dashboard" || contextTypeTasks.initialCall === false) {
            return;
        }
        setChangeTasks(true);
    }, [contextTypeSelector.selectorState]);

    if (isChangeTasks) {
        setChangeTasks(false);
        findThreeTasksClosestBy();
    }

    function findThreeTasksClosestBy() {
        let newTaskList = [];
        let taskList = [];
        contextTypeTasks.getTasks().filter(t => !t.status).forEach(t => {
            if (t.deadlineDate !== null) {
                taskList.push({
                    "id": t.id,
                    "date": new Date(t.deadlineDate.split("T")[0] + "T" + t.deadlineTime)
                });
            } else {
                taskList.push({
                    "id": t.id,
                    "date": undefined
                });
            }
        });
        taskList = taskList.sort(function (a, b) {
            if (a.date === undefined) return 1;
            if (b.date === undefined) return -1;
            return a.date - b.date;
        }).slice(0, 3);

        taskList.map(t => newTaskList.push(contextTypeTasks.getTasks().find(task => task.id === t.id)));
        setTasks(newTaskList);
    }

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    function changeSelectorStateToTasks() {
        contextTypeSelector.setSelectorState("tasks")
    }


    return <div id="dashboard-task-shower">
        <div id="task-shower-header">
            <div><h2 id="task-shower-header-name">My Tasks</h2></div>
            <div className="clickable-link" onClick={changeSelectorStateToTasks}>See all</div>
        </div>
        {tasks.map((task) => {
            return <SingleTask key={task.id} id={task.id} name={task.taskName} categoryId={task.taskCategory.id} category={task.taskCategory.categoryName} time={task.deadlineTime} date={task.deadlineDate} />
        })}
        <div className="add-task"><span className="icon" onClick={togglePopUp}>+<span className="icon-tooltip">Add a Task</span></span></div>
        {isOpen && <CreateTaskPopup handleClose={togglePopUp} />}
    </div>
}

export default TaskContainer;