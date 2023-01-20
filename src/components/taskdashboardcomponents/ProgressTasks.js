const ProgressTasks = (props) => {

    const now = Date.now();
    let tasksToday = [];
    let tasksDoneAmount = 0;
    let tasksAmount = 0;

    function findTasksToday() {
        props.globalTasks.forEach((task) => {
            const date = new Date(task.date + "T" + task.time).getTime();
            if ((now - date) > -86400000 && (now - date) < 0 && task.status === false) {
                tasksToday.push(task);
            }
        }
        )
    }

    function countTasksDoneAndAll() {
        tasksDoneAmount = props.globalTasks.filter(x => x.status === true).length;
        tasksAmount = props.globalTasks.length;
    }

    findTasksToday();
    countTasksDoneAndAll();

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