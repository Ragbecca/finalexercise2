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
            {props.globalWebsites.length > 0 && props.globalWebsites.map(website => <WebsiteSingle key={website.id} name={website.name} description={website.description} img={website.img} link={website.link} />)}
            {props.globalWebsites.length === 0 && <div>This uses doesn't have any favorite websites yet</div>}
        </div>
        <div id="add-task"><span id="plus-icon" onClick={togglePopUp}>+<span className="plus-icon-tooltip">Add a Task</span></span></div>
        {isOpen && <CreateWebsitePopup handleClose={togglePopUp} />}
    </div>
}

export default FavoriteWebsites;