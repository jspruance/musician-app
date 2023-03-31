import React from "react";

function FormErrors(props) {
  if (
    props.formerrors &&
    (props.formerrors.blankfield || props.formerrors.passwordmatch)
  ) {
    return (
      <div className="error container mt-2 invalid">
        <div className="row justify-content-center">
          {props.formerrors.passwordmatch
            ? "Password value does not match confirm password value"
            : ""}
        </div>
        <div className="row justify-content-center">
          {props.formerrors.blankfield ? "All fields are required" : ""}
        </div>
      </div>
    );
  } else if (props.searchvalidationerror) {
    return (
      <div className="error container mt-2 invalid">
        <div className="row justify-content-center">Enter a valid location</div>
      </div>
    );
  } else if (props.apierrors) {
    return (
      <div className="error container mt-2 invalid">
        <div className="row justify-content-center">{props.apierrors}</div>
      </div>
    );
  } else if (props.formerrors && props.formerrors.cognito) {
    return (
      <div className="error container mt-2 invalid">
        <div className="row justify-content-center">
          {props.formerrors.cognito.message}
        </div>
      </div>
    );
  } else {
    return <div />;
  }
}

export default FormErrors;