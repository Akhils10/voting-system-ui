import { TopicDetails } from "@/components/hero/Hero";
import React, { useCallback, useState } from "react";
import styles from "./VoteOptionsModal.module.scss";
import Modal from "../modal/Modal";
import { toast } from "react-toastify";
import { Button, InputField } from "@/components/shared";
import Loader from "@/components/shared/loaders/loader/Loader";

interface Props {
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	openModal: boolean;
	topicDetails: TopicDetails;
	setTopicDetails: React.Dispatch<React.SetStateAction<TopicDetails>>;
	onSubmit: () => void;
    isLoading: boolean
}

const VoteOptionsModal = ({
	openModal,
	setOpenModal,
	topicDetails,
	setTopicDetails,
	onSubmit,
    isLoading
}: Props) => {
	const [option, setOption] = useState<string>("");
	const options = topicDetails.options;
	const addOption = () => {
		if (!option) {
			toast.error("Input field cannot be empty");
			return;
		}

		options.push(option);
		setTopicDetails({ ...topicDetails, options });
		setOption("");
	};
	const close = () => {
		setOption("");
		setTopicDetails({ title: "", options: [] });
		setOpenModal(false);
	};

	const deleteOption = (_option: string) => {
		const filteredOptions = options.filter((option) => option !== _option );
		setTopicDetails({ ...topicDetails, options: filteredOptions });
	};
	return (
		<Modal
			openModal={openModal}
			close={close}
			title={topicDetails.title}
			className={styles.modal}
		>
			<div className={styles.body}>
				<div className={styles.row}>
					<InputField
						placeholder="Add a voting option"
						onChange={(e: any) => setOption(e.target.value)}
						value={option}
						className={styles.input}
					/>
					<Button onClick={addOption} className={styles.button}>
						Add
					</Button>
				</div>
				<div className={styles.row}>
					{topicDetails.options.map((option, index) => (
						<div className={styles.card} key={index}>
							<p>{option}</p>
							<div
								className={styles.delete}
								onClick={() => deleteOption(option)}
							>
								<span></span>
								<span></span>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className={styles.footer}>
				<Button
					className={styles.button}
					disabled={!topicDetails.options.length || isLoading}
					onClick={onSubmit}
				>
					Publish Topic &nbsp; {isLoading && <Loader />}
				</Button>
			</div>
		</Modal>
	);
};

export default VoteOptionsModal;
