import * as apiCalls from '../../api/apiCalls';
import React from 'react';
import AuthContext from '../../misc/AuthContext';

const WebsiteSingle = (props) => {
    const contextType = React.useContext(AuthContext);

    function openWebsite() {
        const url = "http://" + props.link;
        window.open(url);
        apiCalls.addClickToWebsite(contextType.getUser(), props.id).then(props.refreshGlobalWebsites(true));
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