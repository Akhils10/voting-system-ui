"use client";

import React, { useMemo, useState } from "react";
import styles from "./Accordion.module.scss";
import { formatNum, shortenTitle } from "@/utils";
import { Button } from "../shared";
import { Topic, VoteOption, setRefetch } from "@/store/voteSlice";
import { useVoteMethods } from "@/hooks/useVote";
import { toast } from "react-toastify";
import VoteConfirmationModal from "../modals/voteConfirmationModal/VoteConfirmationModal";
import { useAppDispatch } from "@/store";

interface Props {
	topic: Topic;
}

const Accordion = ({ topic }: Props) => {
	const dispatch = useAppDispatch();
	const { castVote } = useVoteMethods();
	const [isActive, setIsActive] = useState<boolean>(false);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [modalContext, setModalContext] = useState<{
		title: string;
		description: string;
		okBtnHandler: (option: string) => void;
		actionLoading?: boolean;
	} | null>(null);

	const totalVotes = useMemo(
		() => topic.options.reduce((a, b) => a + b.votes, 0),
		[topic.options]
	);

	const closeModal = () => {
		setOpenModal(false);
	};

	const voteOption = async (option: string) => {
		try {
			setModalContext((prev) => {
				return {
					...prev,
					actionLoading: true
				}
			})
			await castVote({ title: topic.title, option, pubKey: topic.pubKey });
			setOpenModal(false);
			setIsActive(false)
			dispatch(setRefetch(true));
			toast.success("Voting has been placed!");
		} catch (error: any) {
			toast.error(error?.message || "Could not place vote.");
		} finally {
			setModalContext((prev) => {
				return {
					...prev,
					actionLoading: false
				}
			})
		}
	};

	const onclickVoteOptionBtn = async (option: string) => {
		setModalContext({
			title: "Confirm vote",
			description: `You have chosen to vote on the option: "${option}", click 'Ok' to proceed otherwise cancel your selection. Once you vote, you will be unable to cancel the votes. You can vote multiple times for the same option`,
			okBtnHandler: () => voteOption(option)
		});
		setOpenModal(true);
	};

	return (
		<div className={styles.accordion} data-active={isActive}>
			<div className={styles.header} onClick={() => setIsActive(!isActive)}>
				<div className={styles.text}>
					<h3>{isActive ? topic.title : shortenTitle(topic.title, 40)}</h3>
				</div>
				<div className={styles.small_row}>
					<div className={styles.text}>
						<p>{totalVotes} votes</p>
					</div>
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className={styles.chevron}
					>
						<mask
							id="mask0_2538_1218"
							maskUnits="userSpaceOnUse"
							x="0"
							y="0"
							width="20"
							height="20"
						>
							<rect width="20" height="20" fill="#D9D9D9" />
						</mask>
						<g mask="url(#mask0_2538_1218)">
							<path
								d="M10.5001 10.0001L7.25007 6.75008C7.09729 6.5973 7.0209 6.40286 7.0209 6.16675C7.0209 5.93064 7.09729 5.73619 7.25007 5.58341C7.40285 5.43064 7.59729 5.35425 7.8334 5.35425C8.06952 5.35425 8.26396 5.43064 8.41674 5.58341L12.2501 9.41675C12.3334 9.50008 12.3924 9.59036 12.4272 9.68758C12.4619 9.7848 12.4792 9.88897 12.4792 10.0001C12.4792 10.1112 12.4619 10.2154 12.4272 10.3126C12.3924 10.4098 12.3334 10.5001 12.2501 10.5834L8.41674 14.4167C8.26396 14.5695 8.06952 14.6459 7.8334 14.6459C7.59729 14.6459 7.40285 14.5695 7.25007 14.4167C7.09729 14.264 7.0209 14.0695 7.0209 13.8334C7.0209 13.5973 7.09729 13.4029 7.25007 13.2501L10.5001 10.0001Z"
								fill="#ABB0BA"
							/>
						</g>
					</svg>
				</div>
			</div>
			<div className={styles.body}>
				{topic.options.map((option: VoteOption, index: number) => (
					<Button
						key={index}
						className={styles.button}
						onClick={() => onclickVoteOptionBtn(option.label)}
					>
						<div className={styles.text}>
							<h4>{option.label}</h4>
							<p>{formatNum(option.votes)} votes </p>
						</div>
					</Button>
				))}
			</div>
			{openModal && (
				<VoteConfirmationModal
					context={modalContext}
					openModal={openModal}
					close={closeModal}
				/>
			)}
		</div>
	);
};

export default Accordion;
