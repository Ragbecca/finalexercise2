import { useState, useEffect } from "react";

const Header = () => {
    const [dateState, setDateState] = useState(new Date());

    useEffect(() => {
        setInterval(() => setDateState(new Date()), 10000);
    }, []);

    return <div id="header" className="poppins-bold rem-3 relative">
        {
            dateState.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            })
        } {dateState.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
        })}
    </div>;
}

export default Header;