import ClickWebsiteSingle from "./ClickWebsiteSingle";
import React, { useState, useEffect } from "react";
import WebsiteContext from "../../misc/WebsiteContext";
import SelectorContext from "../../misc/SelectorContext";
import { websitesLocation } from "../../misc/ConstantValues";

const ClicksWebsites = (props) => {
    const contextTypeWebsite = React.useContext(WebsiteContext);
    const contextTypeSelector = React.useContext(SelectorContext);

    const [websitesSorted, setWebsitesSorted] = useState([]);
    const [isChangeWebsites, setChangeWebsites] = useState(false);

    useEffect(() => {
        if (contextTypeWebsite.refreshCall === false) {
            return;
        }
        setChangeWebsites(true);
    }, [contextTypeWebsite.refreshCall]);

    useEffect(() => {
        if (contextTypeSelector.selectorState !== websitesLocation || contextTypeWebsite.initialCall === false) {
            return;
        }
        setChangeWebsites(true);
    }, [contextTypeSelector.selectorState, contextTypeWebsite.initialCall]);

    if (isChangeWebsites) {
        setChangeWebsites(false);
        if (contextTypeWebsite.getWebsites().length > 4) {
            setWebsitesSorted(contextTypeWebsite.getWebsites()
                .sort((a, b) => b.clicks - a.clicks).slice(0, 4));
        } else {
            setWebsitesSorted(contextTypeWebsite.getWebsites());
        }
    }


    return <div id="website-clicks">
        <h2 id="website-clicks-name">Most Clicks</h2>
        <div id="website-clicks-values">
            {websitesSorted.map(website => <ClickWebsiteSingle key={website.websiteID} id={website.websiteID} clicks={website.clicks} img={website.icon} name={website.name} link={website.url} />)}
        </div>
    </div>
}

export default ClicksWebsites;