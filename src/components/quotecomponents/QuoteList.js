import QuoteListSingle from './QuoteListSingle';
import CreateQuotePopup from '../popups/CreateQuotePopup';
import React, { useState, useEffect } from 'react';
import SelectorContext from '../../misc/SelectorContext';
import QuoteContext from '../../misc/QuoteContext';

const QuoteList = () => {
    const contextTypeQuote = React.useContext(QuoteContext);
    const contextTypeSelector = React.useContext(SelectorContext);

    const [quotes, setQuotes] = useState([]);
    const [isChangeQuotes, setChangeQuotes] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (contextTypeQuote.refreshCall === false) {
            return;
        }
        setChangeQuotes(true);
    }, [contextTypeQuote.refreshCall]);

    useEffect(() => {
        if (contextTypeSelector.selectorState !== "quotes" || contextTypeQuote.initialCall === false) {
            return;
        }
        setChangeQuotes(true);
    }, [contextTypeSelector.selectorState, contextTypeQuote.initialCall]);

    if (isChangeQuotes) {
        setChangeQuotes(false);
        setQuotes(contextTypeQuote.getQuotes());
    }

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    return <div id="quotes-list">
        <div><h2 id="quotes-list-header-name">My Quotes</h2></div>
        <div id="quotes-list-quote">
            {quotes !== undefined && quotes.length > 0 && quotes.map(quote => <QuoteListSingle key={quote.id} quote={quote.quote} author={quote.author} />)}
            {quotes !== undefined && quotes.length === 0 && <div>This uses doesn't have any quotes yet</div>}
        </div>
        <div className="add-task"><span className="icon" onClick={togglePopUp}>+<span className="icon-tooltip">Add a Task</span></span></div>
        {isOpen && <CreateQuotePopup handleClose={togglePopUp} />}
    </div>
}

export default QuoteList;