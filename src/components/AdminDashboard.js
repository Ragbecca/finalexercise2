import CategoryList from "./admincomponents/CategoryList";
import UserList from "./admincomponents/UserList";

const AdminDashboard = props => {
    return <div id="dashboard">
        <div id="dashboard-name"><h1 id="dashboard-name-h1">Admin Panel</h1></div>
        <div id="dashboard-admin-grid">
            <UserList />
            <CategoryList />
            <div></div>
            <div></div>
        </div>
    </div>
}

export default AdminDashboard;