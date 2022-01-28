import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { formatCurrency } from '../utils';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    fontSize: '500',
  },
}));

export default function SimplePopover({
  amount,
  date,
  vendor,
  description,
  bank,
  transactionType,
  referenceNo,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <p
        onClick={handleClick}
        style={{
          color: '#1F53D7',
          cursor: 'pointer',
          textDecoration: 'underline',
        }}>
        View more
      </p>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        <div
          style={{
            width: '29rem',
            // height: '36rem',
            borderRadius: 10,
          }}>
          <Typography className={classes.typography}>
            Statement Details{' '}
          </Typography>
          <Divider variant="middle" />
          <div style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Transaction Date</p>
              <p style={{ fontWeight: '500' }}>{date}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Customer</p>
              <p style={{ fontWeight: '500' }}>{vendor || ''}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Reference No.</p>
              <p style={{ fontWeight: '500' }}>{referenceNo || ''}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Description</p>
              <p style={{ fontWeight: '500' }}>{description}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Amount</p>
              <p style={{ fontWeight: '500' }}>
                {formatCurrency(Number(amount?.Debit) || amount?.Credit)}
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Transaction Type</p>
              <p style={{ fontWeight: '500' }}>{transactionType || ''}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>Bank Account</p>
              <p style={{ fontWeight: '500' }}>{bank || ''}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button onClick={() => setAnchorEl(null)} variant="contained">
                Close
              </Button>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
}
