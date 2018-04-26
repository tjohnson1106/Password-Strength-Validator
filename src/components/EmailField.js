import React from "react";
import PropTypes from "prop-types";
import { validate } from "isemail";

import FormField from "./FormField";

const EmailField = props => {
  const { type, validator, ...restProps } = props;

  const validateEmail = value => {
    if (!validate(value)) throw new Error("Email is invalid");
  };

  return <FormField type="text" validator={validateEmail} {...restProps} />;
};

export default EmailField;
