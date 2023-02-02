import React from "react";
import SelectorContext from "../../misc/SelectorContext";

const SelectorSingle = props => {
    const contextTypeSelector = React.useContext(SelectorContext);

    function changeSelectorState(value) {
        contextTypeSelector.setSelectorState(value);
    };

    let stateOfButton = "";
    if (contextTypeSelector.selectorState === props.name.toLowerCase()) {
        stateOfButton = " active";
    } else {
        stateOfButton = " inactive";
    }
    return <div id={props.name.toLowerCase() + "-selector"} className={"menu-selector-item poppins-medium" + stateOfButton} onClick={function changer() { changeSelectorState(props.name.toLowerCase()) }}>
        {props.children}
        {props.name}
    </div>
}

export default SelectorSingle;