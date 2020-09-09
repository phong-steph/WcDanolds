import React from "react";
import { Spinner as RBSpinner } from "react-bootstrap";
import PropTypes from "prop-types";

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

Spinner.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Spinner;
