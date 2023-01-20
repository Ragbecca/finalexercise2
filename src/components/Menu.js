import Logo from "./Logo";
import UserLogo from "./UserLogo";
import SelectorDashboard from "./SelectorDashboard";

const Menu = (props) => {

    return <div className="menu">
        <div className="menu-1">
            <div>
                <Logo />
            </div>
            <div>
                <UserLogo />
            </div>
        </div>
        <SelectorDashboard setSelectorState={props.setSelectorState} selectorState={props.selectorState} />
    </div>;
}

export default Menu;