import React from 'react';
import { useRef } from 'react';

const InputLabelTop = (props) => {

    let inputClassName = props.classes;
    if (props.type === 'file') {
        props.className += '-file';
    };
    if (props.hasError !== undefined) {
        inputClassName += props.hasError ? ' is-invalid' : ' is-valid';
    };

    return (
        <div className="input-label-top">
            {props.label && <label className="input-label-top-label">{props.label} {props.mandatory && <span className='red-color'>*</span>}</label>}
            <input
                className="input-label-top-input"
                type={props.type || 'text'}
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

InputLabelTop.defaultProps = {
    onChange: () => { }
};

export default InputLabelTop;