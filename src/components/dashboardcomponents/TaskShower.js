import { useState } from "react";
import SingleTask from "./SingleTask";
import tasksOld from "../../json/temp/TasksTemp.json"

const TaskShower = (props) => {

    const [tasks, setTasks] = useState([]);
    const [initialCall, setInitialCall] = useState(true);

    function findThreeTasksClosestBy() {
        let taskList = [];
        const newTaskList = [];
        tasksOld.forEach(task => {
            if (task.status) {
                return;
            }
            const taskMoment = new Date(task.date + "T" + task.time);
            const newTask = {
                "id": task.id,
                "date": taskMoment
            }
            taskList.push(newTask);
        })
        taskList.sort(function (a, b) {
            return a.date - b.date;
        });
        taskList = taskList.slice(0, 3);
        for (let index = 0; index < taskList.length; index++) {
            newTaskList.push(tasksOld.find(task => task.id === taskList[index].id));
        }
        setTasks(newTaskList);
    }

    if (initialCall) {
        findThreeTasksClosestBy();
        setInitialCall(false);
    }

    function changeSelectorStateToTasks() {
        props.changeSelectorState("tasks");
    }


    return <div id="dashboard-task-shower">
        <div id="task-shower-header">
            <div><h2 id="task-shower-header-name">My Tasks</h2></div>
            <div className="clickable-link" onClick={changeSelectorStateToTasks}>See all</div>
        </div>
        {tasks.map((task) => {
            return <SingleTask key={task.id} id={task.id} name={task.name} category={task.category} time={task.time} date={task.date} />
        })}
        <div id="add-task"><span id="plus-icon">+</span></div>
    </div>
}

export default TaskShower;