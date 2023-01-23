const WebsiteSingle = (props) => {

    function openWebsite() {
        const url = "http://" + props.link;
        window.open(url);
    }

    return <div onClick={openWebsite} className="websites-website">
        <div className="websites-website-row-1">
            <img src={"/img/website/" + props.img} width="32px" height="32px" alt={props.name}></img>
            <span className="websites-website-name">{props.name}</span>
        </div>
        <div className="websites-website-row-2">
            <span className="websites-website-description">{props.description}</span>
        </div>
    </div>
}

export default WebsiteSingle;