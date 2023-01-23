import React, { useEffect, useState } from 'react';
import SelectSearch from 'react-select-search';
import tasksCategoryJson from '../../json/temp/TasksCategoryTemp.json';

const CategorySelector = (props) => {
    const [category, setCategory] = useState(0);
    const [categories, setCategories] = useState([]);
    const [initialCall, setInitialCall] = useState(true);

    if (initialCall) {
        setInitialCall(false);
        let categoriesTemp = [];
        tasksCategoryJson.forEach(task => {
            const categoryTemp = { "name": task.categoryName, "value": task.id }
            categoriesTemp.push(categoryTemp);
        });
        setCategories(categoriesTemp);
    }

    useEffect(() => {
        props.onChange(category);
    }, [category])

    return (
        <SelectSearch options={categories} value={category} onChange={setCategory} name="category" placeholder="Search a category *" search />
    );
};

CategorySelector.defaultProps = {
    onChange: () => { }
};

export default CategorySelector;