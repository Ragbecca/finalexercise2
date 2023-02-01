import Quote from "./dashboardcomponents/Quote";
import TaskContainer from "./dashboardcomponents/TaskContainer";
import WebsiteContainer from "./dashboardcomponents/WebsiteContainer";

const DashboardItem = (props) => {
    return <div id="dashboard">
        <div id="dashboard-name"><h1 id="dashboard-name-h1">Dashboard</h1></div>
        <div id="dashboard-flex">
            <TaskContainer changeSelectorState={props.changeSelectorState} globalTasks={props.globalTasks} refreshGlobalTasks={props.refreshGlobalTasks} />
            <div className="dashboard-2-big-segments">
                <WebsiteContainer changeSelectorState={props.changeSelectorState} globalWebsites={props.globalWebsites} refreshGlobalWebsites={props.refreshGlobalWebsites} />
                <Quote changeSelectorState={props.changeSelectorState} dayQuote={props.dayQuote} />
            </div>
        </div>
    </div>
}

export default DashboardItem;