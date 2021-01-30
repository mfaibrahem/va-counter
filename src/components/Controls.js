import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ControlBtn from "./control-btn/ControlBtn.jsx";

class Controls extends Component {
	render() {
		const {
			incrementLabel,
			decrementLabel,
			resetLabel,
			increment,
			decrement,
			incRequestCount,
			resetNum,
			disabled,
			controlsCollapsed,
			incrementPatternCount,
			decrementPatternCount,
			incrementPattern,
			decrementPattern,
			resetPattern
		} = this.props;

		return (
			<div
				className={`counter-controls ${controlsCollapsed ? "collapsed" : ""}`}
			>
				<div className="inc-dec-wrap">
					{/* increment button */}
					<ControlBtn
						btnClass="inc-btn"
						handleBtnClick={() => {
							increment();
							incRequestCount(1);
							// pattern
							if (decrementPatternCount) {
								resetPattern();
								incrementPattern();
							} else {
								incrementPattern();
							}
						}}
						disabled={disabled}
					>
						<span>{incrementLabel}</span>
					</ControlBtn>

					{/* Decrement button */}
					<ControlBtn
						btnClass="dec-btn"
						handleBtnClick={() => {
							decrement();
							incRequestCount(1);
							// pattern
							if (incrementPatternCount > 3 && incrementPatternCount % 2) {
								decrementPattern();
							} else {
								resetPattern();
							}
						}}
						disabled={disabled}
					>
						<span>{decrementLabel}</span>
					</ControlBtn>
				</div>

				{/* reset button */}
				<ControlBtn
					btnClass="reset-btn"
					handleBtnClick={resetNum}
					disabled={disabled}
				>
					<span>
						<i className="icon-arrows-ccw"></i>
						{resetLabel}
					</span>
				</ControlBtn>
			</div>
		);
	}
}

Controls.propTypes = {
	increment: PropTypes.func,
	decrement: PropTypes.func,
	incRequestCount: PropTypes.func,
	resetNum: PropTypes.func,
	resetLabel: PropTypes.string,
	incrementLabel: PropTypes.string,
	decrementLabel: PropTypes.string,
	disabled: PropTypes.bool,
	controlsCollapsed: PropTypes.bool,
	incrementPattern: PropTypes.func,
	decrementPattern: PropTypes.func,
	incrementPatternCount: PropTypes.number,
	decrementPatternCount: PropTypes.number,
	resetPattern: PropTypes.func
};

Controls.defaultProps = {
	incrementLabel: "+",
	decrementLabel: "-",
	resetLabel: "Reset"
};

export default Controls;
