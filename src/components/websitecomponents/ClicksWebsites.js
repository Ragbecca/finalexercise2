import ClickWebsiteSingle from "./ClickWebsiteSingle";

const ClicksWebsites = (props) => {

    let sortedWebsites = [];

    function sortWebsites() {
        if (props.globalWebsites.length > 4) {
            sortedWebsites = props.globalWebsites.sort((a, b) => b.clicks - a.clicks).slice(0, 4);
        } else {
            sortedWebsites = props.globalWebsites.sort((a, b) => b.clicks - a.clicks);
        }
    }

    sortWebsites();


    return <div id="website-clicks">
        <h2 id="website-clicks-name">Most Clicks</h2>
        <div id="website-clicks-values">
            {sortedWebsites.map(website => <ClickWebsiteSingle key={website.websiteID} id={website.websiteID} clicks={website.clicks} img={website.icon} name={website.name} link={website.url} refreshGlobalWebsites={props.refreshGlobalWebsites} />)}
        </div>
    </div>
}

export default ClicksWebsites;