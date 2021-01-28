import React, { Component } from "react";
import PropTypes from "prop-types";
import Controls from "../containers/Controls";

 class Counter extends Component {
  render() {

    const { count } = this.props;

    return (
      <div className="counter">
        <div>{count}</div>
        <Controls />
      </div>
    );
  }
}

Counter.propTypes = {
  count: PropTypes.number
};

export default Counter;
