import React, { useState } from 'react';
import { GridContainer, GridItem } from 'modules/components/Grid';
import {
  Typography,
  makeStyles,
  Checkbox,
  ListSubheader,
  TextField,
  Select,
  withStyles,
  MenuItem,
  InputAdornment,
  InputBase,
  IconButton,
} from '@material-ui/core';
import InputField from './EmployeeInpt ';
import { HireDateInput } from 'modules/components/DatePickers/Date';
import { SearchOutlined, Add, DeleteForever } from '@material-ui/icons';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import {
  RemoveCircleOutline,
  AddCircleOutline,
  Close,
} from '@material-ui/icons';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import AccountSelect from '../inflow/AccountSelect';

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem',
    borderRadius: '5px',
    marginTop: '1.2rem',
    marginBottom: '2rem',
  },
  formHeader: {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 'bold',
    fontSize: '22px',
    lineHeight: '19px',
    /* identical to box height */
    color: '#010A1B',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  formTitle: {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 'bold',
    fontSize: '15px',
    lineHeight: '19px',
    /* identical to box height */
    color: '#010A1B',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  tableContainer: {
    overflowX: 'auto',
    '&::-webkit-scrollbar-track': {
      webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
      borderRadius: '10px',
      backgroundColor: '#F5F5F5',
      height: '5px',
    },
    '&::-webkit-scrollbar': {
      width: '12px',
      backgroundColor: '#F5F5F5',
      height: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, .3)',
      backgroundColor: '#5559',
    },
  },
  cellWrapper: {
    backgroundColor: '#fcffff',
    color: '#474747',
  },
}));

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
  { id: 'name', label: 'Expenses Category', minWidth: 120 },
  { id: 'debitAccountType', label: 'Description', minWidth: 120 },
  { id: 'amount', label: 'Amount', minWidth: 120 },
  { id: 'action', label: 'Withholding Tax', minWidth: 120 },
];

export default function OperatingExp() {
  const classes = useStyles();

  const [data, setData] = useState([
    {
      account: '',
      name: '',
      amount: '',
      fiscalYear: '',
      budgetPeriod: '',
    },
  ]);

  const removeBudgetCategory = (index) => {
    const updatedForm = data.filter((_, idx) => index != idx);
    setData(updatedForm);
  };

  const removeAll = () => {
    setData([
      {
        account: '',
        name: '',
        amount: '',
        fiscalYear: '',
        budgetPeriod: '',
      },
    ]);
  };

  const newForm = {
    account: '',
    name: '',
    amount: '',
  };

  const addNewForm = (e) => {
    const createdForm = { ...newForm }; // immutability is priceless. keep our original form the same to prevent pass by reference gotchas
    setData([...data, createdForm]);
  };

  return (
    <div>
      <GridContainer>
        <GridItem
          style={{ display: 'flex', marginBottom: '1rem' }}
          xs={12}
          md={8}>
          <GridContainer>
            <GridItem style={{ display: 'flex' }} xs={12}>
              <GridContainer>
                <GridItem
                  style={{ display: 'flex', flexDirection: 'column' }}
                  xs={4}>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="p" className={classes.formTitle}>
                      Date
                    </Typography>
                  </div>
                  <HireDateInput size="small" handleDateChange={() => []} />
                </GridItem>
                <GridItem
                  style={{ display: 'flex', flexDirection: 'column' }}
                  xs={4}>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="p" className={classes.formTitle}>
                      Vendor
                    </Typography>
                  </div>
                  <CssTextField
                    placeholder="Search Vendor"
                    variant="outlined"
                    onChange={() => {}}
                    size="small"
                    style={{
                      // width: '19rem',
                      margin: 0,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                </GridItem>
                <GridItem
                  style={{ display: 'flex', flexDirection: 'column' }}
                  xs={4}>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="p" className={classes.formTitle}>
                      Reference No.
                    </Typography>
                  </div>
                  <InputField
                    placeholder=""
                    size="small"
                    onChange={() => {}}
                    fullWidth
                    font
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem style={{ display: 'flex' }} xs={12}>
              <GridContainer>
                <GridItem
                  style={{ display: 'flex', flexDirection: 'column' }}
                  xs={6}>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="p" className={classes.formTitle}>
                      Payment Account
                    </Typography>
                  </div>
                  <AccountSelect
                    header={'Account Types'}
                    value={''}
                    handleItemClose={() => {}}
                    menuItem={[]}
                    account
                    fullWidth
                  />
                </GridItem>
                <GridItem
                  style={{ display: 'flex', flexDirection: 'column' }}
                  xs={6}>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="p" className={classes.formTitle}>
                      Payment Method
                    </Typography>
                  </div>
                  <SelectComp
                    label="Unit"
                    menuItem={[{ label: 'Dozen', value: 'Dozen' }]}
                    input={<SelectInput />}
                  />
                </GridItem>
              </GridContainer>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem style={{ marginBottom: '1rem' }} xs={12} md={4}>
          <div
            style={{
              background: ' #FFFFFF',
              border: '1.28571px dashed #000000',
              boxSizing: ' border-box',
              borderRadius: '6.42857px',
              height: '13rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <AttachFileIcon style={{ color: 'blue' }} />
              <p style={{ color: 'blue' }}>Attach Receipt</p>
            </div>
          </div>
        </GridItem>
      </GridContainer>

      {/* Table */}
      <Typography variant="h4" className={classes.formHeader}>
        Operating Expenses Details
      </Typography>
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
                      width: column.width,
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
              {data.map((row, index) => (
                <TableRow hover key={index} className={classes.tableRow}>
                  {columns.map((column, i) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        style={{
                          fontFamily: 'Rubik, sans-serif',
                          backgroundColor: '#FCFFFF',
                          fontSize: '16px',
                          textTransform: 'capitalize',
                          display: i == 3 ? 'flex' : '',
                          alignItems: 'center',
                        }}>
                        {i == 0 || i == 3 ? (
                          <AccountSelect
                            header={
                              i == 0
                                ? 'Expenses Categories'
                                : 'Withholding Tax Rate'
                            }
                            value={''}
                            handleItemClose={() => {}}
                            menuItem={[]}
                            account
                            fullWidth
                          />
                        ) : (
                          <SelectComp
                            label="Unit"
                            menuItem={[
                              { label: 'Dozen', value: 'Dozen' },
                              { label: 'Box', value: 'Box' },
                              { label: 'Carton', value: 'Carton' },
                              { label: 'Grams', value: 'Grams' },
                            ]}
                            input={<SelectInput />}
                          />
                        )}
                        {i == 3 && (
                          <IconButton
                            onClick={() => removeBudgetCategory(index)}>
                            <DeleteForever style={{ color: 'red' }} />{' '}
                          </IconButton>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
              <TableRow cols>
                <TableCell colSpan="5">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}>
                    <div style={{ display: 'flex' }}>
                      <div
                        onClick={addNewForm}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          margin: '0 0 0 4.5rem',
                          width: 'max-content',
                          cursor: 'pointer',
                        }}>
                        <IconButton>
                          <AddCircleOutline
                            style={{
                              color: '#1F53D7',
                            }}
                          />
                        </IconButton>

                        <TypographyH5
                          style={{ fontSize: 14, color: '#1F53D7' }}>
                          Add Line
                        </TypographyH5>
                      </div>{' '}
                      <div
                        onClick={removeAll}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          margin: '0 0 0 4.5rem',
                          width: 'max-content',
                          cursor: 'pointer',
                        }}>
                        <IconButton>
                          <DeleteForever style={{ color: 'red' }} />
                        </IconButton>

                        <TypographyH5
                          style={{ fontSize: 14, color: '#1F53D7' }}>
                          Delete All
                        </TypographyH5>
                      </div>
                    </div>
                    <Typography variant="h4" className={classes.formTitle}>
                      Total: NGN 30,000.00{' '}
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div
        style={{
          marginRight: '1.5rem',
          marginTop: '.5rem',
          textAlign: 'end',
        }}>
        <PrimaryButton onClick={() => {}}>Save</PrimaryButton>
      </div>
    </div>
  );
}
