import React, { useState } from 'react';
import * as apiCalls from '../../api/apiCalls'
import AuthContext from '../../misc/AuthContext';
import CategoryContext from '../../misc/CategoryContext';
import TaskContext from '../../misc/TaskContext';
import DeleteCategoryPopup from '../popups/DeleteCategoryPopup';


const SingleCategory = props => {
    const contextType = React.useContext(AuthContext);
    const contextTypeCategory = React.useContext(CategoryContext);
    const contextTypeTasks = React.useContext(TaskContext);

    const [isOpen, setIsOpen] = useState(false);

    function deleteFromDB() {
        setIsOpen(false);
        apiCalls.deleteCategory(contextType.getUser(), props.id).then(contextTypeCategory.setCategories()).then(contextTypeTasks.setTasks(contextType.getUser().data.name));
    }

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    return <div className="admin-category-single">
        <div>{props.name}</div>
        <div className='add-category'>
            <div className="icon-small" onClick={togglePopUp}>-<div className='icon-tooltip-parent'><div className="icon-tooltip">Remove Category</div></div></div>
            {isOpen && <DeleteCategoryPopup handleClose={togglePopUp} deleteCategory={deleteFromDB} categoryName={props.name} />}
        </div>
    </div>
}

export default SingleCategory;