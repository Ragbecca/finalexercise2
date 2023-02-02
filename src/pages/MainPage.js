import Dashboard from "../components/Dashboard";
import Menu from "../components/Menu";
import React from "react";

const MainPage = () => {
    return (
        <div id="main-container">
            <div id="main-page">
                <Menu />
                <Dashboard />
            </div>
        </div >
    )
}

export default MainPage;