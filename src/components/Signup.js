import React, { useState } from "react";
import Input from "./misccomponents/Input";
import ButtonWithProgress from "./misccomponents/ButtonWithProgress";
import * as apiCalls from "../api/apiCalls";
import AuthContext from "../misc/AuthContext";
import { handleLogError } from "../misc/Helpers";
import { parseJwt } from "../misc/Helpers";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
    const contextType = React.useContext(AuthContext);

    const [isError, setError] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
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

    function onChangeEmail(event) {
        setEmail(event.target.value);
    }

    function onClickSignUp() {
        if (!(username && password && password)) {
            setError(true);
            return;
        }
        const body = {
            username: username,
            email: email,
            password: password
        }
        apiCalls.signup(body).then(response => {
            const { accessToken } = response.data;
            const data = parseJwt(accessToken);
            const user = { data, accessToken };

            contextType.userLogin(user);

            setError(false);
            setLoggedIn(true);
            setUsername('');
            setPassword('');
        }).catch(error => {
            handleLogError(error);
            setError(true);
        })
    }

    let disableSubmit = false;
    if (username === '' || password === '' || email === '') {
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
                <div className="login-input-label">Email</div>
                <div className="">
                    <Input placeholder="Your email"
                        classes="login-input"
                        value={email} onChange={onChangeEmail} />
                </div>
                <div className="login-input-label">Password</div>
                <div className="">
                    <Input placeholder="Your password" type="password"
                        classes="login-input"
                        value={password} onChange={onChangePassword} />
                </div>
                <div>{isError && (
                    <div className="">
                        <div className="login-alert" role="alert">This isn't good.</div>
                    </div>
                )}</div>
                <div className="login-button-middle">
                    <ButtonWithProgress onClick={onClickSignUp}
                        disabled={disableSubmit}
                        text="Signup"
                        classes="login-button" />
                </div>
                <div>
                    <Link className="login-button-middle" to="/login">Login</Link>
                </div>
            </div>
        </div >
    );
}

export default Login;