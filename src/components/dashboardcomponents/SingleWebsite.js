const SingleWebsite = (props) => {

    function openWebsite() {
        const url = "http://" + props.link;
        window.open(url);
    }

    return <div onClick={openWebsite} className="dashboard-website">
        <img src={"/img/website/" + props.img} width="32px" height="32px" alt={props.name}></img>
        <span className="dashboard-website-name">{props.name}</span>
    </div>
}

export default SingleWebsite;