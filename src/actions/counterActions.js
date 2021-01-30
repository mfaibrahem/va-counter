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

export function incrementNum(payload) {
	return {
		type: INCREMENT_NUM,
		payload: payload
	};
}

export function decrementNum(payload) {
	return {
		type: DECREMENT_NUM,
		payload: payload
	};
}

export const resetNum = () => ({
	type: RESET
});

export const setCounterValue = value => ({
	type: SET_COUTNER_VALUE,
	payload: value
});

export const incRequestCount = value => ({
	type: INC_REQUEST_COUNT,
	payload: value
});

export const toggleIncBtnPause = () => ({
	type: TOGGLE_INC_BTN_PAUSE
});
export const toggleDecBtnPause = () => ({
	type: TOGGLE_DEC_BTN_PAUSE
});

export const toggleControlsPanel = () => ({
	type: TOGGLE_CONTROLS_PANEL
});
//
// pattern
export const incrementPattern = () => ({
	type: INCREMENT_PATTERN
});
export const decrementPattern = () => ({
	type: DECREMENT_PATTERN
});
export const resetPattern = () => ({
	type: RESET_PATTERN
});
export const appendPatternModal = () => ({
	type: APPEND_PATTERN_MODAL
});
export const removePatternModal = () => ({
	type: REMOVE_PATTERN_MODAL
});
