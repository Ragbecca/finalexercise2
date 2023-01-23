import Logo from "./menucomponents/Logo";
import UserLogo from "./menucomponents/UserLogo";
import SelectorDashboard from "./menucomponents/SelectorDashboard";

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