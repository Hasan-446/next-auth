import React from "react";

const LoginValidation = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6 || values.password.length > 12) {
    errors.password = "Must be greater than 6 digit and less than 12 digit";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid password";
  }

  return errors;
};

export default LoginValidation;
