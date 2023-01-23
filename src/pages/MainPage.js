import { useState } from "react";
import Dashboard from "../components/Dashboard";
import Menu from "../components/Menu";
import { connect } from "react-redux";

const MainPage = (props) => {
    const [selectorState, setSelectorState] = useState("dashboard");
    const [initialCall, setInitialCall] = useState(true);

    if (initialCall) {
        setInitialCall(false);
        if (!props.user.isLoggedIn) {
            setSelectorState("login");
        }
    }

    return (
        <div id="main-container">
            <div id="main-page">
                <Menu setSelectorState={setSelectorState} selectorState={selectorState} />
                <Dashboard selectorState={selectorState} changeSelectorState={setSelectorState} />
            </div>
        </div >
    )
}

function mapStateToProps(state) {
    return {
        user: state
    }
}

export default connect(mapStateToProps)(MainPage)