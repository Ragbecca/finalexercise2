import React, { useState } from 'react';
import * as apiCalls from '../../api/apiCalls'
import AuthContext from '../../misc/AuthContext';
import TaskContext from '../../misc/TaskContext';
import DeleteQuotePopup from '../popups/DeleteQuotePopup';
import QuoteContext from '../../misc/QuoteContext';

const QuoteListSingle = (props) => {
    const contextType = React.useContext(AuthContext);
    const contextTypeQuote = React.useContext(QuoteContext);

    const [isOpen, setIsOpen] = useState(false);

    function deleteFromDB() {
        setIsOpen(false);
        apiCalls.deleteQuote(contextType.getUser(), props.id)
            .then(contextTypeQuote.setQuotes(contextType.getUser().data.name))
            .then(contextTypeQuote.setQuoteToday(contextType.getUser().data.name));
    }

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    return <div className="quotes-list-quote">
        <div className="quotes-list-quote-row-1">
            <span className="quotes-list-quote-name">{props.quote}</span>
        </div>
        <div className="quotes-list-quote-row-2">
            <span className="quotes-list-quote-description">{props.author}</span>
            <div className='delete-quote'>
                <div className="icon-small" onClick={togglePopUp}>-<div className='icon-tooltip-parent'><div className="icon-tooltip">Remove Quote</div></div></div>
                {isOpen && <DeleteQuotePopup handleClose={togglePopUp} deleteQuote={deleteFromDB} quote={props.quote} author={props.author} />}
            </div>
        </div>
    </div >
}

export default QuoteListSingle;