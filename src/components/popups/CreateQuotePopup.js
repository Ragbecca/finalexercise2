import React from "react";
import InputLabelTop from "../misccomponents/InputLabelTop";
import { useState } from "react";
import ButtonWithProgress from "../misccomponents/ButtonWithProgress";
import { connect } from "react-redux";

const CreateQuotePopup = props => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [pendingApiCall, setPendingApiCall] = useState(false);

    function onChangeQuote(event) {
        setQuote(event.target.value);
    }

    function onChangeAuthor(event) {
        setAuthor(event.target.value);
    }

    function onClickCreateTask() {
        let body = {
            quote: quote,
            author: author
        };
        console.log(body);
    }

    let disableSubmit = false;
    if (quote === '' || author === '') {
        disableSubmit = true;
    }

    return (
        <div className="popup-box">
            <div className="box">
                <div className="popup-header">
                    <div>Add a Task</div>
                    <div className="close-icon" onClick={props.handleClose}>X</div>
                </div>
                <div className="popup-line-1">
                    <InputLabelTop
                        label="Quote"
                        mandatory={true}
                        value={quote} onChange={onChangeQuote} />
                </div>
                <div className="popup-line-2">
                    <InputLabelTop label="Author"
                        mandatory={true}
                        value={author} onChange={onChangeAuthor} />
                </div>
                <div className="popup-line-4">Mandatory field<span className="red-color">*</span></div>
                <div className="popup-line-5">
                    <ButtonWithProgress onClick={onClickCreateTask}
                        disabled={disableSubmit}
                        pendingApiCall={pendingApiCall}
                        text="Add Website"
                        classes="create-task-button" />
                </div>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        user: state
    }
}

export default connect(mapStateToProps)(CreateQuotePopup);