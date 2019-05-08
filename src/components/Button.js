import React from 'react'

const Button = ({ className, disabled, children, ...otherProps }) => {
	return (
		<button
			{...otherProps}
			className={`component-buttons ${className}`}
			disabled={disabled}>
			{children}
		</button>
	)
}

export default Button