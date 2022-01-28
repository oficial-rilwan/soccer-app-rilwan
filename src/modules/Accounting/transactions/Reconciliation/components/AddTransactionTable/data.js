import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { formatCurrency } from '../../utils';

const columns = [
  { id: 'Date', label: 'Date', minWidth: 100 },
  { id: 'Name', label: 'Name', minWidth: 120 },
  { id: 'Description', label: 'Reference', minWidth: 120 },
  { id: 'Debit', label: 'Debit', minWidth: 120 },
  { id: 'Credit', label: 'Credit', minWidth: 120 },
];

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
}));

const AddTransactionTable = ({
  handleMatch,
  accountJureb,
  handleRowSelect,
}) => {
  console.log({ accountJureb });
  const classes = useStyles();

  return (
    <>
      {accountJureb.map((e) => (
        <TableRow hover key={e.transactionId} className={classes.tableRow}>
          {columns.map((column) => {
            const value = e[column.id];
            return (
              <TableCell
                key={column.id}
                align={column.align}
                style={{
                  fontFamily: 'Rubik, sans-serif',
                  backgroundColor: '#FCFFFF',
                  fontWeight:
                    column.id == 'name'
                      ? '500'
                      : column.id == 'status'
                      ? 500
                      : 400,
                  fontSize: '15px',
                  cursor: 'pointer',
                  textTransform: column.id == 'name' ? 'capitalize' : 'none',
                }}>
                {column.id == 'Date' && (
                  <input
                    type="checkbox"
                    id={e.transactionId}
                    checked={e.value}
                    onChange={handleRowSelect}
                  />
                )}
                {column.id == 'Credit' || column.id == 'Debit'
                  ? value == ''
                    ? ''
                    : formatCurrency(value)
                  : value}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </>
  );
};

export default AddTransactionTable;
