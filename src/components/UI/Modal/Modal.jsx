import React from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@material-ui/core';
import styled from 'styled-components';

const StyledDialog = styled(Dialog)`
  .MuiDialogTitle-root {
    border-bottom: 1px solid #dee2e6;
    margin-bottom: 1rem;
  }
  .MuiDialogActions-root {
    border-top: 1px solid #dee2e6;
    margin-top: 1rem;
  }
`;

const Modal = (props) => {
  const { children, fullWidth, handleClose, isOpen } = props;
  return (
    <StyledDialog open={isOpen} fullWidth={fullWidth} onClose={handleClose}>
      {children}
    </StyledDialog>
  );
};

Modal.defaultProps = {
  isOpen: false,
  fullWidth: false,
  handleClose: () => {},
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default Modal;
