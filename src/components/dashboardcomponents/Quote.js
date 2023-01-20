import quotesJSON from '../../json/temp/QuoteTemp.json'

const Quote = (props) => {

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const quote = quotesJSON[getRandomInt(quotesJSON.length)];

    function changeSelectorStateToQuotes() {
        props.changeSelectorState("quotes");
    }

    return <div id="dashboard-quote">
        <div id="dashboard-quote-title">
            <div id="dashboard-quote-title-1">Quote of the day</div>
            <div id="dashboard-quote-title-2" className="clickable-link" onClick={changeSelectorStateToQuotes}>See older ones</div>
        </div>
        <div id="dashboard-quote-sentence"><span>{quote.quote}<span id="dashboard-quote-author">By: {quote.author}</span></span></div>
    </div>
}

export default Quote;