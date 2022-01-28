import React, { useState } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';
import EditDialog from './EditDialog';
import ViewDetailModal from './ViewDetailModal';
import { formatCurrency } from '../utils';

const useStyles = makeStyles((theme) => ({
  card: {
    background: '#F2F2F2',
    border: '0.4px solid rgba(40, 40, 40, 0.72)',
    borderRadius: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    padding: '.5rem',
    maxWidth: '40%',
    position: 'relative',
    marginBottom: '1.5rem',
    // minHeight: '150px',
  },
  borderRight: {
    borderRight: '8px solid #27AE60',
  },
  borderLeft: {
    borderLeft: '8px solid #27AE60',
  },
  isCreatedborderRight: {
    borderRight: '8px solid #0D80D8',
  },
  isCreatedborderLeft: {
    borderLeft: '8px solid #0D80D8',
  },
}));

export default function TransactionDetails({
  isRight,
  editable,
  amount,
  date,
  vendor,
  description,
  isCreated,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDialogClose = () => setOpen(false);

  return (
    <div
      className={classNames({
        [classes.card]: true,
        [classes.borderLeft]: !isRight,
        [classes.borderRight]: isRight,
        [classes.isCreatedborderRight]: isRight && isCreated,
        [classes.isCreatedborderLeft]: !isRight && isCreated,
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
      <EditDialog open={open} handleDialogClose={handleDialogClose} id={''} />
      <div style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>{date}</p>
          <div style={{ display: 'flex' }}>
            <p style={{ marginRight: '50px' }}>
              {Number(amount?.Credit)
                ? ''
                : formatCurrency(Number(amount?.Debit))}
            </p>{' '}
            <p style={{ marginLeft: '50px' }}>
              {Number(amount?.Credit) == 0
                ? ''
                : formatCurrency(Number(amount?.Credit))}
            </p>
          </div>
        </div>
        <p>{vendor || 'Unknown'}</p>
        <p>{description}</p>
        {editable ? (
          <p
            onClick={() => setOpen(true)}
            style={{ color: '#1F53D7', cursor: 'pointer' }}>
            Edit
          </p>
        ) : (
          <ViewDetailModal
            amount={{ Credit: amount?.Credit, Debit: amount?.Debit }}
            date={date}
            vendor={''}
            description={description}
          />
        )}
      </div>
    </div>
  );
}
