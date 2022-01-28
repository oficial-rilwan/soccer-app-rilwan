import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  match: {
    background: '#27AE60',
    borderRadius: '2.57px',
    color: '#fff',
    padding: '1rem',
    cursor: 'pointer',
  },
  reconciled: {
    background: '#2D9CDB',
    borderRadius: '2.57px',
    color: '#fff',
    padding: '1rem',
    cursor: 'pointer',
  },
}));

export default function Button({ transactionId }) {
  const classes = useStyles();
  const [isReconciled, setReconciled] = useState(false);

  const onMatch = (transactionId) => {
    axios
      .put(
        'https://jureb-pr-57.herokuapp.com/api/v1/accounting/transaction/reconciliation',
        {
          transactionIds: [transactionId],
        },
      )
      .then((response) => setReconciled(true))
      .then((error) => console.log(error));
  };
  return (
    <div onClick={() => onMatch(transactionId)} style={{ padding: '1rem' }}>
      {isReconciled ? (
        <div className={classes.reconciled}>Reconciled</div>
      ) : (
        <div className={classes.match}>Match</div>
      )}
    </div>
  );
}
