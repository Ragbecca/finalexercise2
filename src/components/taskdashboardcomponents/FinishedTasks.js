import { useEffect, useState } from "react";
import FinishedTask from "./FinishedTask";

const FinishedTasks = (props) => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        function findDoneTasks() {
            const taskList = props.globalTasks.filter((x) => x.status === true);
            setTasks(taskList);
        }
        findDoneTasks();
    }, [props.globalTasks])


    return <div id="tasks-finished-shower">
        <div><h2 id="task-finished-header-name">Finished Tasks</h2></div>
        <div id="tasks-finished-scrollbar">
            {tasks.map(task => <FinishedTask id={task.id} name={task.taskName} categoryId={task.taskCategory.id} category={task.taskCategory.categoryName} key={task.id} deadlineDate={task.deadlineDate} deadlineTime={task.deadlineTime} refreshGlobalTasks={props.refreshGlobalTasks} />)}
        </div>
    </div>
}

export default FinishedTasks;