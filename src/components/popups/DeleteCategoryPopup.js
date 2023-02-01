import React from "react";
import ButtonWithProgress from "../misccomponents/ButtonWithProgress";
import InputLabelTop from "../misccomponents/InputLabelTop";

const DeleteCategoryPopup = props => {
    return (
        <div className="popup-box">
            <div className="box">
                <div className="popup-header">
                    <div>Do you really want to delete:</div>
                    <div className="close-icon" onClick={props.handleClose}>X</div>
                </div>
                <div className="popup-line-1">
                    <InputLabelTop
                        label="Category"
                        disabled
                        value={props.categoryName} />
                </div>
                <div className="popup-line-5">
                    <ButtonWithProgress onClick={props.deleteCategory}
                        text="Delete Category"
                        classes="create-task-button" />
                </div>
            </div>
        </div>
    );
};

export default DeleteCategoryPopup;