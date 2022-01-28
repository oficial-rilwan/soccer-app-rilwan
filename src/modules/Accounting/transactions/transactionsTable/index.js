import React, { useState, Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Loader from 'react-loaders';
import className from 'classnames';
import { HireDateInput } from 'modules/components/DatePickers/Date';
import {
  Select,
  MenuItem,
  InputBase,
  useMediaQuery,
  Typography,
} from '@material-ui/core';
import { GridContainer, GridItem } from 'modules/components/Grid';
import { useTheme } from '@material-ui/core/styles';
import { EditDialog } from './EditDialog';
import { EditDialogCredit } from './EditDialogCredit';
import { DeleteDialog } from './DeleteDialog';

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
  deleteBtn: {
    display: 'inline-block',
    height: '30px',
    width: '60px',
    padding: '7px',
    borderRadius: '10px',
    background: '#cec6c6',
    color: '#fff',
    margin: '15px 10px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  selectDeleteBtn: { background: 'red' },
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

const RowSelection = (props) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    refetchTransactions,
    selectedRows,
    loading,
    setReload,
  } = props;

  const classes = useStyles();
  const [filterInput, setFilterInput] = useState('');
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const tabUp = useMediaQuery(theme.breakpoints.up(768));
  const matchesSm = useMediaQuery(theme.breakpoints.down('1300'));
  const [transactionId, setTransactionId] = useState('');
  const [transactionIdsToDelete, setTransactionIdsToDelete] = useState([]);
  const [editDialogToShow, setEditDialogToShow] = useState('');

  const [edit, setEdit] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleEditDialogOpen = (id, type) => {
    console.log({ type, editDialogToShow });
    if (type == 'vendor') {
      setTransactionId(id);
      setEditDialogToShow('vendor');
      setEdit(true);
      return;
    }
    setEditDialogToShow('customer');
    setTransactionId(id);
    setEdit(true);
  };

  const handleEditClose = () => {
    setEdit(false);
  };

  const handleFilterChange = (e, type) => {
    const value = e.value || undefined;
    setFilter(type, value);
    setFilterInput(value);
  };
  const handleInputFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter('lawyer.enrollmentNo', value);
    setFilterInput(value);
  };
  const handleDeleteOpen = (id) => {
    if (selectedRows.length > 0) {
      const transactionIds = selectedRows.map((e) => ({
        transactionId: e.original.transactionId,
      }));
      setTransactionIdsToDelete(transactionIds);
      setDeleteOpen(true);
    }
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const firstPageRows = rows.slice(0, 10);

  return (
    <Fragment>
      <section className={classes.root}>
        <GridContainer>
          <GridItem xs={12} sm={2}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Typography component="h6">Types :</Typography>
              <Select
                labelId="country-label"
                variant="outlined"
                fullWidth={matchesXs ? true : false}
                style={{
                  marginRight: matchesXs ? 0 : '1.5rem',
                  marginTop: tabUp ? 0 : '.5rem',
                  textTransform: 'capitalize',
                }}
                onChange={() => {}}
                value={''}
                input={<SelectInput />}
                displayEmpty>
                <MenuItem disabled value="" className={classes.menuItem}>
                  <em>Sales</em>
                </MenuItem>
                {[] &&
                  []?.map((item, i) => (
                    <MenuItem
                      value={item.deptName}
                      key={i}
                      className={classes.menuItem}>
                      {item.deptName}
                    </MenuItem>
                  ))}
              </Select>{' '}
            </div>
          </GridItem>
          <GridItem xs={12} sm={2}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              {' '}
              <Typography component="h6">Category :</Typography>
              <Select
                labelId="country-label"
                variant="outlined"
                fullWidth={matchesXs ? true : false}
                style={{
                  marginRight: matchesXs ? 0 : '1.5rem',
                  marginTop: tabUp ? 0 : '.5rem',
                  textTransform: 'capitalize',
                }}
                onChange={() => {}}
                value={''}
                input={<SelectInput />}
                displayEmpty>
                <MenuItem disabled value="" className={classes.menuItem}>
                  <em>Category</em>
                </MenuItem>
                {[] &&
                  []?.map((item, i) => (
                    <MenuItem
                      value={item.deptName}
                      key={i}
                      className={classes.menuItem}>
                      {item.deptName}
                    </MenuItem>
                  ))}
              </Select>{' '}
            </div>
          </GridItem>

          <GridItem xs={12} sm={2}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Typography component="h6">Status :</Typography>
              <Select
                labelId="country-label"
                variant="outlined"
                fullWidth={matchesXs ? true : false}
                style={{
                  marginRight: matchesXs ? 0 : '1.5rem',
                  marginTop: tabUp ? 0 : '.5rem',
                  textTransform: 'capitalize',
                }}
                onChange={() => {}}
                value={''}
                input={<SelectInput />}
                displayEmpty>
                <MenuItem disabled value="" className={classes.menuItem}>
                  <em>Status</em>
                </MenuItem>
                {[] &&
                  []?.map((item, i) => (
                    <MenuItem
                      value={item.deptName}
                      key={i}
                      className={classes.menuItem}>
                      {item.deptName}
                    </MenuItem>
                  ))}
              </Select>{' '}
            </div>
          </GridItem>
          <GridItem xs={12} sm={2}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Typography component="h6">Date:</Typography>
              <HireDateInput
                fullWidth
                size="medium"
                font
                handleDateChange={() => {}}
                helperText={''}
                value={''}
                error={false}
              />
            </div>
          </GridItem>

          <GridItem xs={12} sm={2}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Typography component="h6">To:</Typography>
              <HireDateInput
                fullWidth
                size="medium"
                font
                handleDateChange={() => {}}
                helperText={''}
                value={''}
                error={false}
              />
            </div>
          </GridItem>
        </GridContainer>
      </section>
      <div style={{ background: '#e8e3e3', height: '60px' }}>
        <span
          onClick={() => handleDeleteOpen()}
          className={className({
            [classes.deleteBtn]: true,
            [classes.selectDeleteBtn]: selectedRows.length > 0,
          })}>
          Delete
        </span>
      </div>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {firstPageRows.map((row) => {
            prepareRow(row);
            return (
              <TableRow hover {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return index == 6 ? (
                    <TableCell {...cell.getCellProps()}>
                      <div
                        onClick={() => {
                          handleEditDialogOpen(
                            cell.row.cells[2].row.original.transactionId,
                            cell.row.cells[2].row.original.recipient.type ===
                              'customer'
                              ? 'customer'
                              : 'vendor',
                          );
                        }}>
                        {cell.render('Cell')}
                      </div>
                    </TableCell>
                  ) : (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {loading ? (
        <div className={classes.loader}>
          <Loader type="line-scale" color="#2F49D0" />
        </div>
      ) : (
        firstPageRows.length == 0 && (
          <div className={classes.recordWrapper}>
            <Typography variant="h6" className={classes.noRecord}>
              No outflows record found
            </Typography>
          </div>
        )
      )}
      <DeleteDialog
        deleteOpen={deleteOpen}
        handleDeleteClose={handleDeleteClose}
        id={transactionIdsToDelete}
        refetchTransactions={refetchTransactions}
        setDeleteOpen={setDeleteOpen}
        setReload={setReload}
      />
      {edit &&
        (editDialogToShow == 'customer' ? (
          <EditDialog
            id={transactionId}
            handleDialogClose={handleEditClose}
            open={edit}
            refetchTransactions={refetchTransactions}
          />
        ) : (
          <EditDialogCredit
            id={transactionId}
            handleDialogClose={handleEditClose}
            open={edit}
            refetchTransactions={refetchTransactions}
          />
        ))}
    </Fragment>
  );
};

export default RowSelection;
