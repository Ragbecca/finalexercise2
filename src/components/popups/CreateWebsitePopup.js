import React from "react";
import InputLabelTop from "../misccomponents/InputLabelTop";
import { useState } from "react";
import ButtonWithProgress from "../misccomponents/ButtonWithProgress";
import InputLabelTextArea from "../misccomponents/InputLabelTextArea";
import AuthContext from "../../misc/AuthContext";
import * as apiCalls from "../../api/apiCalls";

const CreateWebsitePopup = props => {
    const contextType = React.useContext(AuthContext);

    const [websiteName, setWebsiteName] = useState('');
    const [websiteURL, setWebsiteURL] = useState('');
    const [websiteDescription, setWebsiteDescription] = useState('');

    function onChangeName(event) {
        setWebsiteName(event.target.value);
    }

    function onChangeURL(event) {
        setWebsiteURL(event.target.value);
    }

    function onChangeDescription(event) {
        setWebsiteDescription(event.target.value);
    }

    function onClickCreateTask() {
        let body = {
            websiteName: websiteName,
            url: websiteURL,
            description: websiteDescription,
            username: contextType.getUser().data.name
        };
        console.log(body);
        apiCalls.addWebsite(contextType.getUser(), body).then(props.refreshGlobalWebsites(true)).then(props.handleClose);
    }

    let disableSubmit = false;
    if (websiteName === '' || websiteURL === '' || websiteDescription === '') {
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
                        label="Name website"
                        mandatory={true}
                        value={websiteName} onChange={onChangeName} />
                </div>
                <div className="popup-line-2">
                    <InputLabelTop label="Website URL"
                        type="url"
                        mandatory={true}
                        value={websiteURL} onChange={onChangeURL} />
                </div>
                <div className="popup-line-3-2">
                    <InputLabelTextArea label="Website description"
                        mandatory={true}
                        value={websiteDescription} onChange={onChangeDescription} />
                </div>
                <div className="popup-line-4">Mandatory field<span className="red-color">*</span></div>
                <div className="popup-line-5">
                    <ButtonWithProgress onClick={onClickCreateTask}
                        disabled={disableSubmit}
                        text="Add Website"
                        classes="create-task-button" />
                </div>
            </div>
        </div>
    );
};

export default CreateWebsitePopup;