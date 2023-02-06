import React, { useEffect, useState } from 'react';
import SelectSearch from 'react-select-search';
import CategoryContext from '../../misc/CategoryContext';
import SelectorContext from '../../misc/SelectorContext';

const CategorySelector = props => {
    const contextTypeCategory = React.useContext(CategoryContext);
    const contextTypeSelector = React.useContext(SelectorContext);

    const [category, setCategory] = useState(props.currentValue);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [isChangeCategories, setChangeCategories] = useState(false);

    useEffect(() => {
        if (contextTypeCategory.refreshCall === false) {
            return;
        }
        setChangeCategories(true);
    }, [contextTypeCategory.refreshCall]);

    useEffect(() => {
        if (contextTypeSelector.selectorState !== props.selectorOrigin || contextTypeCategory.initialCall === false) {
            return;
        }
        setChangeCategories(true);
    }, [contextTypeSelector.selectorState, contextTypeCategory.initialCall])

    if (isChangeCategories) {
        setChangeCategories(false);
        const tempCategories = contextTypeCategory.getCategories()
            .map(c => ({ "name": c.categoryName, "value": c.id }))
            .sort((a, b) => a.name.localeCompare(b.name));
        setCategoryOptions(tempCategories);
    }

    useEffect(() => {
        props.onChange(category);
    }, [category]);

    return (
        <SelectSearch options={categoryOptions} value={category} onChange={setCategory} name="category" placeholder="Search a category *" search />
    );
};

CategorySelector.defaultProps = {
    onChange: () => { }
};

export default CategorySelector;