import React from "react";
import AuthContext from "../../misc/AuthContext";

const SelectorSingle = props => {

    const contextType = React.useContext(AuthContext);

    function logout() {
        contextType.userLogout();
    }

    return <div id={props.name.toLowerCase() + "-selector"}
        className={"menu-selector-item poppins-medium inactive"}
        onClick={function changer() { logout() }}>
        {props.children}
        {props.name}
    </div>
}

export default SelectorSingle;