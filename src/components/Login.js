import React, { useState } from "react";
import Input from "./misccomponents/Input";
import ButtonWithProgress from "./misccomponents/ButtonWithProgress";
import { connect } from "react-redux";
import * as authActions from "../redux/authActions"
import * as apiCalls from "../api/apiCalls";

const Login = (props) => {

    const [apiError, setApiError] = useState();
    const [user, setUser] = useState({ "username": "", "password": "" });
    const [pendingApiCall, setPendingApiCall] = useState(false);

    function onChangeUsername(event) {
        const jsonValue = { "username": event.target.value, "password": user.password };
        setUser(jsonValue);
        setApiError(undefined);
    }

    function onChangePassword(event) {
        const jsonValue = { "username": user.username, "password": event.target.value };
        setUser(jsonValue);
        setApiError(undefined);
    }

    function onClickLogin() {
        const body = {
            username: user.username,
            password: user.password
        }
        setPendingApiCall(true);
        apiCalls.login(body)
            .then((response) => { setPendingApiCall(false) })
            .catch(error => {
                if (error.response) {
                    setApiError(error.response.data.message);
                    setPendingApiCall(false);
                }
            });
    }

    let disableSubmit = false;
    if (user === undefined || user.username === '') {
        disableSubmit = true;
    }

    return (
        <div id="login-screen">
            <div className="">
                <div className="login-input-label">Username</div>
                <div className="">
                    <Input placeholder="Jouw email"
                        classes="login-input"
                        value={user.username} onChange={onChangeUsername} />
                </div>
                <div className="login-input-label">Wachtwoord</div>
                <div className="">
                    <Input placeholder="Jouw wachtwoord" type="password"
                        classes="login-input"
                        value={user.password} onChange={onChangePassword} />
                </div>
                <div>{apiError && (
                    <div className="">
                        <div className="login-alert" role="alert">Deze gegevens kloppen niet</div>
                    </div>
                )}</div>
                <div className="login-button-middle">
                    <ButtonWithProgress onClick={onClickLogin}
                        disabled={disableSubmit}
                        pendingApiCall={pendingApiCall}
                        text="Login"
                        classes="login-button" />
                </div>
            </div>
        </div >
    );
}

Login.defaultProps = {
    actions: {
        login: () => new Promise((resolve, reject) => resolve({}))
    },
    dispatch: () => { }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            login: (body) => dispatch(authActions.loginHandler(body))
        }
    }
}

export default connect(null, mapDispatchToProps)(Login);