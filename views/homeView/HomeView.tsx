"use client";

import React from "react";
import styles from "./HomeView.module.scss";
import { Accordion, Hero } from "@/components";
import { useAppSelector } from "@/store";
import useFetchTopics from "@/hooks/useVote";

const HomeView = () => {
	useFetchTopics({ refetchInterval: 3000 });
	const topics = useAppSelector(state => state.vote.topics);
	return (
		<section className={styles.section}>
			<Hero />
			<div className={styles.votes}>
				{topics.map((topic, index) => (
					<Accordion topic={topic} key={index} />
				))}
			</div>
		</section>
	);
};

export default HomeView;
