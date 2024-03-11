"use client";

import React, { useEffect } from "react";
import styles from "./Modal.module.scss";

interface Props {
	openModal: boolean;
	className?: string;
	children?: React.ReactNode,
	close: ()=> void;
	title?: string;
}

let id: number = 0;
const Modal = ({
	openModal,
	className,
	children,
	close,
	title	
}: Props) => {
	
	useEffect(() => {
		const handleClickOutside = () => {
			close();
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [close]);
	useEffect(() => {
		document.body.style.overflow = openModal ? "hidden" : "auto";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [openModal]);


	return (
		<div className={styles.modal_container}>
			<div
				className={`${styles.modal} ${className}`}
				onClick={(e: React.MouseEvent<HTMLDivElement>) =>
					e.nativeEvent.stopImmediatePropagation()
				}
			>
				<div className={styles.header}>
					{title && <div className={styles.title}>
						<h3>{title}</h3>
					</div>}
					<div
						className={styles.closeModal_container}
						onClick={() => {
							close();
						}}
					>
						<div className={styles.closeModal}>
							<span></span>
							<span></span>
						</div>
					</div>
				</div>
				<div className={styles.contents}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;