import Selector from "./Selector";
import { connect } from "react-redux";


const SelectorDashboard = props => {

    const selectorList = [
        "Dashboard", "Tasks", "Websites", "Quotes"
    ];

    if (props.user.isLoggedIn) {
        return <div id="menu-selector">
            <Selector key="Logout" selectorState={props.selectorState} setSelectorState={props.setSelectorState} name="Logout" />
            {selectorList.map(value => {
                return <Selector key={value} selectorState={props.selectorState} setSelectorState={props.setSelectorState} name={value} />
            })}
        </div>;
    } else {
        return <div id="menu-selector">
            <Selector key="Login" selectorState={props.selectorState} setSelectorState={props.setSelectorState} name="Login" />
            {/* <Selector key="Signup" selectorState={props.selectorState} setSelectorState={props.setSelectorState} name="Signup" /> */}
            {selectorList.map(value => {
                return <Selector key={value} selectorState={props.selectorState} setSelectorState={props.setSelectorState} name={value} />
            })}
        </div>;
    }
}

function mapStateToProps(state) {
    return {
        user: state
    }
}

export default connect(mapStateToProps)(SelectorDashboard);