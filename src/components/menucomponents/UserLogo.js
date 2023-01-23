import { connect } from "react-redux";

const UserLogo = () => {
    return <div className="user-menu poppins-bold">
        <img src="/unknown.png" className="user-menu-image" alt="User"></img>
        <div className="user-menu-name">TEST McTestFace</div>
    </div>
}

function mapStateToProps(state) {
    return {
        user: state
    }
}

export default connect(mapStateToProps)(UserLogo);