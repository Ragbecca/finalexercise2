const SelectorSingle = (props) => {

    return <div id={props.name.toLowerCase() + "-selector"}
        className={"menu-selector-item poppins-medium " + props.selectorState}
        onClick={function changer() { props.logout() }}>
        {props.children}
        {props.name}
    </div>
}

export default SelectorSingle;