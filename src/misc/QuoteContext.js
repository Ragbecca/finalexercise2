import React, { Component, useContext } from 'react';
import AuthContext from './AuthContext';
import * as apiCalls from '../api/apiCalls';

const QuoteContext = React.createContext();

class QuoteProvider extends Component {

    static contextType = AuthContext;

    state = {
        quotes: null,
        quoteToday: null,
        refreshCall: false,
        initialCall: false
    }

    setQuotes = async (username) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const quotesGotten = await apiCalls.getQuotesUser(this.context.getUser(), username);
        const quotesData = quotesGotten.data;
        this.setState({ quotes: quotesData, refreshCall: true, initialCall: true });
    }

    setQuoteToday = async (username) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const quoteGotten = await apiCalls.getQuoteTodayUser(this.context.getUser(), username);
        const quoteData = quoteGotten.data;
        this.setState({ quoteToday: quoteData, refreshCall: true, initialCall: true });
    }

    getQuotes = () => {
        this.setState({ refreshCall: false });
        return this.state.quotes;
    }

    getQuoteToday = () => {
        this.setState({ refreshCall: false });
        return this.state.quoteToday;
    }

    render() {
        const { children } = this.props;
        const { quotes, quoteToday, refreshCall, initialCall } = this.state;
        const { setQuotes, getQuotes, setQuoteToday, getQuoteToday } = this;

        return (
            <QuoteContext.Provider value={{ quotes, quoteToday, refreshCall, initialCall, setQuotes, getQuotes, setQuoteToday, getQuoteToday }}>
                {children}
            </QuoteContext.Provider>
        )
    }
}

export default QuoteContext;

export function useQuoteContext() {
    return useContext(QuoteContext);
}

export { QuoteProvider }