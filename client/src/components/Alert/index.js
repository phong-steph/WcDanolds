import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const Alert = (props) => {
  if (!props.show) return null;
  return (
    <>
      {/* 
        Modal fadeIn animation causes error
        See https://github.com/react-bootstrap/react-bootstrap/issues/5075
      */}
      <Modal show={props.show} onHide={props.closeAlert}>
        <Modal.Header closeButton>
          <Modal.Title>McDanold's</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Merci d'avoir passer commande chez nous! À bientôt!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.closeAlert}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

Alert.propTypes = {
  show: PropTypes.bool.isRequired,
  closeAlert: PropTypes.func.isRequired,
};

export default Alert;
