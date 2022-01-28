import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { InputBase, makeStyles, MenuItem, Select } from '@material-ui/core';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { withStyles } from '@material-ui/styles';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import { authClient } from 'modules/authentication/requestClient';
import { useHistory, useParams } from 'react-router';

const SelectInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    borderColor: '#E7E8E8',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    color: '#6c6b6b',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      backgroundColor: '#fff',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  container: {
    background: '#FCFFFF',
    borderRadius: '5px',
    border: '0.5px solid #DFDFDF',
    width: '100%',
    justifyContent: 'center',
    padding: '2rem',
    marginBottom: 50,
    [theme.breakpoints.down('xs')]: {
      padding: '.5rem',
    },
  },
  selectInput: {
    borderRadius: '0px !important',
  },

  input: {
    paddingLeft: 5,
    backgroundColor: '#fff',
  },
  // container: { marginBottom: '17px !important' },
  tableRow: {
    '&:last-child th, &:last-child td': {
      borderBottom: 0,
    },
  },
  cellWrapper: {
    backgroundColor: '#fcffff',
    color: '#474747',
  },
}));

const columns = [
  { id: 'date', label: 'Date', minWidth: 100 },
  { id: 'adjustment', label: 'Adjustment', minWidth: 100 },
  { id: 'stock', label: 'stock', minWidth: 100 },
];
export default function VariableAjustment() {
  const classes = useStyles();
  const { stockId, productId } = useParams();
  const [variableAj, setVariableAj] = useState([]);

  useEffect(() => {
    authClient
      .get(
        `/api/v1/accounting/products/stocks/adjustments?productId=${productId}&stockId=${stockId}`,
      )
      .then(({ data }) => {
        console.log({ relate: data });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <ReturnBtn />
      </div>
      <div style={{ width: '20%', marginBottom: '1rem' }}>
        <Select
          fullWidth
          size="small"
          variant="outlined"
          classes={{
            select: classes.select,
          }}
          input={<SelectInput />}
          className={classes.selectInput}>
          <div
            style={{
              textAlign: 'center',
              borderBottom: '1px solid #eee',
              padding: '0 0 .5rem',
            }}>
            <MenuItem>
              <TypographyBold>All Adjustment Types</TypographyBold>
            </MenuItem>
          </div>
        </Select>
      </div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontFamily: 'Rubik',
                    fontWeight: 500,
                    fontSize: '16px',
                  }}
                  className={classes.cellWrapper}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {variableAj.map((row, i) => (
              <TableRow hover key={i} className={classes.tableRow}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        fontFamily: 'Rubik, sans-serif',
                        backgroundColor: '#FCFFFF',
                        fontSize: '15px',
                        color: column.id === 'code' && '#940CFE',
                      }}>
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
