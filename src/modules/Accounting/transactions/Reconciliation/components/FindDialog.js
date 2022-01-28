import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { green, purple } from '@material-ui/core/colors';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { InputAdornment, TextField, Divider } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { SearchOutlined, Add, WarningOutlined } from '@material-ui/icons';
import { TypographyBold } from 'modules/components/Typography/Typography';
import AddTransactionTable from './AddTransactionTable/data';
import { formatCurrency } from '../utils';
import { ReactComponent as Warning } from 'lib/assets/icons/warning.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '5px',
    backgroundColor: '#EEF5FC',
    padding: '1rem',
    borderRadius: '5px',
    border: '1px solid #DFDFDF',
    flexGrow: 1,
  },
  table: {
    minWidth: 650,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10rem',
    textAlign: 'center',
  },
  cellWrapper: {
    backgroundColor: '#EEF5FC',
    fontFamily: 'Rubik, sans-serif',
    color: '#000',
  },
  tableWrapper: {
    width: '100%',
    fontFamily: 'Rubik, sans-serif',
    marginTop: '2rem',
  },
  tableRow: {
    '&:last-child th, &:last-child td': {
      borderBottom: 0,
    },
  },
  dialogContent: { padding: '0px !important' },
}));

const MatchButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

const CssTextField = withStyles({
  root: {
    fontStyle: 'italic',
    fontFamily: 'Rubik,sans-serif',
    backgroundColor: 'transparent',
    '& input + fieldset': {
      borderColor: '#ced4da',
    },
  },
})(TextField);

const columns = [
  { id: 'date', label: 'Date', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 120 },
  { id: 'reference', label: 'Reference', minWidth: 120 },
  { id: 'debit', label: 'Debit', minWidth: 120 },
  { id: 'credit', label: 'Credit', minWidth: 120 },
];

export default function EditDialog({
  accountJureb,
  handleRowSelect,
  handleMatch,
  newSubTotal,
  total,
}) {
  const [open, setOpen] = useState(false);
  const [tableDate, setTableData] = useState(accountJureb);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setTableData(accountJureb);
  }, [accountJureb]);

  const handleClose = () => {
    setOpen(false);
  };

  const searchTable = (e) => {
    const value = e.target.value;
    console.log();
    if (!value || (typeof value == 'string' && value.trim() == ''))
      return setTableData(accountJureb);

    const filteredTable = accountJureb.filter((e) => {
      return (
        e.Credit == value ||
        e.Debit == value ||
        e.Name.toLowerCase().indexOf(String(value).toLowerCase()) >= 0
      );
    });
    setTableData(filteredTable);
  };

  return (
    <div>
      <span onClick={handleClickOpen}>Find</span>
      <Dialog
        style={{
          maxHeight: '55%',
          width: '90%',
          transform: 'translate(7%, 7%)',
        }}
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Find Transaction </DialogTitle>
        <DialogContent className={classes.dialogContent} dividers>
          <div style={{ padding: '0px !important' }}>
            <div style={{ marginLeft: '1rem' }}>
              <CssTextField
                placeholder="Search by name or amount"
                variant="outlined"
                onChange={() => {}}
                size="small"
                style={{
                  width: '19rem',
                  margin: '1rem 0',
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlined />
                    </InputAdornment>
                  ),
                }}
                onChange={searchTable}
              />
            </div>
          </div>

          <div className={classes.tableWrapper}>
            <TableContainer className={classes.container}>
              <Table
                className={classes.table}
                stickyHeader
                aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          fontSize: '15px',
                          fontWeight: 400,
                        }}
                        className={classes.cellWrapper}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <AddTransactionTable
                    accountJureb={tableDate}
                    handleRowSelect={handleRowSelect}
                    newSubTotal={newSubTotal}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </DialogContent>
        <div style={{ background: '#EEF5FC' }}>
          <TypographyBold
            style={{
              padding: '1.4rem',
            }}
            variant="h5">
            Amount Matched
          </TypographyBold>
        </div>
        <DialogContent
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <TypographyBold>
            The sum of your selected transactions must match the amount spent
          </TypographyBold>
        </DialogContent>

        <DialogContent
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          dividers>
          <TypographyBold>Subtotal:</TypographyBold>
          <TypographyBold>{formatCurrency(newSubTotal)}</TypographyBold>
        </DialogContent>
        <DialogActions
          style={{
            paddingTop: '2rem',
            justifyContent: 'space-between',
            padding: '1rem',
          }}>
          {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TypographyBold>
              Amount to be matched:{' '}
              {Number(total?.Credit) == 0
                ? formatCurrency(Number(total?.Debit))
                : formatCurrency(Number(total?.Credit))}{' '}
            </TypographyBold>
            {(Number(total?.Credit) == 0
              ? Number(total?.Debit)
              : Number(total?.Credit)) -
              newSubTotal !=
              0 && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <WarningOutlined style={{ color: 'red' }} />
                <p style={{ color: 'red' }}>
                  Total is out by:{' '}
                  {formatCurrency(
                    (Number(total?.Credit) == 0
                      ? Number(total?.Debit)
                      : Number(total?.Credit)) - newSubTotal,
                  )}
                </p>
              </div>
            )}
          </div>
          <div>
            <MatchButton variant="contained" onClick={handleMatch}>
              Match
            </MatchButton>
            <Button
              style={{ marginLeft: '.7rem' }}
              onClick={handleClose}
              variant="outlined">
              Cancel
            </Button>
          </div>
          {/* </div> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
