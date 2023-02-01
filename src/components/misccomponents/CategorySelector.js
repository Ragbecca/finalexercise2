import React, { useEffect, useState } from 'react';
import SelectSearch from 'react-select-search';
import * as apiCalls from '../../api/apiCalls';
import AuthContext from '../../misc/AuthContext';

const CategorySelector = (props) => {
    const contextType = React.useContext(AuthContext);

    const [category, setCategory] = useState(props.currentValue);
    const [categories, setCategories] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [initialCall, setInitialCall] = useState(true);

    if (initialCall) {
        setInitialCall(false);
        apiCalls.getTaskCategories(contextType.getUser()).then(results => {
            setCategories(results.data)
        })
    }

    useEffect(() => {
        props.onChange(category);
    }, [category]);

    useEffect(() => {
        if (categories.length === 0) {
            return;
        } else {
            let tempCategories = [];
            categories.forEach(singleCategory => {
                const tempCategory = { "name": singleCategory.categoryName, "value": singleCategory.id };
                tempCategories.push(tempCategory);
            })
            tempCategories.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
            setCategoryOptions(tempCategories);
        }
    }, [categories]);

    return (
        <SelectSearch options={categoryOptions} value={category} onChange={setCategory} name="category" placeholder="Search a category *" search />
    );
};

CategorySelector.defaultProps = {
    onChange: () => { }
};

export default CategorySelector;