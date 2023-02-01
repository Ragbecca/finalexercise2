const TaskSearch = (props) => {

    let isActiveClass = "";

    if (props.activeSearch === props.name) {
        isActiveClass = " category-active";
    } else if (props.name === "All Tasks" && props.activeSearch === "") {
        isActiveClass = " category-active";
    } else {
        isActiveClass = " category-inactive";
    }

    function changeSearchInput() {
        if (props.name === "All Tasks") {
            props.changeSearch("");
        } else {
            props.changeSearch(props.name);
        }
    }

    return <div onClick={changeSearchInput} className={"task-category" + isActiveClass}>
        {props.name}
    </div>
}

export default TaskSearch;