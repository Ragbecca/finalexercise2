import React, { useState, useEffect } from "react";
import SelectorContext from "../../misc/SelectorContext";
import QuoteContext from "../../misc/QuoteContext";

const Quote = (props) => {
    const contextTypeQuote = React.useContext(QuoteContext);
    const contextTypeSelector = React.useContext(SelectorContext);

    const [quote, setQuote] = useState([]);
    const [isChangeQuote, setChangeQuote] = useState(false);

    useEffect(() => {
        if (contextTypeQuote.refreshCall === false) {
            return;
        }
        setChangeQuote(true);
    }, [contextTypeQuote.refreshCall]);

    useEffect(() => {
        if (contextTypeSelector.selectorState !== props.selectorOrigin || contextTypeQuote.initialCall === false) {
            return;
        }
        setChangeQuote(true);
    }, [contextTypeSelector.selectorState, contextTypeQuote.initialCall]);

    if (isChangeQuote) {
        setChangeQuote(false);
        setQuote(contextTypeQuote.getQuoteToday());
    }

    function changeSelectorStateToQuotes() {
        contextTypeSelector.setSelectorState("quotes")
    }

    return <div id="dashboard-quote">
        <div id="dashboard-quote-title">
            <div id="dashboard-quote-title-1">Quote of the day</div>
            <div id="dashboard-quote-title-2" className="clickable-link" onClick={changeSelectorStateToQuotes}>See others</div>
        </div>
        {quote !== undefined && quote !== null && quote.length !== 0 && <div id="dashboard-quote-sentence"><span>"{quote.quote.quote}"<span id="dashboard-quote-author">- {quote.quote.author}</span></span></div>}
    </div>
}

export default Quote;