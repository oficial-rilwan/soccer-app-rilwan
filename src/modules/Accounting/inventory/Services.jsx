import { useEffect } from 'react';
import { makeStyles, useTheme, IconButton } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useState } from 'react';
import { CreateOutlined, DeleteForeverOutlined } from '@material-ui/icons';
import { DeleteDialog } from './components/DeleteDialog';
import { useHistory, useParams } from 'react-router';
import { authClient } from 'modules/authentication/requestClient';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: '5px',
    backgroundColor: '#FCFFFF',
    padding: '1rem 1rem 0',
    borderRadius: '5px',
    border: '1px solid #DFDFDF',
    flexGrow: 1,
    margin: '1.5rem 0 2rem',
  },
  container: { marginBottom: '17px !important' },
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
  { id: 'code', label: 'Code', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'description', label: 'Description', minWidth: 100 },
  { id: 'price', label: 'Price', minWidth: 110 },
  { id: 'action', label: 'Action', minWidth: 120 },
];

export default function Services({ values }) {
  const classes = useStyles();
  const history = useHistory();

  const [showDeleteDialog, setDeleteDialog] = useState(false);

  function handleDeleteClose() {
    setDeleteDialog(false);
  }

  function handleDeleteOpen() {
    setDeleteDialog(true);
  }

  return (
    <div className={classes.root}>
      <DeleteDialog
        headerText={'Service'}
        handleDeleteClose={handleDeleteClose}
        deleteOpen={showDeleteDialog}
      />
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
            {values.map((row, i) => (
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
                      {column.id === 'action' ? (
                        <div style={{ display: 'flex' }}>
                          <IconButton
                            onClick={() => {
                              history.push(
                                '/dashboard/product-and-services/products/services/' +
                                  row['id'],
                              );
                            }}>
                            <CreateOutlined />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteOpen()}>
                            <DeleteForeverOutlined
                              style={{ color: '#EB5757' }}
                            />
                          </IconButton>
                        </div>
                      ) : column.id === 'code' ? (
                        row['account']?.type.categoryCode
                      ) : (
                        value
                      )}
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
