import React, { useEffect, useState } from "react";
import SelectorContext from "../../misc/SelectorContext";
import TaskContext from "../../misc/TaskContext";

const ProgressTasks = () => {
    const contextTypeTasks = React.useContext(TaskContext);
    const contextTypeSelector = React.useContext(SelectorContext);

    const [isChangeTasks, setChangeTasks] = useState(false);

    const now = Date.now();
    const [tasksToday, setTasksToday] = useState([]);
    const [tasksDoneAmount, setTasksDoneAmount] = useState(0);
    const [tasksAmount, setTasksAmount] = useState(0);
    const oneDayInMs = 86400000;

    useEffect(() => {
        if (contextTypeTasks.refreshCall === false) {
            return;
        }
        setChangeTasks(true);
    }, [contextTypeTasks.refreshCall]);

    useEffect(() => {
        if (contextTypeSelector.selectorState !== "tasks" || contextTypeTasks.initialCall === false) {
            return;
        }
        setChangeTasks(true);
    }, [contextTypeSelector.selectorState, contextTypeTasks.initialCall]);

    function setProgressTasks() {
        let tasksTodayTemp = [];
        contextTypeTasks.getTasks().forEach((task) => {
            if (task.deadlineDate === null) {
                return;
            }
            const date = new Date(task.deadlineDate.split("T")[0] + "T" + task.deadlineTime).getTime();
            if ((now - date) > -oneDayInMs && task.status === false) {
                tasksTodayTemp.push(task);
            }
        }
        )
        setTasksToday(tasksTodayTemp);
        setTasksDoneAmount(contextTypeTasks.getTasks().filter(x => x.status === true).length);
        setTasksAmount(contextTypeTasks.getTasks().length);
    }

    if (isChangeTasks) {
        setChangeTasks(false);
        setProgressTasks();
    }

    return <div id="progress-tasks">
        <h2 id="progress-tasks-name">Progress</h2>
        <div id="progress-tasks-values">
            <div className="progress-task-value">
                <div className="progress-task-value-1">{tasksToday.length}</div>
                <div className="progress-task-value-2">tasks left today</div>
            </div>
            <div className="progress-task-value">
                <div className="progress-task-value-1">{tasksDoneAmount}/{tasksAmount}</div>
                <div className="progress-task-value-2">done</div>
            </div>
        </div>
    </div>
}

export default ProgressTasks;