import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import Menu from "../components/Menu";
import React from "react";

const MainPage = () => {
    const [selectorState, setSelectorState] = useState("dashboard");
    const [initialCall, setInitialCall] = useState(true);

    if (initialCall) {
        setInitialCall(false);
        if (localStorage.getItem("selector-state") !== null && localStorage.getItem("selector-state") !== undefined) {
            setSelectorState(localStorage.getItem("selector-state"));
        }
    }

    useEffect(() => {
        localStorage.setItem("selector-state", selectorState)
    }, [selectorState])



    return (
        <div id="main-container">
            <div id="main-page">
                <Menu setSelectorState={setSelectorState} selectorState={selectorState} />
                <Dashboard selectorState={selectorState} changeSelectorState={setSelectorState} />
            </div>
        </div >
    )
}

export default MainPage;