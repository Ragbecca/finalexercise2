import React from "react";
import ButtonWithProgress from "../misccomponents/ButtonWithProgress";
import InputLabelTop from "../misccomponents/InputLabelTop";

const DeleteQuotePopup = props => {
    return (
        <div className="popup-box">
            <div className="box">
                <div className="popup-header">
                    <div>Do you really want to delete:</div>
                    <div className="close-icon" onClick={props.handleClose}>X</div>
                </div>
                <div className="popup-line-1">
                    <InputLabelTop
                        label="Quote"
                        disabled
                        value={props.quote} />
                </div>
                <div className="popup-line-1">
                    <InputLabelTop
                        label="Author"
                        disabled
                        value={props.author} />
                </div>
                <div className="popup-line-5">
                    <ButtonWithProgress onClick={props.deleteQuote}
                        text="Delete Category"
                        classes="create-task-button" />
                </div>
            </div>
        </div>
    );
};

export default DeleteQuotePopup;