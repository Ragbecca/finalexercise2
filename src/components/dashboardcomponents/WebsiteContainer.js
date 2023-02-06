import SelectorContext from "../../misc/SelectorContext";
import SingleWebsite from "./SingleWebsite";
import React, { useState, useEffect } from "react";
import WebsiteContext from "../../misc/WebsiteContext";
import { dashboardLocation, websitesLocation } from "../../misc/ConstantValues";

const WebsiteContainer = props => {
    const contextTypeSelector = React.useContext(SelectorContext);
    const contextTypeWebsite = React.useContext(WebsiteContext);

    const [websitesFromDB, setWebsitesFromDB] = useState([]);
    const [websites, setWebsites] = useState([]);

    function changeSelectorStateToWebsites() {
        contextTypeSelector.setSelectorState(websitesLocation);
    }

    useEffect(() => {
        if (contextTypeWebsite.refreshCall === false) {
            return;
        }
        setWebsitesFromDB(contextTypeWebsite.getWebsites());
    }, [contextTypeWebsite.refreshCall])

    useEffect(() => {
        if (contextTypeSelector.selectorState !== dashboardLocation || contextTypeWebsite.initialCall === false) {
            return;
        }
        setWebsitesFromDB(contextTypeWebsite.getWebsites());
    }, [contextTypeSelector.selectorState])

    useEffect(() => {
        if (websitesFromDB === null || websitesFromDB.length === 0) {
            return;
        }
        setWebsitesChange();
    }, [websitesFromDB])

    function setWebsitesChange() {
        if (window.matchMedia('(min-width: 575px)').matches) {
            setWebsites(contextTypeWebsite.getWebsites().slice(0, 12));
        } else {
            setWebsites(contextTypeWebsite.getWebsites().slice(0, 6));
        }
    }

    return <div id="dashboard-website-shower">
        <div id="dashboard-website-shower-flex">
            <div><h2 id="dashboard-website-shower-title">My favorite websites</h2></div>
            <div className="clickable-link" onClick={changeSelectorStateToWebsites}>See all</div>
        </div>
        <div id="dashboard-website-shower-grid">
            {websites.map(website => {
                return <SingleWebsite img={website.icon} id={website.websiteID} key={website.websiteID} name={website.name} link={website.url} />
            })}
        </div>
    </div>
}

export default WebsiteContainer;