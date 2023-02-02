import React, { Component, useContext } from 'react';
import AuthContext from './AuthContext';
import * as apiCalls from '../api/apiCalls';

const WebsiteContext = React.createContext();

class WebsiteProvider extends Component {

    static contextType = AuthContext;

    state = {
        websites: null,
        refreshCall: false,
        initialCall: false
    }

    setWebsites = async (username) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const websitesGotten = await apiCalls.getWebsitesUser(this.context.getUser(), username);
        const websitesData = websitesGotten.data;
        this.setState({ websites: websitesData, refreshCall: true, initialCall: true });
    }

    getWebsites = () => {
        this.setState({ refreshCall: false });
        return this.state.websites;
    }

    render() {
        const { children } = this.props;
        const { websites, refreshCall, initialCall } = this.state;
        const { setWebsites, getWebsites } = this;

        return (
            <WebsiteContext.Provider value={{ websites, refreshCall, initialCall, setWebsites, getWebsites }}>
                {children}
            </WebsiteContext.Provider>
        )
    }
}

export default WebsiteContext;

export function useWebsiteContext() {
    return useContext(WebsiteContext);
}

export { WebsiteProvider }