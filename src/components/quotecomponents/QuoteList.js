import QuotesTemp from '../../json/temp/QuoteTemp.json';
import QuoteListSingle from './QuoteListSingle';
import CreateQuotePopup from '../popups/CreateQuotePopup';
import { useState } from 'react';

const QuoteList = () => {
    const quotes = QuotesTemp;

    const [isOpen, setIsOpen] = useState(false);

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    return <div id="quotes-list">
        <div><h2 id="quotes-list-header-name">My Quotes</h2></div>
        <div id="quotes-list-quote">
            {quotes.length > 0 && quotes.map(quote => <QuoteListSingle key={quote.quote} quote={quote.quote} author={quote.author} />)}
            {quotes.length === 0 && <div>This uses doesn't have any quotes yet</div>}
        </div>
        <div id="add-task"><span id="plus-icon" onClick={togglePopUp}>+<span className="plus-icon-tooltip">Add a Task</span></span></div>
        {isOpen && <CreateQuotePopup handleClose={togglePopUp} />}
    </div>
}

export default QuoteList;