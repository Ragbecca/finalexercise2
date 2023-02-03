import React, { useState, useEffect } from "react";
import SingleTask from "../dashboardcomponents/SingleTask";
import TaskSearch from './TaskSearch';
import CreateTaskPopup from "../popups/CreateTaskPopup";
import AuthContext from "../../misc/AuthContext";
import TaskContext from "../../misc/TaskContext";
import SelectorContext from "../../misc/SelectorContext";
import CategoryContext from "../../misc/CategoryContext";

const ActiveTasks = () => {
    const contextType = React.useContext(AuthContext);
    const contextTypeTasks = React.useContext(TaskContext);
    const contextTypeSelector = React.useContext(SelectorContext);
    const contextTypeCategory = React.useContext(CategoryContext);

    const [tasks, setTasks] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [taskCategories, setTaskCategories] = useState([]);
    const [isChangeTasks, setChangeTasks] = useState(false);
    const [isChangeCategories, setChangeCategories] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

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
    }, [contextTypeSelector.selectorState, contextTypeTasks.initialCall, searchInput]);

    useEffect(() => {
        if (contextTypeCategory.refreshCall === false) {
            return;
        }
        setChangeCategories(true);
    }, [contextTypeCategory.refreshCall]);

    useEffect(() => {
        if (contextTypeSelector.selectorState !== "tasks" || contextTypeCategory.initialCall === false) {
            return;
        }
        setChangeCategories(true);
    }, [contextTypeSelector.selectorState, contextTypeCategory.initialCall]);

    function findActiveTasks() {
        let newTaskList = [];
        let taskList = [];
        contextTypeTasks.getTasks().filter(t => !t.status).forEach(t => {
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

        taskList.map(t => newTaskList.push(contextTypeTasks.getTasks().find(task => task.id === t.id)));
        if (searchInput !== "") {
            console.log(newTaskList);
            newTaskList = newTaskList.filter(task => task.taskCategory.categoryName === searchInput);
        }
        setTasks(newTaskList);
    }

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    if (isChangeTasks) {
        setChangeTasks(false);
        findActiveTasks();
    }

    if (isChangeCategories) {
        setChangeCategories(false);
        setTaskCategories(contextTypeCategory.getCategories());
    }


    return <div id="tasks-active-shower">
        <div><h2 id="task-active-header-name">My Tasks</h2></div>
        <div id="tasks-active-search">
            <TaskSearch name="All Tasks" activeSearch={searchInput} changeSearch={setSearchInput} key="0" />
            {taskCategories.map(category => <TaskSearch name={category.categoryName} activeSearch={searchInput} changeSearch={setSearchInput} key={category.id} />)}
        </div>
        <div id="tasks-active-scrollbar">
            {tasks.length > 0 && tasks.map(task => <SingleTask className="task-active" id={task.id} name={task.taskName} categoryId={task.taskCategory.id} category={task.taskCategory.categoryName} key={task.id} date={task.deadlineDate} time={task.deadlineTime} />)}
            {tasks.length === 0 && <div>No Active Tasks in this Category</div>}
        </div>
        <div className="add-task"><span className="icon" onClick={togglePopUp}>+<span className="icon-tooltip">Add a Task</span></span></div>
        {isOpen && <CreateTaskPopup handleClose={togglePopUp} />}
    </div>
}

export default ActiveTasks;