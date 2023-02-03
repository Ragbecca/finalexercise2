import React from "react";
import InputLabelTop from "../misccomponents/InputLabelTop";
import { useState } from "react";
import ButtonWithProgress from "../misccomponents/ButtonWithProgress";
import QuoteContext from "../../misc/QuoteContext";
import AuthContext from "../../misc/AuthContext";
import * as apiCalls from "../../api/apiCalls";

const CreateQuotePopup = props => {
    const contextType = React.useContext(AuthContext);
    const contextTypeQuote = React.useContext(QuoteContext);

    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');

    function onChangeQuote(event) {
        setQuote(event.target.value);
    }

    function onChangeAuthor(event) {
        setAuthor(event.target.value);
    }

    async function onClickCreateQuote() {
        let body = {
            quote: quote,
            author: author,
            username: contextType.getUser().data.name
        };
        await apiCalls.addQuote(contextType.getUser(), body).then(props.handleClose)
            .finally(contextTypeQuote.setQuotes(contextType.getUser().data.name));
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
                    <ButtonWithProgress onClick={onClickCreateQuote}
                        disabled={disableSubmit}
                        text="Add Quote"
                        classes="create-task-button" />
                </div>
            </div>
        </div>
    );
};

export default CreateQuotePopup;