import Quote from "./dashboardcomponents/Quote";
import ClicksWebsites from "./websitecomponents/ClicksWebsites";
import FavoriteWebsites from "./websitecomponents/FavoriteWebsites";

const Website = (props) => {
    return <div id="dashboard">
        <div id="dashboard-name"><h1 id="dashboard-name-h1">Websites</h1></div>
        <div id="dashboard-flex">
            <FavoriteWebsites globalWebsites={props.globalWebsites} refreshGlobalWebsites={props.refreshGlobalWebsites} />
            <div className="dashboard-2-big-segments">
                <ClicksWebsites globalWebsites={props.globalWebsites} refreshGlobalWebsites={props.refreshGlobalWebsites} />
                <Quote selectorOrigin="websites" />
            </div>
        </div>
    </div>
}

export default Website;