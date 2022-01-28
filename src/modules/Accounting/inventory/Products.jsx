import { useEffect, useState } from 'react';
import {
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  useMediaQuery,
  useTheme,
  withStyles,
  IconButton,
} from '@material-ui/core';
import {
  SearchOutlined,
  DeleteForeverOutlined,
  CreateOutlined,
} from '@material-ui/icons';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { TypographyBold } from 'modules/components/Typography/Typography';
import InventoryChart from './components/InventoryChart';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import { authClient } from 'modules/authentication/requestClient';
import { DeleteDialog } from './components/DeleteDialog';
import { useHistory } from 'react-router';
import Loader from 'react-loaders';

const useStyles = makeStyles((theme) => ({
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
  grid_1: {
    margin: '70px 0',
  },
  overViewContent: {
    display: 'flex',
    alignItems: 'center',
    margin: '.7rem 0',
  },
  stats: {
    backgroundColor: '#FCFFFF',
    border: '1px solid #DFDFDF',
    borderRadius: 3,
    padding: '40px',
  },
  grid_2: {
    padding: '30px 0 0 90px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.down('md')]: {
      padding: '30px 55px',
    },
  },
  statsCard: {
    backgroundColor: '#FDFDFD',
    borderRadius: 6,
    border: '1px solid #DFDFDF',
    height: '6rem',
    padding: '10px',
    margin: '20px 0',
  },
}));

const CssTextField = withStyles({
  root: {
    fontStyle: 'italic',
    fontFamily: 'Rubik,sans-serif',
    backgroundColor: '#F5F9F7',
    '& input + fieldset': {
      borderColor: '#ced4da',
    },
  },
})(TextField);

const columns = [
  { id: 'code', label: 'Code', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'type', label: 'Type', minWidth: 100 },
  { id: 'price', label: 'Price', minWidth: 110 },
  { id: 'quantityLeft', label: 'Quantity Left', minWidth: 140 },
  { id: 'action', label: 'Action', minWidth: 120 },
];

export default function Products({ values }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const [showDeleteDialog, setDeleteDialog] = useState(false);
  const history = useHistory();

  function handleDeleteClose() {
    setDeleteDialog(false);
  }

  function handleDeleteOpen() {
    setDeleteDialog(true);
  }

  return (
    <section>
      <DeleteDialog
        headerText={'Product'}
        handleDeleteClose={handleDeleteClose}
        deleteOpen={showDeleteDialog}
      />
      <div>
        <Grid container>
          <Grid item xs={12} lg={7} className={classes.grid_1}>
            <DeleteDialog />
            <div
              style={{
                display: 'flex',
                flexWrap: matchesXs && 'wrap',
                justifyContent: 'center',
              }}>
              <div style={{ height: '24rem' }}>
                <TypographyBold style={{ margin: matchesXs && '0 0 0 15px' }}>
                  Top Selling Items
                </TypographyBold>
                <InventoryChart />
              </div>

              <div
                style={{
                  margin: '2.5rem 0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <div className={classes.overViewContent}>
                  <span
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: '50%',
                      background: '#00DC7D',
                      marginRight: '15px',
                    }}></span>
                  <TypographyH5>Carrots- NGN2,000,000.00</TypographyH5>
                </div>
                <div className={classes.overViewContent}>
                  <span
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: '50%',
                      background: '#EB5757',
                      marginRight: '15px',
                    }}></span>
                  <TypographyH5>Strawberries- NGN400,000.00</TypographyH5>
                </div>
                <div className={classes.overViewContent}>
                  <span
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: '50%',
                      background: '#F2994A',
                      marginRight: '15px',
                    }}></span>
                  <TypographyH5>Oranges- NGN200,000.00</TypographyH5>
                </div>
                <div className={classes.overViewContent}>
                  <span
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: '50%',
                      background: '#F2C94C',
                      marginRight: '15px',
                    }}></span>
                  <TypographyH5>Mangos- NGN50,000.00</TypographyH5>
                </div>
                <div className={classes.overViewContent}>
                  <span
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: '50%',
                      background: '#336666',
                      marginRight: '15px',
                    }}></span>
                  <TypographyH5>Vegetables- NGN50,000.00</TypographyH5>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} lg={5} className={classes.grid_2}>
            <div className={classes.stats}>
              <div className={classes.statsCard}>
                <TypographyBold
                  style={{
                    color: '#0F83EF',
                    fontSize: 14,
                    padding: '.45rem 0',
                  }}>
                  Total Products
                </TypographyBold>
                <TypographyBold style={{ fontSize: 22, padding: '.45rem 0' }}>
                  20
                </TypographyBold>
              </div>
              <div className={classes.statsCard}>
                <TypographyBold
                  style={{
                    color: '#27AE60',
                    fontSize: 14,
                    padding: '.45rem 0',
                  }}>
                  Total Quantity on Hand
                </TypographyBold>
                <TypographyBold style={{ fontSize: 22, padding: '.45rem 0' }}>
                  3000
                </TypographyBold>
              </div>
              <div className={classes.statsCard}>
                <TypographyBold
                  style={{
                    color: '#EB5757',
                    fontSize: 14,
                    padding: '.45rem 0',
                  }}>
                  Low Stock product
                </TypographyBold>
                <TypographyBold style={{ fontSize: 22, padding: '.45rem 0' }}>
                  20
                </TypographyBold>
              </div>
            </div>
          </Grid>
        </Grid>
        <CssTextField
          placeholder="Search Products"
          variant="outlined"
          // onChange={handleSearch}
          style={{
            width: matchesXs ? '100%' : '19rem',
            margin: matchesXs ? '1rem 0' : 0,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        />
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <TypographyH5
              style={{ color: '#3B86C0', fontSize: 15, cursor: 'pointer' }}>
              FIFO Valuation Method
            </TypographyH5>
          </div>
          <div className={classes.root}>
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
                  {values.length ? (
                    values.map((row, i) => (
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
                                      if (row['type'] == 'SINGLE') {
                                        history.push(
                                          '/dashboard/product-and-services/products/single/' +
                                            row['id'],
                                        );
                                      } else if (row['type'] == 'VARIABLE') {
                                        history.push(
                                          '/dashboard/product-and-services/products/variables/' +
                                            row['id'],
                                        );
                                      }
                                    }}>
                                    <CreateOutlined />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => handleDeleteOpen()}>
                                    <DeleteForeverOutlined
                                      style={{ color: '#EB5757' }}
                                    />
                                  </IconButton>
                                </div>
                              ) : column.id === 'price' ? (
                                row['sellingPricing'].price
                              ) : column.id == 'quantityLeft' ? (
                                row['totalStockQuantity']
                              ) : column.id === 'code' ? (
                                <span
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                    if (row['type'] == 'SINGLE') {
                                      history.push(
                                        '/dashboard/product-and-services/products/single/' +
                                          row['id'],
                                      );
                                    } else if (row['type'] == 'VARIABLE') {
                                      history.push(
                                        '/dashboard/product-and-services/products/variables/' +
                                          row['id'],
                                      );
                                    }
                                  }}>
                                  {value}
                                </span>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                  ) : (
                    <Loader type="line-scale" color="#2F49D0" />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div
            style={{
              fontStyle: 'italic',
              margin: '0 0 1.2rem 0',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
            <TypographyH5 style={{ color: '#878181', fontSize: 15 }}>
              Displaying 1 of 3 Per Page
            </TypographyH5>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: matchesXs && '15px 0',
              }}>
              <TypographyH5
                style={{
                  color: '#010A1B',
                  fontSize: 15,
                  margin: '0 10px',
                  display: matchesXs && 'none',
                }}>
                1-6 of 6
              </TypographyH5>
              <DefaultButton
                style={{
                  margin: '0 .3rem',
                  padding: 6,
                  borderRadius: '5px 0px 0px 5px',
                  border: '0.5px solid #4F4F4F',
                }}>
                {'-'}
              </DefaultButton>
              <DefaultButton
                style={{
                  margin: '0 .3rem',
                  padding: 6,
                  borderRadius: '0px 5px 5px 0px',
                  border: '0.5px solid #4f4f4f',
                }}>
                {'+'}
              </DefaultButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
