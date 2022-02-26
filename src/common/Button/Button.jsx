import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({
	buttonText,
	buttonType,
	iconName,
	className,
	clickHandler,
}) =>
	iconName ? (
		<button onClick={clickHandler} className={className}>
			<FontAwesomeIcon icon={iconName} />
		</button>
	) : (
		<button onClick={clickHandler} className={className} type={buttonType}>
			{buttonText}
		</button>
	);

export default Button;
