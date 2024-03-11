import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum VoteStatus {
	Open = 1,
	Paused = 2,
}

export interface VoteOption {
	label: string;
	votes: number;
}

export type Topic = {
	title: string;
	options: VoteOption[];
	status: VoteStatus;
	pubKey: string;
};

type InitialState = {
	topics: Topic[];
    refetch: boolean
};

const initialState: InitialState = {
	topics: [],
    refetch: true
};

const voteSlice = createSlice({
	name: "vote",
	initialState,
	reducers: {
		setTopics(state, action: PayloadAction<Topic[]>) {
			state.topics = action.payload;
		},
        setRefetch(state, action: PayloadAction<boolean>) {
            state.refetch = action.payload
        },
		reset(state) {
			state.topics = [];
		},
	},
});

export const { setTopics, setRefetch, reset } = voteSlice.actions;
export default voteSlice.reducer;
