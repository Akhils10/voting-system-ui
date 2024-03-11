import axios from "axios";

export interface Topic {
	id: number;
	name: string;
}

export const axiosInstance = axios.create({
	baseURL: process.env.BASE_API_URL || "http://localhost:3003/api/v1",
	headers: { "content-Type": "application/json" },
});

export async function fetchTopics(): Promise<any> {
	const response = await axiosInstance.get<Topic[]>("/vote/fetch-all-topics");
	return response.data;
}

export async function callCreateTopic(topicData: {
	title: string;
	options: string[];
}): Promise<any> {
	return (await axiosInstance.post("/vote/create", topicData)).data;
}

export async function callCastVote(data: {
	title: string;
	option: string;
	pubKey: string;
}): Promise<any> {
	return (await axiosInstance.post("/vote/cast", data)).data;
}

export async function callGetVoteCount(topicPubKey: string): Promise<any> {
	return (await axiosInstance.get(`/vote/fetch-vote-count/${topicPubKey}`)).data;
}
