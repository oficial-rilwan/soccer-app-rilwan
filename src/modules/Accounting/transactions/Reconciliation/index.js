import React, { useState } from 'react';
import useRouter from 'lib/hooks/routes';
import Header from 'modules/SiteLayout/Header/Header';
import {
  TypographyBold,
  TypographyH5,
} from 'modules/components/Typography/Typography';
import { Typography, IconButton, Badge, makeStyles } from '@material-ui/core';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import { Redirect, useHistory } from 'react-router-dom';
import { SelectReconciliationPeriod } from './SelectReconciliation';

const useStyles = makeStyles((theme) => ({
  heading1: {
    fontFamily: 'Rubik, sans-serif',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '28px',
    color: '#000000',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  tableHeader: {
    background: '#EEF5FC',
    border: '0.3px solid #DFDFDF',
    borderRadius: '3px',
    padding: '1.6rem 1rem',
    borderBottom: 'none',
  },
  tableRow1: {
    border: '0.3px solid #DFDFDF',
    borderRadius: '3px',
    padding: '2.6rem 1.3rem',
    borderTop: 'none',
    display: 'flex',
    justifyContent: 'space-between',
  },
  tableRow: {
    border: '0.3px solid #DFDFDF',
    borderRadius: '3px',
    padding: '2.6rem 1.3rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function index() {
  const [path, url, pathname] = useRouter();
  const [show, setShow] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const handleDialogClose = () => setShow(false);

  return (
    <div>
      <Header path={path} url={'/dashboard/transactions'} pathname={pathname} />
      <div
        style={{ marginTop: '5rem', marginRight: '2rem', marginLeft: '2rem' }}>
        <div className={classes.tableHeader}>
          <TypographyBold className={classes.heading1}>
            Added Accounts
          </TypographyBold>
        </div>
        <div className={classes.tableRow1}>
          <div>
            <TypographyBold>First Bank</TypographyBold>
            <p>15 transactions pending reconciliation</p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <div style={{ textAlign: 'center' }}>
              <TypographyBold>NGN5,000,000.00</TypographyBold>
            </div>
            <div>
              <DefaultButton
                onClick={() =>
                  history.push('/dashboard/reconciliation/import')
                }>
                Upload Statement
              </DefaultButton>
              <PrimaryButton
                onClick={() => {}}
                style={{ marginLeft: '1rem' }}
                variant="contained"
                color="primary">
                Connect Bank
              </PrimaryButton>
            </div>
          </div>
        </div>
        <div className={classes.tableRow}>
          <div>
            <TypographyBold> Fidelity Bank</TypographyBold>
            <p>12 transactions pending reconciliation</p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <TypographyBold>NGN5,000,000.00</TypographyBold>
            <div>
              <PrimaryButton
                onClick={() => setShow(true)}
                style={{ marginRight: '1rem' }}
                variant="contained"
                color="primary">
                Proceed
              </PrimaryButton>
            </div>
          </div>
        </div>
        <div className={classes.tableRow}>
          <div>
            <TypographyBold> Access Bank</TypographyBold>
            <p>7 transactions pending reconciliation</p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <TypographyBold>NGN5,000,000.00</TypographyBold>
            <div>
              <PrimaryButton
                onClick={() => setShow(true)}
                style={{ marginRight: '1rem' }}
                variant="contained"
                color="primary">
                Proceed
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
      <SelectReconciliationPeriod
        handleDialogClose={handleDialogClose}
        open={show}
      />
    </div>
  );
}
