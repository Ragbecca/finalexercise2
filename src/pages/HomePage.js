import { useState } from "react"
import { numberOfUsers } from "../api/apiCalls";
import { handleLogError } from "../misc/Helpers";
import { Loader } from "../components/misccomponents/Loader";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [numberOfUsersState, setNumberOfUsersState] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [initialCall, setInitialCall] = useState(true);

    if (initialCall) {
        setInitialCall(false);
        try {
            setData();
        } catch (error) {
            handleLogError(error)
        } finally {
            setLoading(false);
        }
    }

    async function setData() {
        await numberOfUsers().then(result => setNumberOfUsersState(result.data));
    }

    if (isLoading) {
        return <Loader />
    }

    return <div id="homepage">
        <div id="homepage-container">
            <div id="homepage-main">
                <div id="homepage-divider">
                    <div id="homepage-amount-users">
                        <div id="homepage-amount-users-top">Users:</div>
                        <div id="homepage-amount-users-bottom">{numberOfUsersState}</div></div>
                    <div className="homepage-to"><Link className="homepage-link-to" to="/login">Login</Link></div>
                    <div className="homepage-to"><Link className="homepage-link-to" to="/signup">Sign up</Link></div>
                </div>
            </div>
        </div>
    </div>
}

export default HomePage;