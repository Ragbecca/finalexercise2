import React, { useState, useEffect } from "react";
import SingleTask from "../dashboardcomponents/SingleTask";
import TaskSearch from './TaskSearch';
import CreateTaskPopup from "../popups/CreateTaskPopup";
import * as apiCalls from '../../api/apiCalls';
import AuthContext from "../../misc/AuthContext";

const ActiveTasks = (props) => {
    const contextType = React.useContext(AuthContext);

    const [tasks, setTasks] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [initialCall, setInitialCall] = useState(true);
    const [taskCategories, setTaskCategories] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    function findCategories() {
        apiCalls.getTaskCategories(contextType.getUser()).then(result => setTaskCategories(result.data));
    }

    function findActiveTasks() {
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
        });

        taskList.map(t => newTaskList.push(props.globalTasks.find(task => task.id === t.id)));
        setTasks(newTaskList);
    }

    if (initialCall) {
        setInitialCall(false);
        findCategories();
    }


    useEffect(() => {
        function findActiveTasks() {
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
            });

            taskList.map(t => newTaskList.push(props.globalTasks.find(task => task.id === t.id)));

            if (searchInput !== "") {
                newTaskList = newTaskList.filter(t => t.taskCategory.categoryName === searchInput);
            }

            setTasks(newTaskList);
        }
        findActiveTasks();
    }, [props.globalTasks, searchInput])


    return <div id="tasks-active-shower">
        <div><h2 id="task-active-header-name">My Tasks</h2></div>
        <div id="tasks-active-search">
            <TaskSearch name="All Tasks" activeSearch={searchInput} changeSearch={setSearchInput} key="0" />
            {taskCategories.map(category => <TaskSearch name={category.categoryName} activeSearch={searchInput} changeSearch={setSearchInput} key={category.id} />)}
        </div>
        <div id="tasks-active-scrollbar">
            {tasks.length > 0 && tasks.map(task => <SingleTask className="task-active" id={task.id} name={task.taskName} category={task.taskCategory.categoryName} key={task.id} date={task.deadlineDate} time={task.deadlineTime} refreshGlobalTasks={props.refreshGlobalTasks} />)}
            {tasks.length === 0 && <div>No Active Tasks in this Category</div>}
        </div>
        <div className="add-task"><span className="icon" onClick={togglePopUp}>+<span className="icon-tooltip">Add a Task</span></span></div>
        {isOpen && <CreateTaskPopup handleClose={togglePopUp} refreshGlobalTasks={props.refreshGlobalTasks} />}
    </div>
}

export default ActiveTasks;