import React, { useState, useEffect } from 'react';
import SingleCategory from './SingleCategory';
import CreateCategoryPopup from '../popups/CreateCategoryPopup';
import CategoryContext from '../../misc/CategoryContext';
import SelectorContext from '../../misc/SelectorContext';
import { adminLocation } from '../../misc/ConstantValues';

const CategoryList = () => {
    const contextTypeCategory = React.useContext(CategoryContext);
    const contextTypeSelector = React.useContext(SelectorContext);

    const [categories, setCategories] = useState([]);
    const [isChangeCategories, setChangeCategories] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (contextTypeCategory.refreshCall === false) {
            return;
        }
        setChangeCategories(true);
    }, [contextTypeCategory.refreshCall]);

    useEffect(() => {
        if (contextTypeSelector.selectorState !== adminLocation || contextTypeCategory.initialCall === false) {
            return;
        }
        setChangeCategories(true);
    }, [contextTypeSelector.selectorState, contextTypeCategory.initialCall]);

    if (isChangeCategories) {
        setChangeCategories(false);
        setCategories(contextTypeCategory.getCategories());
    }

    function togglePopUp() {
        setIsOpen(!isOpen);
    }

    return <div className='admin-category'>
        <div className='admin-category-header'>All Categories</div>
        <div className='admin-category-scrollbar-outer'>
            <div className='admin-category-scrollbar'>
                {categories.map(category => { return <SingleCategory key={category.id} id={category.id} name={category.categoryName} /> })}
            </div>
        </div>
        <div className="add-category"><span className="icon" onClick={togglePopUp}>+<span className="icon-tooltip">Add a Task</span></span></div>
        {isOpen && <CreateCategoryPopup handleClose={togglePopUp} />}
    </div>
}

export default CategoryList;