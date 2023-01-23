import SingleWebsite from "./SingleWebsite";

const WebsitesShower = (props) => {


    function changeSelectorStateToWebsites() {
        props.changeSelectorState("websites");
    }

    let websites = [];

    if (window.matchMedia('(min-width: 575px)').matches) {
        websites = props.globalWebsites.slice(0, 12);
    } else if (window.matchMedia('(min-width: 1024px)').matches) {
        websites = props.globalWebsites.slice(0, 12);
    } else if (window.matchMedia('(min-width: 1200px)').matches) {
        websites = props.globalWebsites.slice(0, 12);
    } else {
        websites = props.globalWebsites.slice(0, 6);
    }

    return <div id="dashboard-website-shower">
        <div id="dashboard-website-shower-flex">
            <div><h2 id="dashboard-website-shower-title">My favorite websites</h2></div>
            <div className="clickable-link" onClick={changeSelectorStateToWebsites}>See all</div>
        </div>
        <div id="dashboard-website-shower-grid">
            {websites.map(website => {
                return <SingleWebsite img={website.img} key={website.id} name={website.name} link={website.link} />
            })}
        </div>
    </div>
}

export default WebsitesShower;