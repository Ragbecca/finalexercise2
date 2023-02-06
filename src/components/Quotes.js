import QuoteComponent from "./quotecomponents/QuoteComponent";
import QuoteList from "./quotecomponents/QuoteList";

const Quotes = (props) => {
    return <div id="dashboard">
        <div id="dashboard-name"><h1 id="dashboard-name-h1">Quotes</h1></div>
        <div id="dashboard-flex">
            <QuoteList />
            <div className="dashboard-2-big-segments">
                <QuoteComponent />
            </div>
        </div>
    </div>
}

export default Quotes;