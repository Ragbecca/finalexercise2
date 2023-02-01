import * as apiCalls from '../../api/apiCalls';
import React, { useState } from 'react';
import AuthContext from '../../misc/AuthContext';
import SingleCategory from './SingleCategory';
import CreateCategoryPopup from '../popups/CreateCategoryPopup';

const CategoryList = props => {
    const contextType = React.useContext(AuthContext);

    const [categories, setCategories] = useState([]);
    const [refreshCall, setRefreshCall] = useState(true);
    const [initialCall, setInitialCall] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    if (refreshCall) {
        setRefreshCall(false);
        delayedRefreshCall();
    }

    async function delayedRefreshCall() {
        await new Promise(resolve => setTimeout(resolve, 100));
        apiCalls.getTaskCategories(contextType.getUser()).then(response => setCategories(response.data));
    }

    if (initialCall) {
        setInitialCall(false);
        apiCalls.getTaskCategories(contextType.getUser()).then(response => setCategories(response.data));
    }

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    return <div className='admin-category'>
        <div className='admin-category-header'>All Categories</div>
        <div className='admin-category-scrollbar-outer'>
            <div className='admin-category-scrollbar'>
                {categories.map(category => { return <SingleCategory key={category.id} id={category.id} name={category.categoryName} setRefreshCall={setRefreshCall} refreshGlobalTasks={props.refreshGlobalTasks} /> })}
            </div>
        </div>
        <div className="add-category"><span className="icon" onClick={togglePopUp}>+<span className="icon-tooltip">Add a Task</span></span></div>
        {isOpen && <CreateCategoryPopup handleClose={togglePopUp} setRefreshCall={setRefreshCall} />}
    </div>
}

export default CategoryList;