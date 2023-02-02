import Selector from "./Selector";
import AuthContext from "../../misc/AuthContext";
import React from "react";


const SelectorDashboard = () => {
    const contextType = React.useContext(AuthContext);

    const selectorList = [
        "Logout", "Dashboard", "Tasks", "Websites", "Quotes"
    ];

    if (contextType.getUser().data.rol.includes("ROLE_ADMIN")) {
        return <div id="menu-selector">
            {selectorList.map(value => {
                return <Selector key={value} name={value} />
            })}
            <Selector key="Categories" name="Admin" />
        </div>;
    } else {
        return <div id="menu-selector">
            <Selector key="Logout" name="Logout" />
            {selectorList.map(value => {
                return <Selector key={value} name={value} />
            })}
        </div>;
    }
}

export default SelectorDashboard;