"use client";
import {
	callCastVote,
	callCreateTopic,
	callGetVoteCount,
	fetchTopics,
} from "@/api/client/vote";
import { useAppDispatch, useAppSelector } from "@/store";
import { Topic, setRefetch, setTopics } from "@/store/voteSlice";
import differenceWith from "lodash/differenceWith";
import isEqual from "lodash/isEqual";
import { useEffect, useState } from "react";

type FetchConfig = {
	refetchInterval?: number | false;
};
export default function useFetchTopics({ refetchInterval = false }: FetchConfig) {
	const voteState = useAppSelector(state => state.vote);

	const dispatch = useAppDispatch();
	const [topicData, setTopicData] = useState<Topic[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const saveDataToState = (topics: Topic[]) => {
		dispatch(setTopics(checkDifference(topics)));
	};

	const checkDifference = (topics: Topic[]) => {
		const newTopics: Topic[] = [];
		const stateTopics = voteState.topics;
		stateTopics.forEach(st => {
			const t_index = topics.findIndex(t => isEqual(st.pubKey, t.pubKey));
			if (t_index !== -1) {
				const t_exist = topics[t_index];
				const is_eq = isEqual(st, t_exist);
				if (is_eq) {
					newTopics.push(t_exist);
				} else {
					newTopics.unshift(t_exist);
				}
			} else {
				// the item is not in new topics fetched
				// do nothing [silence is golden :-)]
			}
		});

		topics.forEach(t => {
			const st_index = stateTopics.findIndex(st => isEqual(st.pubKey, t.pubKey));
			if (st_index === -1) {
				newTopics.unshift(t);
			}
		});

		return newTopics;
	};

	const fetch = async () => {
		try {
			setIsLoading(true);
			const result = await fetchTopics();
			const { topics } = result.data as { topics: Topic[] };
			setTopicData(topics);
			saveDataToState(topics);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setIsLoading(false);
			dispatch(setRefetch(false));
		}
	};

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (refetchInterval) {
			timer = setInterval(fetch, refetchInterval);
		}

		if (voteState.refetch) fetch();

		return () => {
			clearInterval(timer);
		};
	}, [voteState.refetch, fetch, refetchInterval]);

	return {
		data: topicData,
		error,
		isLoading,
		refetch: fetch,
	};
}

export function useVoteMethods() {
	const createTopic = async (topicData: { title: string; options: string[] }) => {
		return await callCreateTopic(topicData);
	};

	const castVote = async (data: { title: string; option: string; pubKey: string }) => {
		return await callCastVote(data);
	};

	const getVotes = async (pubKey: string) => {
		return await callGetVoteCount(pubKey);
	};

	return {
		createTopic,
		castVote,
		getVotes,
	};
}
