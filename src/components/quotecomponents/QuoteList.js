import QuoteListSingle from './QuoteListSingle';
import CreateQuotePopup from '../popups/CreateQuotePopup';
import { useState } from 'react';
import * as apiCalls from '../../api/apiCalls';
import AuthContext from '../../misc/AuthContext';
import React from 'react';

const QuoteList = () => {
    const contextType = React.useContext(AuthContext);
    const [quotes, setQuotes] = useState([]);
    const [initialCall, setInitialCall] = useState(true);

    const [isOpen, setIsOpen] = useState(false);

    if (initialCall) {
        setInitialCall(false);
        apiCalls.getQuotesUser(contextType.getUser(), contextType.getUser().data.name).then(response => setQuotes(response));
        console.log(quotes)
    }

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    return <div id="quotes-list">
        <div><h2 id="quotes-list-header-name">My Quotes</h2></div>
        <div id="quotes-list-quote">
            {quotes.length > 0 && quotes.map(quote => <QuoteListSingle key={quote.quote} quote={quote.quote} author={quote.author} />)}
            {quotes.length === 0 && <div>This uses doesn't have any quotes yet</div>}
        </div>
        <div className="add-task"><span className="icon" onClick={togglePopUp}>+<span className="icon-tooltip">Add a Task</span></span></div>
        {isOpen && <CreateQuotePopup handleClose={togglePopUp} />}
    </div>
}

export default QuoteList;