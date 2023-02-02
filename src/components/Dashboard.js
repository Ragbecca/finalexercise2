import DashboardItem from "./DashboardItem";
import TaskDashboard from "./TaskDashboard";
import { useState, useEffect } from "react";
import Website from "./Website";
import Quotes from "./Quotes";
import quotesJSON from '../json/temp/QuoteTemp.json'
import React from "react";
import TaskContext from "../misc/TaskContext";
import AdminDashboard from "./AdminDashboard";
import SelectorContext from "../misc/SelectorContext";
import WebsiteContext from "../misc/WebsiteContext";

const Dashboard = () => {
    const contextTypeTasks = React.useContext(TaskContext);
    const contextTypeSelector = React.useContext(SelectorContext);
    const contextTypeWebsite = React.useContext(WebsiteContext);

    const [initialCall, setInitialCall] = useState(true);
    const [dayQuote, setDayQuote] = useState();

    useEffect(() => { }, [contextTypeSelector.selectorState])

    if (initialCall) {
        setInitialCall(false);
        contextTypeTasks.setTasks('ragbecca');
        contextTypeWebsite.setWebsites('ragbecca');
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        const quote = quotesJSON[getRandomInt(quotesJSON.length)];
        setDayQuote(quote)
    }

    if (contextTypeSelector.selectorState === "dashboard") {
        return <DashboardItem dayQuote={dayQuote} />
    } else if (contextTypeSelector.selectorState === "tasks") {
        return <TaskDashboard />
    } else if (contextTypeSelector.selectorState === "websites") {
        return <Website dayQuote={dayQuote} />
    } else if (contextTypeSelector.selectorState === "quotes") {
        return <Quotes dayQuote={dayQuote} />
    } else if (contextTypeSelector.selectorState === "admin") {
        return <AdminDashboard />
    } else {
        return <div id="dashboard" className="test">
            TEST5
        </div>;
    }
}

export default Dashboard;