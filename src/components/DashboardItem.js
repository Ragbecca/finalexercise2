import Quote from "./dashboardcomponents/Quote";
import TaskContainer from "./dashboardcomponents/TaskContainer";
import WebsiteContainer from "./dashboardcomponents/WebsiteContainer";

const DashboardItem = (props) => {
    return <div id="dashboard">
        <div id="dashboard-name"><h1 id="dashboard-name-h1">Dashboard</h1></div>
        <div id="dashboard-flex">
            <TaskContainer />
            <div className="dashboard-2-big-segments">
                <WebsiteContainer />
                <Quote selectorOrigin="dashboard" />
            </div>
        </div>
    </div>
}

export default DashboardItem;