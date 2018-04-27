import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import zxcvbn from "zxcvbn";

import FormField from "./FormField";

class PasswordField extends Component {
  constructor(props) {
    super(props);

    const { minStrength = 3, thresholdLength = 7 } = props;
    this.minStrength = typeof minStrength === "number" ? Math.max(thresholdLength, 7) : 7;

    this.state = { password: "", strength: 0 };
  }

  stateChanged = state => {
    this.setState(
      {
        password: state.value,
        strength: zxcvbn(state.value).score
      },
      () => this.props.onStateChanged(state)
    );
  };

  validatePasswordStrong = value => {
    if (value.length <= this.thresholdLength) throw new Error("Password is too short");
    if (zxcvbn(value).score < this.minStrength) throw new Error("Password is too weak");
  };

  render() {
    const { type, validator, onStateChanged, children, ...restProps } = this.props;
    const { password, strength } = this.state;

    const passwordLength = password.length;
    const passwordStrong = strength >= this.minStrength;
    const passwordLong = passwordLength > this.thresholdLength;

    const counterClass = [
      "badge badge-pill",
      passwordLong ? (passwordStrong ? "badge-success" : "badge-warning") : "badge-danger"
    ]
      .join(" ")
      .trim();

    const strengthClass = [
      "strength-meter mt-2",
      passwordLength > 0 ? "visible" : "invisible"
    ]
      .join(" ")
      .trim();

    return (
      <Fragment>
        <div className="positon-relative">
          <FormField
            type="password"
            validator={this.validatePasswordStrong}
            onStateChanged={this.stateChanged}
            {...restProps}
          >
            <span className="d-block form-hint">
              To conform with our Strong Password policy, you are required to use a
              sufficiently strong password. Password must be more than 7 characters.
            </span>
            {children}
            <div className="position-absolute password-count mx-3">
              <div className="strength-meter-fill" data-strength={strength} />
            </div>
          </FormField>
          <div className="position-absolute password-count mx-3">
            <span className={counterClass}>
              {passwordLength
                ? passwordLong
                  ? `${this.thresholdLength}+`
                  : passwordLength
                : ""}
            </span>{" "}
            <span className={counterClass}>
              {passwordLength
                ? passwordLong
                  ? `${this.thresholdLength}+`
                  : passwordLength
                : ""}
            </span>{" "}
            <span className={counterClass}>
              {passwordLength
                ? passwordLong
                  ? `${this.thresholdLength}+`
                  : passwordLength
                : ""}
            </span>{" "}
            <span className={counterClass}>
              {passwordLength
                ? passwordLong
                  ? `${this.thresholdLength}+`
                  : passwordLength
                : ""}
            </span>{" "}
            <span className={counterClass}>
              {passwordLength
                ? passwordLong
                  ? `${this.thresholdLength}+`
                  : passwordLength
                : ""}
            </span>{" "}
            <span className={counterClass}>
              {passwordLength
                ? passwordLong
                  ? `${this.thresholdLength}+`
                  : passwordLength
                : ""}
            </span>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default PasswordField;
