import { websitesLocation } from "../misc/ConstantValues";
import Quote from "./dashboardcomponents/Quote";
import ClicksWebsites from "./websitecomponents/ClicksWebsites";
import FavoriteWebsites from "./websitecomponents/FavoriteWebsites";

const Website = (props) => {
    return <div id="dashboard">
        <div id="dashboard-name"><h1 id="dashboard-name-h1">Websites</h1></div>
        <div id="dashboard-flex">
            <FavoriteWebsites />
            <div className="dashboard-2-big-segments">
                <ClicksWebsites />
                <Quote selectorOrigin={websitesLocation} />
            </div>
        </div>
    </div>
}

export default Website;