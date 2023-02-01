import * as apiCalls from '../../api/apiCalls';
import React, { useState } from 'react';
import AuthContext from '../../misc/AuthContext';
import SingleUser from './SingleUser';

const UserList = () => {
    const contextType = React.useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [refreshCall, setRefreshCall] = useState(true);

    if (refreshCall) {
        setRefreshCall(false);
        apiCalls.getUsers(contextType.getUser()).then(response => setUsers(response.data));
    }

    return <div className='idk'>
        {users.map(user => { return <SingleUser key={user.username} /> })}
    </div>
}

export default UserList;