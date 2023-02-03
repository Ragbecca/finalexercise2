import React, { Component, useContext } from 'react';
import AuthContext from './AuthContext';
import * as apiCalls from '../api/apiCalls';

const CategoryContext = React.createContext();

class CategoryProvider extends Component {

    static contextType = AuthContext;

    state = {
        categories: null,
        refreshCall: false,
        initialCall: false
    }

    setCategories = async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        const categoriesGotten = await apiCalls.getTaskCategories(this.context.getUser());
        const categoriesData = categoriesGotten.data;
        this.setState({ categories: categoriesData, refreshCall: true, initialCall: true });
    }

    getCategories = () => {
        this.setState({ refreshCall: false });
        return this.state.categories;
    }

    render() {
        const { children } = this.props;
        const { categories, refreshCall, initialCall } = this.state;
        const { setCategories, getCategories } = this;

        return (
            <CategoryContext.Provider value={{ categories, refreshCall, initialCall, setCategories, getCategories }}>
                {children}
            </CategoryContext.Provider>
        )
    }
}

export default CategoryContext;

export function useCategoryContext() {
    return useContext(CategoryContext);
}

export { CategoryProvider }