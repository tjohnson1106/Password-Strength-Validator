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

  validatePasswordStrong = (value) => {
      if ( value.length <= this.thresholdLength ) throw new Error ("Password is too short");
      if ( zxcvbn(value).score < this.minStrength ) throw new Error ("Password is too weak");
  };

    render() {
           
         const { type, validator, onStateChanged, children, ...restProps } = this.props;
         const { password, strength } = this.state;
         
         const passwordLength = password.length;
         const passwordStrong = strength >=  this.minStrength;
         const passwordLong = passwordLength > this.thresholdLength;

         const counterClass = ['badge badge-pill', passwordLong 
         ? passwordStrong ? 'badge-success' : 'badge-warning' : 'badge-danger'].join(' ').trim();
        
         const strengthClass = ['strength-meter mt-2', passwordLength > 0 
         ? 'visible' : 'invisible'].join(' ').trim();




        return (
            
        );
    }
}

export default PasswordField;