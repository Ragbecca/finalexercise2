import CreateWebsitePopup from '../popups/CreateWebsitePopup';
import WebsiteSingle from './WebsiteSingle';
import { useState } from 'react';

const FavoriteWebsites = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    return <div id="websites-list-shower">
        <div><h2 id="websites-list-header-name">My favorite Websites</h2></div>
        <div id="websites-list-scrollbar">
            {props.globalWebsites.length > 0 && props.globalWebsites.map(website => <WebsiteSingle key={website.websiteID} id={website.websiteID} name={website.name} description={website.description} img={website.icon} link={website.url} refreshGlobalWebsites={props.refreshGlobalWebsites} />)}
            {props.globalWebsites.length === 0 && <div>This uses doesn't have any favorite websites yet</div>}
        </div>
        <div className="add-task"><span className="icon" onClick={togglePopUp}>+<span className="icon-tooltip">Add a Task</span></span></div>
        {isOpen && <CreateWebsitePopup handleClose={togglePopUp} refreshGlobalWebsites={props.refreshGlobalWebsites} />}
    </div>
}

export default FavoriteWebsites;