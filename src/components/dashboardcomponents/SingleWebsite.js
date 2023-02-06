import * as apiCalls from "../../api/apiCalls";
import AuthContext from "../../misc/AuthContext";
import React from "react";
import WebsiteContext from "../../misc/WebsiteContext";

const SingleWebsite = props => {
    const contextType = React.useContext(AuthContext);
    const contextTypeWebsite = React.useContext(WebsiteContext);

    function openWebsite() {
        const url = "http://" + props.link;
        window.open(url);
        apiCalls.addClickToWebsite(contextType.getUser(), props.id).then(contextTypeWebsite.setWebsites(contextType.getUser().data.name));
    }

    return <div onClick={openWebsite} className="dashboard-website">
        <img src={"/img/websites/" + props.img} width="32px" height="32px" alt={props.name}></img>
        <span className="dashboard-website-name">{props.name}</span>
    </div>
}

export default SingleWebsite;