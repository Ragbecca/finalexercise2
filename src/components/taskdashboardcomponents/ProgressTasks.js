import { useEffect, useState } from "react";

const ProgressTasks = (props) => {

    const now = Date.now();
    const [tasksToday, setTasksToday] = useState([]);
    const [refreshCall, setRefreshCall] = useState(true);
    const [tasksDoneAmount, setTasksDoneAmount] = useState(0);
    const [tasksAmount, setTasksAmount] = useState(0);
    const oneDayInMs = 86400000;

    useEffect(() => {
        setRefreshCall(true);
    }, [props.globalTasks])


    if (refreshCall) {
        setRefreshCall(false);
        findTasksToday();
        countTasksDoneAndAll();
    }

    function findTasksToday() {
        let tasksTodayTemp = [];
        props.globalTasks.forEach((task) => {
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
    }

    function countTasksDoneAndAll() {
        setTasksDoneAmount(props.globalTasks.filter(x => x.status === true).length);
        setTasksAmount(props.globalTasks.length);
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