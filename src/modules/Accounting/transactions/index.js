import React, { useMemo, useEffect, useState } from 'react';
import useRouter from 'lib/hooks/routes';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Header from 'modules/SiteLayout/Header/Header';
import Button from '@material-ui/core/Button';
import { GridContainer, GridItem } from 'modules/components/Grid';
import { Grid, InputBase } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import TransactionTable from './transactionsTable';
import { COLUMNS } from './transactionsTable/column';
import { useTable, useRowSelect, useFilters, useSortBy } from 'react-table';
import Checkbox from '@material-ui/core/Checkbox';
import { authClient } from 'modules/authentication/requestClient';
import Modal from './component/modal';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '5px',
    backgroundColor: '#EEF5FC',
    padding: '1rem',
    borderRadius: '5px',
    border: '1px solid #DFDFDF',
    flexGrow: 1,
    marginBottom: '4rem',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  stickyHeader: { backgroundColor: 'transparent' },
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: 'transparent',
    borderRadius: '5px',
    marginBottom: '2rem',
  },
  textBig: {
    fontFamily: 'Rubik',
    fontWeight: '500',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#fff',
  },
  textSmall: {
    fontFamily: 'Rubik',
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '21px',
    color: '#fff',
  },
  summaryBox: {
    background: '#336666',
    border: '1px solid #DFDFDF',
    borderRadius: '3px',
    width: '100%',
    padding: '3px 8px',
    height: '6.5rem',
  },
}));

const SelectInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
    height: '3.4rem',
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 400,
    backgroundColor: '#F5F9F7',
    color: '#C3C5C4',
    borderColor: '#E7E8E8',
    fontSize: 16,
    padding: '13px 26px 10px 12px',
    display: 'flex',
    alignItems: 'center',
    height: '1.8rem',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:fos': {
      borderRadius: 4,
    },
  },
}))(InputBase);

export default function Transactions() {
  const [path, , pathname] = useRouter();
  const classes = useStyles();
  const columns = useMemo(() => COLUMNS, []);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProceed = () => {
    setOpen(false);
    history.push('/dashboard/transactions/reconciliation');
  };

  useEffect(() => {
    setLoading(true);
    authClient
      .get(`/api/v1/accounting/transaction?userCreated=true`)
      .then(({ data }) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, [reload]);

  const refetchTransactions = () => {
    setReload(!reload);
  };

  const { selectedFlatRows, ...useTablesProps } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    },
  );

  return (
    <>
      <Header path={path} url={'/dashboard/transactions'} pathname={pathname} />
      <Modal
        handleProceed={handleProceed}
        handleClose={handleClose}
        open={open}
      />
      <div style={{ marginBottom: '1rem' }}>
        <Grid container>
          <Grid xs={12} sm={3} style={{ margin: '0 1.5rem 0 0' }}>
            <div
              style={{ background: '#07A549' }}
              className={classes.summaryBox}>
              <p className={classes.textBig}>All Accounts</p>
              <p className={classes.textBig}>NGN4,500,000.00</p>
            </div>
          </Grid>
          <Grid xs={12} sm={5}>
            <div
              className={classes.summaryBox}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <div>
                <p className={classes.textBig}>Bank Feeds</p>
                <p className={classes.textSmall}>
                  10 transactions pending reconciliation
                </p>
              </div>
              <Button
                style={{
                  background: '#fff',
                  height: '37px',
                  textTransform: 'capitalize',
                }}
                disableElevation
                onClick={handleClickOpen}
                variant="outlined">
                Reconcile
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={classes.tableWrapper}>
        <TableContainer className={classes.container}>
          <TransactionTable
            selectedRows={selectedFlatRows}
            refetchTransactions={refetchTransactions}
            {...useTablesProps}
            loading={loading}
            setReload={setReload}
          />
        </TableContainer>
      </div>
    </>
  );
}
