import { useState } from "react";
import Dashboard from "../components/Dashboard";
import Menu from "../components/Menu";

const MainPage = () => {
    const [selectorState, setSelectorState] = useState("dashboard");

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