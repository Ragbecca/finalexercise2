import { useState } from "react";
import FinishedTask from "./FinishedTask";

const FinishedTasks = (props) => {

    const [tasks, setTasks] = useState([]);
    const [initialCall, setInitialCall] = useState(true);

    function findDoneTasks() {
        const taskList = props.globalTasks.filter((x) => x.status === true);
        setTasks(taskList);
    }

    if (initialCall) {
        setInitialCall(false);
        findDoneTasks();
    }


    return <div id="tasks-finished-shower">
        <div><h2 id="task-finished-header-name">Finished Tasks</h2></div>
        <div id="tasks-finished-scrollbar">
            {tasks.map(task => <FinishedTask name={task.name} category={task.category} key={task.id} />)}
        </div>
    </div>
}

export default FinishedTasks;