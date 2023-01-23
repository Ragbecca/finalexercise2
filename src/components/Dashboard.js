import DashboardItem from "./DashboardItem";
import TaskDashboard from "./TaskDashboard";
import tasksJson from '../json/temp/TasksTemp.json';
import tasksCategoryJson from '../json/temp/TasksCategoryTemp.json';
import { useState } from "react";
import Website from "./Website";
import websitesJSON from '../json/temp/WebsitesTemp.json';
import Quotes from "./Quotes";
import quotesJSON from '../json/temp/QuoteTemp.json'
import Login from "./Login";

const Dashboard = (props) => {

    const [initialCall, setInitialCall] = useState(true);
    const [globalTasks, setGlobalTasks] = useState([]);
    const [refreshGlobalTasks, setRefreshGlobalTasks] = useState(true);
    const [globalWebsites, setGlobalWebsites] = useState([]);
    const [refreshGlobalWebsites, setRefreshGlobalWebsites] = useState(true);
    const [dayQuote, setDayQuote] = useState();

    if (refreshGlobalTasks) {
        setRefreshGlobalTasks(false);
        let newGlobalTasks = [];
        tasksJson.forEach((x) => {
            x.category = tasksCategoryJson.find((y) => y.id === x.category).categoryName;
            newGlobalTasks.push(x);
        })
        setGlobalTasks(newGlobalTasks);
    }

    if (refreshGlobalWebsites) {
        setRefreshGlobalWebsites(false);
        setGlobalWebsites(websitesJSON);
    }

    if (initialCall) {
        setInitialCall(false);
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        const quote = quotesJSON[getRandomInt(quotesJSON.length)];
        setDayQuote(quote)
    }

    if (props.selectorState === "dashboard") {
        return <DashboardItem changeSelectorState={props.changeSelectorState} globalWebsites={globalWebsites} dayQuote={dayQuote} />
    } else if (props.selectorState === "tasks") {
        return <TaskDashboard changeSelectorState={props.changeSelectorState} globalTasks={globalTasks} refreshGlobalTasks={setRefreshGlobalTasks} />
    } else if (props.selectorState === "websites") {
        return <Website changeSelectorState={props.changeSelectorState} globalWebsites={globalWebsites} refreshGlobalWebsites={setRefreshGlobalWebsites} dayQuote={dayQuote} />
    } else if (props.selectorState === "quotes") {
        return <Quotes dayQuote={dayQuote} />
    } else if (props.selectorState === "login") {
        return <Login />
    } else {
        return <div id="dashboard" className="test">
            TEST5
        </div>;
    }
}

export default Dashboard;