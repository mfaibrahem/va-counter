import React, { Component } from "react";
import Controls from "../components/Controls";
import { connect } from "react-redux";

import {
	incrementNum,
	decrementNum,
	incRequestCount,
	resetNum,
	incrementPattern,
	decrementPattern,
	resetPattern
} from "../actions/counterActions";

export class Controller extends Component {
	render() {
		return <Controls {...this.props} />;
	}
}

export const mapDispatchToProps = (dispatch, props) => {
	return {
		increment: () => {
			dispatch(incrementNum());
		},
		decrement: () => {
			dispatch(decrementNum());
		},
		resetNum: () => {
			dispatch(resetNum());
		},
		incRequestCount: value => {
			dispatch(incRequestCount(value));
		},
		incrementPattern: () => {
			dispatch(incrementPattern());
		},
		decrementPattern: () => {
			dispatch(decrementPattern());
		},
		resetPattern: () => {
			dispatch(resetPattern());
		}
	};
};

const mapStateToProps = ({
	count: { controlsCollapsed, incrementPatternCount, decrementPatternCount }
}) => ({
	controlsCollapsed,
	incrementPatternCount,
	decrementPatternCount
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
