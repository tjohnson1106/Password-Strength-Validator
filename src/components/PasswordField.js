import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import zxcvbn from 'zxcvbn';

import FormField from "./FormField";

class PasswordField extends Component {
    constructor(props) {
        super(props);

             const { minStrength =3, thresholdLength=7 } = props;
              this.minStrength = typeof minStrength === "number"
              ? Math.max(thresholdLength, 7) : 7;



        this.state = { password: "", strength: 0 };
    }

  stateChanged = (state) => {
      this.setState({
          password: state.value,
          strength: zxcvbn(state.value).score
      }, () => this.props.onStateChanged(state));
  };

    render() {
        return (
            
        );
    }
}

export default PasswordField;