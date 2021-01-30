import "./App.scss";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Counter from "./containers/Counter";
import { connect } from "react-redux";
import {
	incRequestCount,
	setCounterValue,
	toggleIncBtnPause,
	toggleDecBtnPause,
	incrementNum,
	decrementNum,
	toggleControlsPanel,
	removePatternModal
} from "./actions/counterActions";
import CustomModal from "./components/custom-modal/CustomModal.jsx";

class App extends Component {
	state = {
		mouseUpVal: 0,
		mouseDownVal: 0,
		sliderValue: 1,
		//
		incIntervalId: null,
		decIntervalId: null
	};

	// ranged slider
	handleSliderChange = e => {
		this.setState({
			sliderValue: e.target.value
		});
	};
	handleMouseDown = () => {
		if (this.state.sliderValue > 1)
			this.setState({ mouseDownVal: this.state.sliderValue });
	};

	handleMouseUp = () => {
		this.setState({ mouseUpVal: this.state.sliderValue }, () => {
			this.props.setCounterValue(
				this.state.mouseUpVal - this.state.mouseDownVal
			);
			this.props.incRequestCount(
				Math.abs(this.state.mouseUpVal - this.state.mouseDownVal)
			);
		});
	};
	// end ranged slider

	// toggle increment play button
	handleToggleIncBtn = () => {
		const {
			incrementBtnPaused,
			decrementBtnPaused,
			toggleIncBtnPause,
			incrementNum,
			incRequestCount
		} = this.props;
		if (!decrementBtnPaused) {
			return false;
		}
		toggleIncBtnPause();
		this.setState({
			incIntervalId: incrementBtnPaused
				? setInterval(() => {
						incrementNum();
						incRequestCount(1);
				  }, 2000)
				: null
		});
		if (!incrementBtnPaused && this.state.incIntervalId) {
			clearInterval(this.state.incIntervalId);
		}
	};
	// toggle decrement play button
	handleToggleDecBtn = () => {
		const {
			incrementBtnPaused,
			decrementBtnPaused,
			toggleDecBtnPause,
			decrementNum,
			incRequestCount
		} = this.props;
		if (!incrementBtnPaused) {
			return false;
		}
		toggleDecBtnPause();
		this.setState({
			decIntervalId: decrementBtnPaused
				? setInterval(() => {
						decrementNum();
						incRequestCount(1);
				  }, 2000)
				: null
		});
		if (!decrementBtnPaused && this.state.decIntervalId) {
			clearInterval(this.state.decIntervalId);
		}
	};

	handlekeyup = e => {
		if (e.ctrlKey && e.key === "ArrowRight") {
			// call increment
			this.props.incrementNum();
			this.props.incRequestCount(1);
		} else if (e.ctrlKey && e.key === "ArrowLeft") {
			// call decrement
			this.props.decrementNum();
			this.props.incRequestCount(1);
		}
	};
	componentDidMount() {
		window.addEventListener("keyup", e => {
			this.handlekeyup(e);
		});
	}

	componentWillUnmount() {
		// cleanup
		clearInterval(this.state.incIntervalId);
		clearInterval(this.state.decIntervalId);
		window.removeEventListener("keyup", this.handlekeyup);
	}

	render() {
		const { controlsCollapsed } = this.props;
		return (
			<mian className="app-main-wrap">
				<div className="mfa-container">
					<div className="counters-slider">
						<div className="counters-wrap">
							<Counter disabled={false} reverse={false} />
							<Counter disabled={true} reverse={true} />
						</div>

						<div
							className={`slider-play-btns-wrap ${
								controlsCollapsed ? "collapsed" : ""
							}`}
						>
							<div className="range-slider-wrap">
								<input
									value={this.state.sliderValue}
									onChange={this.handleSliderChange}
									onMouseDown={this.handleMouseDown}
									onMouseUp={this.handleMouseUp}
									onTouchStart={this.handleMouseDown}
									onTouchEnd={this.handleMouseUp}
									type="range"
									min="1"
									max="100"
								/>
								<span
									className="diff-badge"
									style={{
										left: `${this.state.sliderValue}%`,
										opacity:
											this.state.mouseUpVal - this.state.mouseDownVal !== 0
												? 1
												: 0
									}}
								>
									{this.state.mouseUpVal - this.state.mouseDownVal !== 0 &&
										(this.state.mouseUpVal - this.state.mouseDownVal > 0
											? `+${this.state.mouseUpVal - this.state.mouseDownVal}`
											: this.state.mouseUpVal - this.state.mouseDownVal)}
								</span>
							</div>
							<div className="inc-dec-play-btns">
								<div
									className={`${
										this.props.incrementBtnPaused
											? !this.props.decrementBtnPaused
												? "play-btn disabled"
												: "play-btn"
											: "play-btn playing"
									}`}
									onClick={this.handleToggleIncBtn}
								>
									{this.props.incrementBtnPaused ? (
										<i className="icon-play"></i>
									) : (
										<i className="icon-pause"></i>
									)}
									Increment
								</div>
								<div
									className={`${
										this.props.decrementBtnPaused
											? !this.props.incrementBtnPaused
												? "play-btn disabled"
												: "play-btn"
											: "play-btn playing"
									}`}
									onClick={this.handleToggleDecBtn}
								>
									{this.props.decrementBtnPaused ? (
										<i className="icon-play"></i>
									) : (
										<i className="icon-pause"></i>
									)}
									Decrement
								</div>
							</div>
						</div>

						<div
							className="collapse-btn"
							onClick={this.props.toggleControlsPanel}
						>
							{this.props.controlsCollapsed ? (
								<span>
									<i className="icon-down-circled"></i>
									Show Controls
								</span>
							) : (
								<span>
									<i className="icon-up-circled"></i>
									Hide controls
								</span>
							)}
						</div>
					</div>
				</div>

				{this.props.patternModalAppended && (
					<CustomModal removeModal={this.props.removePatternModal}>
						You achieved the pattern!
					</CustomModal>
				)}
			</mian>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setCounterValue: value => {
			dispatch(setCounterValue(value));
		},
		incRequestCount: value => {
			dispatch(incRequestCount(value));
		},
		toggleIncBtnPause: () => {
			dispatch(toggleIncBtnPause());
		},
		toggleDecBtnPause: () => {
			dispatch(toggleDecBtnPause());
		},
		incrementNum: () => {
			dispatch(incrementNum());
		},
		decrementNum: () => {
			dispatch(decrementNum());
		},
		toggleControlsPanel: () => {
			dispatch(toggleControlsPanel());
		},
		removePatternModal: () => {
			dispatch(removePatternModal());
		}
	};
};

const mapStateToProps = ({
	count: {
		sliderValue,
		incrementBtnPaused,
		decrementBtnPaused,
		controlsCollapsed,
		patternModalAppended
	}
}) => ({
	sliderValue,
	incrementBtnPaused,
	decrementBtnPaused,
	controlsCollapsed,
	patternModalAppended
});

App.propTypes = {
	incrementBtnPaused: PropTypes.bool,
	decrementBtnPaused: PropTypes.bool,
	setCounterValue: PropTypes.func,
	incRequestCount: PropTypes.func,
	toggleIncBtnPause: PropTypes.fun,
	toggleDecBtnPause: PropTypes.fun,
	incrementNum: PropTypes.fun,
	decrementNum: PropTypes.fun,
	toggleControlsPanel: PropTypes.func,
	controlsCollapsed: PropTypes.bool,
	patternModalAppended: PropTypes.bool,
	removePatternModal: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
