import React from 'react'

const Input = ({ name, label, className, required, type, ...otherProps }) => {
    return (
        <div className={`input-container`}>
            <label>{label}</label>
            <input {...otherProps}
                name={name}
                type={type}
                className={className}
                required={required ? true : false}
            />
        </div>
    )
}

export default Input