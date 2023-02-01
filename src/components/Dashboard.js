import DashboardItem from "./DashboardItem";
import TaskDashboard from "./TaskDashboard";
import { useState, useEffect } from "react";
import Website from "./Website";
import websitesJSON from '../json/temp/WebsitesTemp.json';
import Quotes from "./Quotes";
import quotesJSON from '../json/temp/QuoteTemp.json'
import * as apiCalls from "../api/apiCalls";
import React from "react";
import AuthContext from "../misc/AuthContext";
import AdminDashboard from "./AdminDashboard";

const Dashboard = (props) => {
    const contextType = React.useContext(AuthContext);

    const [initialCall, setInitialCall] = useState(true);
    const [globalTasks, setGlobalTasks] = useState([]);
    const [refreshGlobalTasks, setRefreshGlobalTasks] = useState(false);
    const [globalWebsites, setGlobalWebsites] = useState([]);
    const [refreshGlobalWebsites, setRefreshGlobalWebsites] = useState(false);
    const [dayQuote, setDayQuote] = useState();

    if (refreshGlobalTasks) {
        setRefreshGlobalTasks(false);
        delayedRefreshCallGlobalTasks();
    }

    async function delayedRefreshCallGlobalTasks() {
        await new Promise(resolve => setTimeout(resolve, 100));
        apiCalls.getTasksUser(contextType.getUser(), contextType.getUser().data.name).then((results) => setGlobalTasks(results.data));
    }

    async function delayedRefreshCallGlobalWebsites() {
        await new Promise(resolve => setTimeout(resolve, 100));
        apiCalls.getWebsitesUser(contextType.getUser(), contextType.getUser().data.name).then((results) => setGlobalWebsites(results.data));
    }

    if (refreshGlobalWebsites) {
        setRefreshGlobalWebsites(false);
        delayedRefreshCallGlobalWebsites();
    }


    if (initialCall) {
        setInitialCall(false);
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        const quote = quotesJSON[getRandomInt(quotesJSON.length)];
        setDayQuote(quote)
        apiCalls.getTasksUser(contextType.getUser(), contextType.getUser().data.name).then((results) => setGlobalTasks(results.data));
        apiCalls.getWebsitesUser(contextType.getUser(), contextType.getUser().data.name).then((results) => setGlobalWebsites(results.data));
    }

    if (props.selectorState === "dashboard") {
        return <DashboardItem changeSelectorState={props.changeSelectorState} globalTasks={globalTasks} globalWebsites={globalWebsites} dayQuote={dayQuote} refreshGlobalTasks={setRefreshGlobalTasks} refreshGlobalWebsites={setRefreshGlobalWebsites} />
    } else if (props.selectorState === "tasks") {
        return <TaskDashboard changeSelectorState={props.changeSelectorState} globalTasks={globalTasks} refreshGlobalTasks={setRefreshGlobalTasks} />
    } else if (props.selectorState === "websites") {
        return <Website changeSelectorState={props.changeSelectorState} globalWebsites={globalWebsites} refreshGlobalWebsites={setRefreshGlobalWebsites} dayQuote={dayQuote} />
    } else if (props.selectorState === "quotes") {
        return <Quotes dayQuote={dayQuote} />
    } else if (props.selectorState === "admin") {
        return <AdminDashboard refreshGlobalTasks={setRefreshGlobalTasks} />
    } else {
        return <div id="dashboard" className="test">
            TEST5
        </div>;
    }
}

export default Dashboard;