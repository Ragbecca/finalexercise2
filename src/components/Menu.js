import Logo from "./menucomponents/Logo";
import UserLogo from "./menucomponents/UserLogo";
import SelectorDashboard from "./menucomponents/SelectorDashboard";

const Menu = () => {

    return <div className="menu">
        <div className="menu-1">
            <div>
                <Logo />
            </div>
            <div>
                <UserLogo />
            </div>
        </div>
        <SelectorDashboard />
    </div>;
}

export default Menu;