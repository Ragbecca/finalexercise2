import { ReactComponent as DashboardLogo } from '../../img/dashboard.svg';
import { ReactComponent as TasksLogo } from '../../img/task.svg';
import { ReactComponent as WebsitesLogo } from '../../img/website.svg';
import { ReactComponent as UnknownLogo } from '../../img/unknown-document.svg';
import { ReactComponent as LoginLogo } from '../../img/login.svg';
import { ReactComponent as LogoutLogo } from '../../img/logout.svg';
import { ReactComponent as QuotesLogo } from '../../img/quote.svg';
import { ReactComponent as SignUpLogo } from '../../img/signup.svg'
import SelectorSingle from './SelectorSingle';
import LogoutSelector from './LogoutSelector';

const Selector = (props) => {

    const selectorimgClass = "selector-image"

    function onClickLogout() {
        const action = {
            type: 'logout-success'
        };
        this.props.dispatch(action);
        props.setSelectorState("dashboard");
    }

    const imagesList = [
        <DashboardLogo key="DashboardLogo" className={selectorimgClass} />, <TasksLogo key="TaskssLogo" className={selectorimgClass} />,
        <WebsitesLogo key="WebsitesLogo" className={selectorimgClass} />, <QuotesLogo key="QuotesLogo" className={selectorimgClass} />,
        <LoginLogo key="LoginLogo" className={selectorimgClass} />, <LogoutLogo key="LogoutLogo" className={selectorimgClass} />,
        <UnknownLogo key="UnknownLogo" className={selectorimgClass} />, <SignUpLogo key="SignUpLogo" classname={selectorimgClass} />
    ];

    if (props.name === "Logout") {
        return <LogoutSelector name={props.name} setSelectorState={props.setSelectorState} selectorState={props.selectorState} logout={onClickLogout}>{imagesList.find((a) => a.key.toLowerCase() === "logoutlogo")}</LogoutSelector>
    } else if (props.name !== "") {
        return <SelectorSingle name={props.name} setSelectorState={props.setSelectorState} selectorState={props.selectorState}>{imagesList.find((a) => a.key.toLowerCase().includes(props.name.toLowerCase()))}</SelectorSingle>
    } else {
        return <SelectorSingle name={props.name} setSelectorState={props.setSelectorState} selectorState={props.selectorState}>{imagesList.find((a) => a.key.toLowerCase() === "unknownlogo")}</SelectorSingle>
    }
}

export default Selector;