import React from 'react';
import './Input.css';

const Input = ({
	changeHandler,
	labelText,
	inputValue,
	placeholderText,
	typeText,
	id,
	children,
}) => {
	// Returning input with label tag and without label tag
	// can be used based on condition

	return labelText ? (
		<div className='label-input position-relative'>
			<label htmlFor={labelText}>{labelText}</label>
			<input
				id={id}
				type={typeText}
				defaultValue={inputValue}
				className='form-control me-2'
				placeholder={placeholderText}
				onChange={changeHandler}
			/>
			{children}
		</div>
	) : (
		<input
			type={typeText}
			defaultValue={inputValue}
			className='form-control me-2'
			placeholder={placeholderText}
			onChange={changeHandler}
		/>
	);
};

export default Input;
