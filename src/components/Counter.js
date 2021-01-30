import "./Counter.scss";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Controls from "../containers/Controls";

class Counter extends Component {
	handleValueBkg = value => {
		if (value === 0) {
			return "#fff";
		} else if (value > 0) {
			return `rgb(255, ${150 - value >= 0 ? 150 - value : 0}, ${
				150 - value >= 0 ? 150 - value : 0
			})`;
		} else {
			return `rgb(0, ${
				200 - Math.abs(value) >= 90 ? 200 - Math.abs(value) : 90
			}, 0)`;
		}
	};

	componentDidUpdate() {
		const {
			incrementPatternCount,
			decrementPatternCount,
			// incrementPattern,
			// decrementPattern,
			resetPattern,
			appendPatternModal
		} = this.props;

		if (
			incrementPatternCount > 3 &&
			incrementPatternCount % 2 &&
			decrementPatternCount === incrementPatternCount + 1
		) {
			// append the modal
			appendPatternModal();
			// reset pattern count back to 0
			resetPattern();
		}
	}

	render() {
		const { disabled, reverse, count } = this.props;
		// console.log("render the counter");

		return (
			<div className="counter">
				<div
					className="counter-value"
					style={{
						backgroundColor: this.handleValueBkg(count)
					}}
				>
					{count}
				</div>
				<Controls disabled={disabled} reverse={reverse} />
			</div>
		);
	}
}

Counter.propTypes = {
	count: PropTypes.number,
	disabled: PropTypes.bool,
	reverse: PropTypes.bool,
	requestCount: PropTypes.number,
	// pattern
	incrementPattern: PropTypes.func,
	decrementPattern: PropTypes.func,
	incrementPatternCount: PropTypes.number,
	decrementPatternCount: PropTypes.number,
	resetPattern: PropTypes.func,
	appendPatternModal: PropTypes.func,
	removePatternModal: PropTypes.func,
	patternModalAppended: PropTypes.bool
};

Counter.defaultProps = {
	disabled: false
};

export default Counter;
