import FinishedTasks from "./taskdashboardcomponents/FinishedTasks";
import ProgressTasks from "./taskdashboardcomponents/ProgressTasks";
import ActiveTasks from "./taskdashboardcomponents/ActiveTasks";

const TaskDashboard = (props) => {
    return <div id="dashboard">
        <div id="dashboard-name"><h1 id="dashboard-name-h1">Tasks</h1></div>
        <div id="dashboard-flex">
            <ActiveTasks globalTasks={props.globalTasks} refreshGlobalTasks={props.refreshGlobalTasks} />
            <div className="dashboard-2-big-segments">
                <ProgressTasks globalTasks={props.globalTasks} />
                <FinishedTasks globalTasks={props.globalTasks} refreshGlobalTasks={props.refreshGlobalTasks} />
            </div>
        </div>
    </div>
}

export default TaskDashboard;