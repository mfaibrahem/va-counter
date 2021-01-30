import React, { Component } from "react";
import PropTypes from "prop-types";
import Controls from "../components/Counter";
import { connect } from "react-redux";
import {
	decrementPattern,
	incrementPattern,
	resetPattern,
	appendPatternModal,
	RemovePatternModal
} from "../actions/counterActions";

export class Controller extends Component {
	render() {
		return <Controls {...this.props} />;
	}
}

export const mapStateToProps = (store, props) => {
	return {
		count: props.reverse
			? store.count.reversedCountValue
			: store.count.countValue,
		requestCount: store.count.requestCount,
		incrementPatternCount: store.count.incrementPatternCount,
		decrementPatternCount: store.count.decrementPatternCount,
		patternModalAppended: store.count.patternModalAppended
	};
};

const mapDispatchToProps = dispatch => {
	return {
		incrementPattern: () => {
			dispatch(incrementPattern());
		},
		decrementPattern: () => {
			dispatch(decrementPattern());
		},
		resetPattern: () => {
			dispatch(resetPattern());
		},
		appendPatternModal: () => {
			dispatch(appendPatternModal());
		},
		RemovePatternModal: () => {
			dispatch(RemovePatternModal());
		}
	};
};

Controller.propTypes = {
	requestCount: PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
