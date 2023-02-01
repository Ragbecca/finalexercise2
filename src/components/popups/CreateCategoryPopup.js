import React, { useState } from "react";
import ButtonWithProgress from "../misccomponents/ButtonWithProgress";
import InputLabelTop from "../misccomponents/InputLabelTop";
import * as apiCalls from "../../api/apiCalls";
import AuthContext from "../../misc/AuthContext";

const CreateCategoryPopup = props => {
    const [cName, setCName] = useState('');
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const contextType = React.useContext(AuthContext);

    function onChangeCName(event) {
        setCName(event.target.value);
    }

    function onClickCreateTask() {
        let body = {
            categoryName: cName
        };
        setPendingApiCall(true);
        apiCalls.addCategory(contextType.getUser(), body)
            .then(setPendingApiCall(false))
            .then(props.setRefreshCall(true))
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
                        pendingApiCall={pendingApiCall}
                        text="Add Category"
                        classes="create-task-button" />
                </div>
            </div>
        </div>
    );
};

export default CreateCategoryPopup;