import * as apiCalls from '../../api/apiCalls';
import React from 'react';
import AuthContext from '../../misc/AuthContext';

const ClickWebsiteSingle = (props) => {
    const contextType = React.useContext(AuthContext);

    function openWebsiteAndAddOneClick() {
        const url = "http://" + props.link;
        window.open(url);
        apiCalls.addClickToWebsite(contextType.getUser(), props.id).then(props.refreshGlobalWebsites(true));;
    }

    return <div className="website-clicks-value" onClick={openWebsiteAndAddOneClick}>
        <img src={"/img/websites/" + props.img} width="32px" height="32px" alt={props.name}></img>
        <div className="website-clicks-value-2">{props.clicks}</div>
    </div>
}

export default ClickWebsiteSingle;