import "./CustomModal.scss";

import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

class CustomModal extends React.Component {
	render() {
		const { modalClass, removeModal } = this.props;
		return ReactDOM.createPortal(
			<div
				className={`modal-wrapper ${modalClass}`}
				onClick={e => {
					removeModal();
				}}
			>
				<div
					className="modal-body"
					onClick={e => {
						e.stopPropagation();
					}}
				>
					{this.props.children}
				</div>
			</div>,
			document.querySelector("#custom-modal")
		);
	}
}

CustomModal.propTypes = {
	modalClass: PropTypes.string,
	children: PropTypes.node,
	removeModal: PropTypes.func
};

export default CustomModal;
