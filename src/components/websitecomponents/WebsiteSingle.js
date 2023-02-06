import * as apiCalls from '../../api/apiCalls';
import React from 'react';
import AuthContext from '../../misc/AuthContext';
import WebsiteContext from '../../misc/WebsiteContext';

const WebsiteSingle = (props) => {
    const contextTypeWebsite = React.useContext(WebsiteContext);
    const contextType = React.useContext(AuthContext);

    function openWebsite() {
        const url = "http://" + props.link;
        window.open(url);
        apiCalls.addClickToWebsite(contextType.getUser(), props.id).then(contextTypeWebsite.setWebsites(contextType.getUser().data.name));
    }

    return <div onClick={openWebsite} className="websites-website">
        <div className="websites-website-row-1">
            <img src={"/img/websites/" + props.img} width="32px" height="32px" alt={props.name}></img>
            <span className="websites-website-name">{props.name}</span>
        </div>
        <div className="websites-website-row-2">
            <span className="websites-website-description">{props.description}</span>
        </div>
    </div>
}

export default WebsiteSingle;