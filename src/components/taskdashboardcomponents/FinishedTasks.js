import React, { useEffect, useState } from "react";
import FinishedTask from "./FinishedTask";
import TaskContext from "../../misc/TaskContext";
import SelectorContext from "../../misc/SelectorContext";
import { tasksLocation } from "../../misc/ConstantValues";

const FinishedTasks = (props) => {
    const contextTypeTasks = React.useContext(TaskContext);
    const contextTypeSelector = React.useContext(SelectorContext);
    const [tasks, setTasks] = useState([]);
    const [isChangeTasks, setChangeTasks] = useState(false);

    useEffect(() => {
        if (contextTypeTasks.refreshCall === false) {
            return;
        }
        setChangeTasks(true);
    }, [contextTypeTasks.refreshCall]);

    useEffect(() => {
        if (contextTypeSelector.selectorState !== tasksLocation || contextTypeTasks.initialCall === false) {
            return;
        }
        setChangeTasks(true);
    }, [contextTypeSelector.selectorState, contextTypeTasks.initialCall]);

    function findDoneTasks() {
        const taskList = contextTypeTasks.getTasks().filter((x) => x.status === true);
        setTasks(taskList);
    }

    if (isChangeTasks) {
        setChangeTasks(false);
        findDoneTasks();
    }


    return <div id="tasks-finished-shower">
        <div><h2 id="task-finished-header-name">Finished Tasks</h2></div>
        <div id="tasks-finished-scrollbar">
            {tasks.map(task => <FinishedTask id={task.id} name={task.taskName} categoryId={task.taskCategory.id} category={task.taskCategory.categoryName} key={task.id} deadlineDate={task.deadlineDate} deadlineTime={task.deadlineTime} />)}
        </div>
    </div>
}

export default FinishedTasks;