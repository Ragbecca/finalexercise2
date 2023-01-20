const SelectorSingle = (props) => {

    function changeSelectorState(value) {
        props.setSelectorState(value);
    };

    let stateOfButton = "";
    if (props.selectorState === props.name.toLowerCase()) {
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