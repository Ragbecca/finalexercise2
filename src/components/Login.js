import React, { useState } from "react";
import Input from "./misccomponents/Input";
import ButtonWithProgress from "./misccomponents/ButtonWithProgress";
import * as apiCalls from "../api/apiCalls";
import AuthContext from "../misc/AuthContext";
import { handleLogError } from "../misc/Helpers";
import { parseJwt } from "../misc/Helpers";
import { Navigate } from "react-router-dom";

const Login = (props) => {
    const contextType = React.useContext(AuthContext);

    const [isError, setError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [initialCall, setInitialCall] = useState(true);

    if (initialCall) {
        setInitialCall(false);
        setLoggedIn(contextType.userIsAuthenticated());
    }

    function onChangeUsername(event) {
        setUsername(event.target.value);
    }

    function onChangePassword(event) {
        setPassword(event.target.value);
    }

    function onClickLogin() {
        if (!(username && password)) {
            setError(true);
            return;
        }
        apiCalls.authenticate(username, password)
            .then(response => {
                const { accessToken } = response.data;
                const data = parseJwt(accessToken);
                const user = { data, accessToken };

                contextType.userLogin(user);

                setError(false);
                setLoggedIn(true);
                setUsername('');
                setPassword('');
            })
            .catch(error => {
                handleLogError(error);
                setError(true);
            })
    }

    let disableSubmit = false;
    if (username === '' || password === '') {
        disableSubmit = true;
    }

    if (isLoggedIn) {
        return <Navigate to="/homepage" replace></Navigate>;
    }

    return (
        <div id="login-screen">
            <div id="login-screen-container">
                <div className="login-input-label">Username</div>
                <div className="">
                    <Input placeholder="Your username"
                        classes="login-input"
                        value={username} onChange={onChangeUsername} />
                </div>
                <div className="login-input-label">Wachtwoord</div>
                <div className="">
                    <Input placeholder="Your password" type="password"
                        classes="login-input"
                        value={password} onChange={onChangePassword} />
                </div>
                <div>{isError && (
                    <div className="">
                        <div className="login-alert" role="alert">Deze gegevens kloppen niet</div>
                    </div>
                )}</div>
                <div className="login-button-middle">
                    <ButtonWithProgress onClick={onClickLogin}
                        disabled={disableSubmit}
                        text="Login"
                        classes="login-button" />
                </div>
            </div>
        </div >
    );
}

export default Login;