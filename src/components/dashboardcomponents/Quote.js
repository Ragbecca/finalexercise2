import React from "react";
import SelectorContext from "../../misc/SelectorContext";

const Quote = (props) => {
    const contextTypeSelector = React.useContext(SelectorContext);

    function changeSelectorStateToQuotes() {
        contextTypeSelector.setSelectorState("quotes")
    }

    const quote = props.dayQuote;

    return <div id="dashboard-quote">
        <div id="dashboard-quote-title">
            <div id="dashboard-quote-title-1">Quote of the day</div>
            <div id="dashboard-quote-title-2" className="clickable-link" onClick={changeSelectorStateToQuotes}>See others</div>
        </div>
        <div id="dashboard-quote-sentence"><span>"{quote.quote}"<span id="dashboard-quote-author">- {quote.author}</span></span></div>
    </div>
}

export default Quote;