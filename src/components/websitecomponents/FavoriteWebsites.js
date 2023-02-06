import CreateWebsitePopup from '../popups/CreateWebsitePopup';
import WebsiteSingle from './WebsiteSingle';
import React, { useState, useEffect } from 'react';
import SelectorContext from '../../misc/SelectorContext';
import WebsiteContext from '../../misc/WebsiteContext';
import { websitesLocation } from '../../misc/ConstantValues';

const FavoriteWebsites = (props) => {
    const contextTypeWebsite = React.useContext(WebsiteContext);
    const contextTypeSelector = React.useContext(SelectorContext);

    const [isOpen, setIsOpen] = useState(false);
    const [websites, setWebsites] = useState([]);
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
        setWebsites(contextTypeWebsite.getWebsites());
    }

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    return <div id="websites-list-shower">
        <div><h2 id="websites-list-header-name">My favorite Websites</h2></div>
        <div id="websites-list-scrollbar">
            {websites.length > 0 && websites.map(website => <WebsiteSingle key={website.websiteID} id={website.websiteID} name={website.name} description={website.description} img={website.icon} link={website.url} />)}
            {websites.length === 0 && <div>This uses doesn't have any favorite websites yet</div>}
        </div>
        <div className="add-task"><span className="icon" onClick={togglePopUp}>+<span className="icon-tooltip">Add a Task</span></span></div>
        {isOpen && <CreateWebsitePopup handleClose={togglePopUp} />}
    </div>
}

export default FavoriteWebsites;