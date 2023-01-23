const QuoteListSingle = (props) => {
    return <div className="quotes-list-quote">
        <div className="quotes-list-quote-row-1">
            <span className="quotes-list-quote-name">{props.quote}</span>
        </div>
        <div className="quotes-list-quote-row-2">
            <span className="quotes-list-quote-description">{props.author}</span>
        </div>
    </div >
}

export default QuoteListSingle;