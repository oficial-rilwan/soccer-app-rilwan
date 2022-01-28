import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: 'rgba(213, 221, 228, 0.2)',
    boxShadow: theme.shadows[5],
    maxWidth: '750px',
    padding: '20px 10px',
  },
  modal: { border: 'none' },
}));

export default function CustomModal({
  children,
  className,
  open = false,
  handleClose,
  background,
  ...others
}) {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      {...others}>
      <div
        style={{
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%)`,
          background,
        }}
        className={classNames({
          [classes.paper]: true,
          [className]: className != undefined,
        })}>
        {children}
      </div>
    </Modal>
  );
}
