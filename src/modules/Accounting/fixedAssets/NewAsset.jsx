import React, { useState } from 'react';
import {
  Checkbox,
  Typography,
  makeStyles,
  TextField,
  ListSubheader,
  Select,
  MenuItem,
} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import InputField from '../inventory/addInventory/EmployeeInpt';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import { exemptVAT, lowStockAlert, sku } from './toolTipData';
import { singleInventoryFrom } from 'site-constants';
import { authClient } from 'modules/authentication/requestClient';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { HireDateInput } from 'modules/components/DatePickers/Date';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';

const salesType = [
  {
    title: 'Inventory account',
    children: ['Sales Account '],
  },
];
const cosType = [
  {
    title: 'Inventory account',
    children: ['Cost of Sales account '],
  },
];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    [theme.breakpoints.down('xs')]: {
      padding: '.5rem',
    },
  },
  outlineText: {
    borderColor: '#E7E8E8',
  },
  input: {
    paddingLeft: 5,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '24px',
    padding: '1.2rem 0rem',
  },
  title2: {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    padding: '0em 0rem 1rem',
  },
  formFields: {
    padding: '0 7rem',
    [theme.breakpoints.down('910')]: {
      padding: '0 3rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 .5rem',
    },
  },
  formTitle: {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '19px',
    /* identical to box height */
    color: '#010A1B',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  selectInput: {
    borderRadius: '0px !important',
  },
  selectComp: {
    '& .MuiInputBase-fullWidth-201': {
      width: '80% !important',
    },
  },
  formFieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      marginTop: '.7rem',
      justifyContent: 'flex-start',
    },
  },

  required: {
    color: '#FF0303',
    verticalAlign: 'sub',
    margin: '.3rem',
  },
  selectInput: {
    height: 42,
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#F5F6F8',
    },
    '& :focus': {
      backgroundColor: 'transparent',
    },
  },
  select: {
    padding: 12,
  },
  contentWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  gridWrapper2: {
    display: 'grid',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
    gridTemplateColumns: 'repeat(2,1fr)',
    gridTemplateRows: 'repeat(3,1fr)',
    // height: '20rem',
    gap: '1rem 2rem',
    paddingTop: '1rem',
  },
}));

export default function AddInventory({}) {
  const classes = useStyles();

  const { schema } = singleInventoryFrom;

  const { handleSubmit, errors, control, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  console.log({ errors });
  const handleBtnClick = (data) => {
    data.type = 'variant';
    authClient
      .post(`/api/v1/accounting/inventory/product`, data)
      .then(({ data }) => {
        handleClick();
        reset();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(handleBtnClick)}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          Product successfully added!{' '}
        </Alert>
      </Snackbar>
      <div style={{ margin: '3rem 0rem' }}>
        <ReturnBtn />
        <section>
          <div className={classes.contentWrapper}>
            <div style={{ width: '57rem' }}>
              <Typography variant="h3" className={classes.title2}>
                Details{' '}
              </Typography>
            </div>
          </div>
          <section style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={classes.container}>
              <div className={classes.formFields}>
                <div className={classes.gridWrapper2}>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Asset Name <span className={classes.required}>*</span>
                    </Typography>
                  </div>
                  <div
                    style={{
                      gridColumn: '2/8',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <Controller
                      name="name"
                      control={control}
                      render={(props) => (
                        <InputField
                          placeholder="JX1078"
                          size="small"
                          fullWidth
                          {...props}
                        />
                      )}
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Asset No:{' '}
                    </Typography>
                  </div>
                  <div
                    style={{
                      gridColumn: '2/8',
                      alignItems: 'center',
                      display: 'flex',
                    }}>
                    <Controller
                      name="sellingPricing.price"
                      control={control}
                      render={(props) => (
                        <InputField
                          placeholder="1000"
                          size="small"
                          fullWidth
                          naira={'F/A'}
                          {...props}
                        />
                      )}
                    />
                    <Tooltip title={exemptVAT}>
                      <HelpOutline />
                    </Tooltip>
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Purchase Date:
                      <span className={classes.required}>*</span>
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/8' }}>
                    <Controller
                      name="asOfDate"
                      control={control}
                      render={(props) => (
                        <HireDateInput
                          handleDateChange={() => {}}
                          disablePast
                          {...props}
                        />
                      )}
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Purchase price:{' '}
                    </Typography>
                  </div>
                  <div
                    style={{
                      gridColumn: '2/8',
                      alignItems: 'center',
                      display: 'flex',
                    }}>
                    <Controller
                      name="sellingPricing.price"
                      control={control}
                      render={(props) => (
                        <InputField
                          placeholder="1000"
                          size="small"
                          fullWidth
                          naira={'NGN'}
                          {...props}
                        />
                      )}
                    />
                    <Tooltip title={exemptVAT}>
                      <HelpOutline />
                    </Tooltip>
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Expiry Date:
                      <span className={classes.required}>*</span>
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/8' }}>
                    <Controller
                      name="asOfDate"
                      control={control}
                      render={(props) => (
                        <HireDateInput
                          handleDateChange={() => {}}
                          disablePast
                          {...props}
                        />
                      )}
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Serial No. <span className={classes.required}>*</span>
                    </Typography>
                  </div>
                  <div
                    style={{
                      gridColumn: '2/8',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <Controller
                      name="name"
                      control={control}
                      render={(props) => (
                        <InputField
                          placeholder="JX1078"
                          size="small"
                          fullWidth
                          {...props}
                        />
                      )}
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Asset Category:
                      <span className={classes.required}>*</span>
                    </Typography>
                  </div>
                  <div
                    style={{
                      gridColumn: '2/8',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <Controller
                      name="vatExempted"
                      control={control}
                      render={(props) => (
                        <SelectComp
                          label="VAT Exempted"
                          menuItem={[
                            { label: 'yes', value: 'yes' },
                            { label: 'no', value: 'no' },
                          ]}
                          input={<SelectInput />}
                          {...props}
                        />
                      )}
                    />
                    <Tooltip title={exemptVAT}>
                      <HelpOutline />
                    </Tooltip>
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Asset Type:
                      <span className={classes.required}>*</span>
                    </Typography>
                  </div>
                  <div
                    style={{
                      gridColumn: '2/8',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <Controller
                      name="vatExempted"
                      control={control}
                      render={(props) => (
                        <SelectComp
                          label="VAT Exempted"
                          menuItem={[
                            { label: 'yes', value: 'yes' },
                            { label: 'no', value: 'no' },
                          ]}
                          input={<SelectInput />}
                          {...props}
                        />
                      )}
                    />
                    <Tooltip title={exemptVAT}>
                      <HelpOutline />
                    </Tooltip>
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Asset Location <span className={classes.required}>*</span>
                    </Typography>
                  </div>
                  <div
                    style={{
                      gridColumn: '2/8',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <Controller
                      name="name"
                      control={control}
                      render={(props) => (
                        <InputField
                          placeholder="JX1078"
                          size="small"
                          fullWidth
                          {...props}
                        />
                      )}
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Description:
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/8' }}>
                    <Controller
                      name="description"
                      control={control}
                      render={(props) => (
                        <TextField
                          multiline
                          rows={5}
                          placeholder="Type reason here"
                          style={{
                            fontStyle: 'italic',
                          }}
                          variant="outlined"
                          fullWidth
                          {...props}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className={classes.contentWrapper}>
            <div style={{ width: '57rem', margin: '3rem 0 0' }}>
              <Typography variant="h3" className={classes.title2}>
                Depreciation / Amortization{' '}
              </Typography>
            </div>
          </div>
          <section style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={classes.container}>
              <div className={classes.formFields}>
                <div className={classes.gridWrapper2}>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Effective Life (Years):{' '}
                      <span className={classes.required}>*</span>
                    </Typography>
                  </div>
                  <div
                    style={{
                      gridColumn: '2/8',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <Controller
                      name="variant.variationName"
                      control={control}
                      render={(props) => (
                        <InputField
                          placeholder="JX1078"
                          size="small"
                          fullWidth
                          {...props}
                        />
                      )}
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Depreciation Starts:
                      <span className={classes.required}>*</span>
                    </Typography>
                  </div>
                  <div style={{ gridColumn: '2/8' }}>
                    <Controller
                      name="asOfDate"
                      control={control}
                      render={(props) => (
                        <HireDateInput
                          handleDateChange={() => {}}
                          disablePast
                          {...props}
                        />
                      )}
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Depreciation Method{' '}
                      <span className={classes.required}>*</span>
                    </Typography>
                  </div>
                  <div
                    style={{
                      gridColumn: '2/8',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <Controller
                      name="variant.productUnit"
                      control={control}
                      render={(props) => (
                        <SelectComp
                          label="Unit"
                          menuItem={[
                            {
                              label: 'Single Product',
                              value: 'Single Product',
                            },
                          ]}
                          input={<SelectInput />}
                          {...props}
                        />
                      )}
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Scrap Value:
                    </Typography>
                  </div>
                  <div
                    style={{
                      gridColumn: '2/8',
                      marginBottom: '1rem',
                      alignItems: 'center',
                    }}>
                    <Controller
                      name="variant.price"
                      control={control}
                      render={(props) => (
                        <InputField
                          fullWidth
                          placeholder="100"
                          size="small"
                          naira={'NGN'}
                          {...props}
                        />
                      )}
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Rate:
                    </Typography>
                  </div>
                  <div
                    style={{
                      gridColumn: '2/2',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <Controller
                      name="variant.totalUnitQuantity"
                      control={control}
                      render={(props) => (
                        <InputField
                          placeholder="%"
                          size="small"
                          fullWidth
                          {...props}
                        />
                      )}
                    />
                    <Tooltip title={exemptVAT}>
                      <HelpOutline />
                    </Tooltip>
                  </div>{' '}
                </div>
              </div>
            </div>
          </section>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '1.2rem 0 0px 5rem',
            }}>
            <PrimaryButton style={{ margin: '.5rem' }} type="submit">
              Save As Draft
            </PrimaryButton>
            <div>
              <DefaultButton
                style={{ margin: '.5rem', background: 'green', color: '#fff' }}>
                Register
              </DefaultButton>
              <DefaultButton style={{ margin: '.5rem' }}>Cancel</DefaultButton>
            </div>{' '}
          </div>
        </section>
      </div>
    </form>
  );
}
