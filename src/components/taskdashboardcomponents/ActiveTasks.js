import { useState } from "react";
import SingleTask from "../dashboardcomponents/SingleTask";
import TasksCategoryTemp from '../../json/temp/TasksCategoryTemp.json';
import TaskSearch from './TaskSearch';
import CreateTaskPopup from "../popups/CreateTaskPopup";

const ActiveTasks = (props) => {

    const [tasks, setTasks] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [refreshCall, setRefreshCall] = useState(true);
    const [initialCall, setInitialCall] = useState(true);

    const [isOpen, setIsOpen] = useState(false);

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    function findActiveTasks() {
        let taskList = [];
        const newTaskList = [];
        props.globalTasks.forEach(task => {
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
        for (let index = 0; index < taskList.length; index++) {
            newTaskList.push(props.globalTasks.find(task => task.id === taskList[index].id));
        }
        let filteredTaskList = newTaskList;
        if (searchInput !== "") {
            filteredTaskList = newTaskList.filter((task) => task.category === searchInput);
        }
        setTasks(filteredTaskList);
    }

    if (initialCall) {
        setInitialCall(false);
        findActiveTasks();
    }

    if (refreshCall) {
        setRefreshCall(false);
        findActiveTasks();

    }


    return <div id="tasks-active-shower">
        <div><h2 id="task-active-header-name">My Tasks</h2></div>
        <div id="tasks-active-search">
            <TaskSearch name="All Tasks" activeSearch={searchInput} changeSearch={setSearchInput} key="0" refreshCall={setRefreshCall} />
            {TasksCategoryTemp.map(category => <TaskSearch name={category.categoryName} activeSearch={searchInput} changeSearch={setSearchInput} key={category.id} refreshCall={setRefreshCall} />)}
        </div>
        <div id="tasks-active-scrollbar">
            {tasks.length > 0 && tasks.map(task => <SingleTask className="task-active" name={task.name} category={task.category} key={task.id} date={task.date} time={task.time} />)}
            {tasks.length === 0 && <div>No Active Tasks in this Category</div>}
        </div>
        <div id="add-task"><span id="plus-icon" onClick={togglePopUp}>+<span className="plus-icon-tooltip">Add a Task</span></span></div>
        {isOpen && <CreateTaskPopup handleClose={togglePopUp} />}
    </div>
}

export default ActiveTasks;