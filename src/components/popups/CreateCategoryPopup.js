import React, { useState } from "react";
import ButtonWithProgress from "../misccomponents/ButtonWithProgress";
import InputLabelTop from "../misccomponents/InputLabelTop";
import * as apiCalls from "../../api/apiCalls";
import AuthContext from "../../misc/AuthContext";
import CategoryContext from "../../misc/CategoryContext";

const CreateCategoryPopup = props => {
    const contextType = React.useContext(AuthContext);
    const contextTypeCategory = React.useContext(CategoryContext);

    const [cName, setCName] = useState('');

    function onChangeCName(event) {
        setCName(event.target.value);
    }

    function onClickCreateTask() {
        let body = {
            categoryName: cName
        };
        apiCalls.addCategory(contextType.getUser(), body)
            .then(contextTypeCategory.setCategories(contextType.getUser().data.name))
            .then(props.handleClose)
    }

    let disableSubmit = false;
    if (cName === '') {
        disableSubmit = true;
    }

    return (
        <div className="popup-box">
            <div className="box">
                <div className="popup-header">
                    <div>Add a Category</div>
                    <div className="close-icon" onClick={props.handleClose}>X</div>
                </div>
                <div className="popup-line-1">
                    <InputLabelTop
                        label="Name"
                        mandatory={true}
                        value={cName} onChange={onChangeCName} />
                </div>
                <div className="popup-line-4">Mandatory field<span className="red-color">*</span></div>
                <div className="popup-line-5">
                    <ButtonWithProgress onClick={onClickCreateTask}
                        disabled={disableSubmit}
                        text="Add Category"
                        classes="create-task-button" />
                </div>
            </div>
        </div>
    );
};

export default CreateCategoryPopup;