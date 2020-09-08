import React from "react";
import { Spinner as RBSpinner } from "react-bootstrap";

const Spinner = (props) => {
  return (
    props.loading && (
      <div className="spinner">
        <RBSpinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </RBSpinner>
      </div>
    )
  );
};

export default Spinner;
