import Quote from "./dashboardcomponents/Quote";
import TaskShower from "./dashboardcomponents/TaskShower";
import WebsitesShower from "./dashboardcomponents/WebsiteShower";

const DashboardItem = (props) => {
    return <div id="dashboard">
        <div id="dashboard-name"><h1 id="dashboard-name-h1">Dashboard</h1></div>
        <div id="dashboard-flex">
            <TaskShower changeSelectorState={props.changeSelectorState} />
            <div className="dashboard-2-big-segments">
                <WebsitesShower changeSelectorState={props.changeSelectorState} />
                <Quote changeSelectorState={props.changeSelectorState} />
            </div>
        </div>
    </div>
}

export default DashboardItem;