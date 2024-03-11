"use client";

import React, { useState } from "react";
import styles from "./Hero.module.scss";
import { Button, InputField } from "../shared";
import Modal from "../modals/modal/Modal";
import { toast } from "react-toastify";
import { Topic, setRefetch } from "@/store/voteSlice";
import { useVoteMethods } from "@/hooks/useVote";
import VoteOptionsModal from "../modals/voteOptionsModal/VoteOptionsModal";
import { useAppDispatch } from "@/store";

export type TopicDetails = {
	title: string;
	options: string[];
};

const Hero = () => {
	const dispatch = useAppDispatch()
	const { createTopic } = useVoteMethods();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [topicDetails, setTopicDetails] = useState<TopicDetails>({
		title: "",
		options: [],
	});

	const handlecCreateTopicBtn = () => {
		if (!topicDetails.title) {
			toast.error("Input field cannot be empty");
			return;
		}
		setOpenModal(true);
	};

	const handleSubmitTopicBtn = async () => {
		try {
			setIsLoading(true)
			await createTopic(topicDetails);
			dispatch(setRefetch(true));
			setOpenModal(false);
		} catch (error: any) {
			toast.error(error?.message || "Could not create account");
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={styles.hero}>
			<div className={styles.row}>
				<InputField
					placeholder="Create a topic"
					value={topicDetails.title}
					className={styles.input}
					onChange={e =>
						setTopicDetails({ ...topicDetails, title: e.target.value })
					}
				/>
				<Button onClick={handlecCreateTopicBtn} className={styles.button}>
					Create Topic
				</Button>
			</div>
			{openModal && (
				<VoteOptionsModal
					topicDetails={topicDetails}
					setTopicDetails={setTopicDetails}
					openModal={openModal}
					setOpenModal={setOpenModal}
					isLoading={isLoading}
					onSubmit={handleSubmitTopicBtn}
				/>
			)}
		</div>
	);
};

export default Hero;
