import { useEffect, useState } from "react";
import SingleTask from "./SingleTask";
import CreateTaskPopup from "../popups/CreateTaskPopup";

const TaskContainer = (props) => {

    const [tasks, setTasks] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        function findThreeTasksClosestBy() {
            let newTaskList = [];
            let taskList = [];
            props.globalTasks.filter(t => !t.status).forEach(t => {
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

            taskList.map(t => newTaskList.push(props.globalTasks.find(task => task.id === t.id)));
            setTasks(newTaskList);
        }
        findThreeTasksClosestBy();
    }, [props.globalTasks])


    function changeSelectorStateToTasks() {
        props.changeSelectorState("tasks");
    }


    return <div id="dashboard-task-shower">
        <div id="task-shower-header">
            <div><h2 id="task-shower-header-name">My Tasks</h2></div>
            <div className="clickable-link" onClick={changeSelectorStateToTasks}>See all</div>
        </div>
        {tasks.map((task) => {
            return <SingleTask key={task.id} id={task.id} name={task.taskName} categoryId={task.taskCategory.id} category={task.taskCategory.categoryName} time={task.deadlineTime} date={task.deadlineDate} refreshGlobalTasks={props.refreshGlobalTasks} />
        })}
        <div className="add-task"><span className="icon" onClick={togglePopUp}>+<span className="icon-tooltip">Add a Task</span></span></div>
        {isOpen && <CreateTaskPopup handleClose={togglePopUp} refreshGlobalTasks={props.setRefreshGlobalTasks} />}
    </div>
}

export default TaskContainer;