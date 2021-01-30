import "./ControlBtn.scss";
import React from "react";
import PropTypes from "prop-types";

const ControlBtn = ({ btnClass, handleBtnClick, children, disabled }) => {
	return (
		<div
			className={`${disabled ? `${btnClass} disabled` : btnClass}`}
			onClick={handleBtnClick}
		>
			{children}
		</div>
	);
};

ControlBtn.propTypes = {
	btnClass: PropTypes.string,
	handleBtnClick: PropTypes.func,
	disabled: PropTypes.bool,
	children: PropTypes.node
};

export default ControlBtn;
