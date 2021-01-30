import {
	INCREMENT_NUM,
	DECREMENT_NUM,
	RESET,
	SET_COUTNER_VALUE,
	INC_REQUEST_COUNT,
	TOGGLE_INC_BTN_PAUSE,
	TOGGLE_DEC_BTN_PAUSE,
	TOGGLE_CONTROLS_PANEL,
	INCREMENT_PATTERN,
	DECREMENT_PATTERN,
	RESET_PATTERN,
	APPEND_PATTERN_MODAL,
	REMOVE_PATTERN_MODAL
} from "../constants/ActionTypes";

import { helperRequestCount } from "./helpers";

const INITIAL_STATE = {
	countValue: 0,
	reversedCountValue: 0,
	requestCount: 0,
	incrementBtnPaused: true,
	decrementBtnPaused: true,
	controlsCollapsed: false,
	// pattern
	incrementPatternCount: 0,
	decrementPatternCount: 0,
	patternModalAppended: false
};
// const numberOfUpdates = 10;

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case INCREMENT_NUM:
			return {
				...state,
				countValue: state.countValue + 1,
				// reversedCountValue: state.reversedCountValue - 1,
				reversedCountValue:
					state.requestCount === 9
						? (state.countValue + 1) * -1
						: state.reversedCountValue
			};
		//
		case DECREMENT_NUM:
			return {
				...state,
				countValue: state.countValue - 1,
				// reversedCountValue: state.reversedCountValue + 1,
				reversedCountValue:
					state.requestCount === 9
						? (state.countValue - 1) * -1
						: state.reversedCountValue
			};
		//
		case INC_REQUEST_COUNT:
			return {
				...state,
				requestCount: helperRequestCount(action.payload, state.requestCount)
					.newRequestCount
				// requestCount:
				// action.payload >= 9
				// 	? 9
				// 	: state.requestCount >= 9
				// 	? 0
				// 	: state.requestCount + action.payload
			};
		case RESET:
			return { ...INITIAL_STATE };
		//
		case SET_COUTNER_VALUE:
			console.log(
				helperRequestCount(action.payload, state.requestCount).totalRequests
			);
			return {
				...state,
				countValue: state.countValue + action.payload,
				reversedCountValue:
					state.requestCount === 9 ||
					helperRequestCount(action.payload, state.requestCount)
						.totalRequests >= 9
						? state.reversedCountValue - action.payload
						: state.reversedCountValue
			};
		//
		case TOGGLE_INC_BTN_PAUSE:
			return {
				...state,
				incrementBtnPaused: !state.incrementBtnPaused
			};
		case TOGGLE_DEC_BTN_PAUSE:
			return {
				...state,
				decrementBtnPaused: !state.decrementBtnPaused
			};
		//
		case TOGGLE_CONTROLS_PANEL:
			return {
				...state,
				controlsCollapsed: !state.controlsCollapsed
			};
		// pattern reducers
		case INCREMENT_PATTERN:
			return {
				...state,
				incrementPatternCount: state.incrementPatternCount + 1
			};
		case DECREMENT_PATTERN:
			return {
				...state,
				decrementPatternCount: state.decrementPatternCount + 1
			};
		case RESET_PATTERN:
			return {
				...state,
				incrementPatternCount: 0,
				decrementPatternCount: 0
			};
		case APPEND_PATTERN_MODAL:
			return {
				...state,
				patternModalAppended: true
			};
		case REMOVE_PATTERN_MODAL:
			return {
				...state,
				patternModalAppended: false
			};
		default:
			return state;
	}
}
