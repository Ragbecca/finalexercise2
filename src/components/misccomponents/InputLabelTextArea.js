import React from 'react';

const InputLabelTextArea = props => {

    let inputClassName = props.classes;
    if (props.type === 'file') {
        props.className += '-file';
    };
    if (props.hasError !== undefined) {
        inputClassName += props.hasError ? ' is-invalid' : ' is-valid';
    };

    return (
        <div className="input-label-top-text-area">
            {props.label && <label className="input-label-top-label">{props.label} {props.mandatory && <span className='red-color'>*</span>}</label>}
            <textarea
                className="input-label-top-text-area-input"
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled || false}
            />
            {props.hasError && (
                <span className="invalid-feedback">{props.error}</span>
            )}
        </div>
    );
};

InputLabelTextArea.defaultProps = {
    onChange: () => { }
};

export default InputLabelTextArea;