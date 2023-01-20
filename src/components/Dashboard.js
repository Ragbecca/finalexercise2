import DashboardItem from "./DashboardItem";
import TaskDashboard from "./TaskDashboard";
import tasksJson from '../json/temp/TasksTemp.json';
import tasksCategoryJson from '../json/temp/TasksCategoryTemp.json';
import { useState } from "react";

const Dashboard = (props) => {

    const [globalTasks, setGlobalTasks] = useState([]);
    const [refreshGlobalTasks, setRefreshGlobalTasks] = useState(true);

    if (refreshGlobalTasks) {
        setRefreshGlobalTasks(false);
        let newGlobalTasks = [];
        tasksJson.forEach((x) => {
            x.category = tasksCategoryJson.find((y) => y.id === x.category).categoryName;
            newGlobalTasks.push(x);
        })
        setGlobalTasks(newGlobalTasks);
    }

    if (props.selectorState === "dashboard") {
        return <DashboardItem changeSelectorState={props.changeSelectorState} />
    } else if (props.selectorState === "tasks") {
        return <TaskDashboard changeSelectorState={props.changeSelectorState} globalTasks={globalTasks} refreshGlobalTasks={setRefreshGlobalTasks} />
    } else if (props.selectorState === "websites") {
        return <div id="dashboard" className="test">
            TEST3
        </div>;
    } else if (props.selectorState === "quotes") {
        return <div id="dashboard" className="test">
            TEST4
        </div>;
    } else {
        return <div id="dashboard" className="test">
            TEST5
        </div>;
    }
}

export default Dashboard;