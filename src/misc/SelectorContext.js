import React, { Component, useContext } from 'react';

const SelectorContext = React.createContext();

class SelectorProvider extends Component {

    state = {
        selectorState: ''
    }

    async componentDidMount() {
        if (localStorage.getItem("selector-state") !== null && localStorage.getItem("selector-state") !== undefined) {
            const selectorStateGotten = localStorage.getItem("selector-state");
            this.setState({ selectorState: selectorStateGotten });
        } else {
            this.setState({ selectorState: 'dashboard' });
        }
    }

    setSelectorState = (selectorStateGotten) => {
        this.setState({ selectorState: selectorStateGotten });
        localStorage.setItem("selector-state", selectorStateGotten);
    }

    render() {
        const { children } = this.props;
        const { selectorState } = this.state;
        const { setSelectorState } = this;

        return (
            <SelectorContext.Provider value={{ selectorState, setSelectorState }}>
                {children}
            </SelectorContext.Provider>
        )
    }
}

export default SelectorContext;

export function useSelectorContext() {
    return useContext(SelectorContext);
}

export { SelectorProvider }