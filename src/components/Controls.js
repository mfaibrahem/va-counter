import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

 class Controls extends Component {

  render() {
    const { incrementLabel, decrementLabel, increment, decrement} = this.props;

    return (
      <div className="controls">
        <div onClick={() => {increment();}}>
          <span>{incrementLabel}</span>
        </div>
        <div onClick={() => {decrement();}}>
          <span>{decrementLabel}</span>
        </div>
      </div>
    );
  }
}

Controls.propTypes = {
  increment: PropTypes.func,
  decrement: PropTypes.func,
  resetLabel: PropTypes.string,
  incrementLabel: PropTypes.string,
  decrementLabel: PropTypes.string,
};

Controls.defaultProps = {
  incrementLabel: "+",
  decrementLabel: "-"
};

export default Controls;
