import DashboardItem from "./DashboardItem";
import TaskDashboard from "./TaskDashboard";
import { useState, useEffect } from "react";
import Website from "./Website";
import Quotes from "./Quotes";
import React from "react";
import TaskContext from "../misc/TaskContext";
import AdminDashboard from "./AdminDashboard";
import SelectorContext from "../misc/SelectorContext";
import WebsiteContext from "../misc/WebsiteContext";
import QuoteContext from "../misc/QuoteContext";
import AuthContext from "../misc/AuthContext";
import CategoryContext from "../misc/CategoryContext";

const Dashboard = () => {
    const contextType = React.useContext(AuthContext);
    const contextTypeTasks = React.useContext(TaskContext);
    const contextTypeSelector = React.useContext(SelectorContext);
    const contextTypeWebsite = React.useContext(WebsiteContext);
    const contextTypeQuote = React.useContext(QuoteContext);
    const contextTypeCategories = React.useContext(CategoryContext);

    const [initialCall, setInitialCall] = useState(true);

    useEffect(() => { }, [contextTypeSelector.selectorState])

    if (initialCall) {
        setInitialCall(false);
        contextTypeTasks.setTasks(contextType.getUser().data.name);
        contextTypeWebsite.setWebsites(contextType.getUser().data.name);
        contextTypeQuote.setQuotes(contextType.getUser().data.name);
        contextTypeQuote.setQuoteToday(contextType.getUser().data.name);
        contextTypeCategories.setCategories(contextType.getUser().data.name);
    }

    if (contextTypeSelector.selectorState === "dashboard") {
        return <DashboardItem />
    } else if (contextTypeSelector.selectorState === "tasks") {
        return <TaskDashboard />
    } else if (contextTypeSelector.selectorState === "websites") {
        return <Website />
    } else if (contextTypeSelector.selectorState === "quotes") {
        return <Quotes />
    } else if (contextTypeSelector.selectorState === "admin") {
        return <AdminDashboard />
    } else {
        return <div id="dashboard" className="test">
            TEST5
        </div>;
    }
}

export default Dashboard;