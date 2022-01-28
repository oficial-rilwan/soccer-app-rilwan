import React, { useState } from 'react';

import classNames from 'classnames';
import {
  Typography,
  IconButton,
  Badge,
  makeStyles,
  TextareaAutosize,
} from '@material-ui/core';
import FindDialog from './FindDialog';
import AddTransactionDialog from './AddTransactionDialog';
import { Clear, Done } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  card: {
    background: '#F2F2F2',
    border: '0.4px solid rgba(40, 40, 40, 0.72)',
    borderRadius: '3px',
    display: 'flex',
    flex: 1,
    padding: '1rem',
    minHeight: '160px',
    maxWidth: '40%',
    position: 'relative',
  },
  borderRight: {
    borderRight: '8px solid #0D80D8',
  },
  borderLeft: {
    borderLeft: '8px solid #0D80D8',
  },
  textArea: {
    display: 'flex',
    alignItems: 'center',
    width: '30%',
    position: 'relative',
    width: '540px',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
}));

const style = {
  background: '#FFFFFF',
  border: '0.8px solid #DFDFDF',
  boxSizing: 'border-box',
  borderRadius: '2.69px',
  padding: '.4rem.7rem',
  maxHeight: '40px',
  cursor: 'pointer',
};

export default function TransactionCreation({
  isRight,
  accountJureb,
  handleRowSelect,
  handleMatch,
  newSubTotal,
  amount,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const handleDialogClose = () => setOpen(false);

  return (
    <div
      className={classNames({
        [classes.card]: true,
        [classes.borderRight]: isRight,
        [classes.borderLeft]: !isRight,
      })}>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: '-40px',
          right: '0px',
        }}>
        <p>Debit</p>
        <p style={{ marginLeft: '95px' }}>Credit</p>
      </div>
      <AddTransactionDialog
        amount={amount}
        open={open}
        handleDialogClose={handleDialogClose}
        id={''}
      />
      <div className={classes.textArea}>
        {showComment ? (
          <>
            <input style={{ height: '100%', width: '100%' }} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                position: 'absolute',
                right: '5%',
                bottom: '15%',
              }}>
              <Clear
                onClick={() => setShowComment(false)}
                style={{ cursor: 'pointer', color: 'red' }}
              />
              <Done
                onClick={() => setShowComment(false)}
                style={{ cursor: 'pointer', color: 'green' }}
              />
            </div>
          </>
        ) : (
          <>
            <div style={style}>
              <FindDialog
                handleRowSelect={handleRowSelect}
                accountJureb={accountJureb}
                handleMatch={handleMatch}
                newSubTotal={newSubTotal}
                total={amount}
              />
            </div>
            <div onClick={() => setOpen(true)} style={style}>
              Create
            </div>
            <div onClick={() => setShowComment(true)} style={style}>
              Comment
            </div>
          </>
        )}
      </div>
    </div>
  );
}
