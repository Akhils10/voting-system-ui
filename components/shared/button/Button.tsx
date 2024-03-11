import React from "react";
import styles from "./Button.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	className?: string;
	onClick?: (event?: any) => void;
}

const Button = ({ children, onClick, className, ...otherProps }: Props) => {
	return (
		<button
			onClick={onClick}
			className={`${className} ${styles.button}`}
			{...otherProps}
		>
			{children}
		</button>
	);
};

export default Button;
