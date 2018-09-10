import React from 'react';

const TextInputGroup = ({
  placeholder,
  name,
  type,
  error,
  label,
  onChange,
  value
}) => (
  <div className = "form-group" >
    <label>{label}</label>
    < input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value = {value}
        />
        {error && <div className = "error-message" > {error} </div> }
  </div>
);

// set the default props for TextInputGroup if the props aren't given.
TextInputGroup.defaultProps = {
  type: 'text'
}

export default TextInputGroup;
