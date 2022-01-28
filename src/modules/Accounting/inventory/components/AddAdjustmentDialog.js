import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import {
  Dialog,
  IconButton,
  InputAdornment,
  InputBase,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { Close, SearchOutlined } from '@material-ui/icons';
import { MaterialDatePicker } from 'modules/components/DatePickers/Date';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import InputForEmployeePage from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import InputField from '../addInventory/EmployeeInpt';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import { useEffect, useState } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { adjustQuanityForm } from 'site-constants';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SelectComp from 'lib/components/Select/SelectCOmp';

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

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '5px',
    backgroundColor: '#EEF5FC',
    padding: '1rem',
    borderRadius: '5px',
    border: '1px solid #DFDFDF',
    flexGrow: 1,
    marginBottom: '4rem',
    marginTop: '1rem',
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
    backgroundColor: '#FCFFFF',
    padding: '.6rem',
    borderRadius: '5px',
    marginTop: '1.2rem',
    marginBottom: '2rem',
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
  dialogContainer: {
    backgroundColor: '#f7fbfe61',
  },
  container: { marginBottom: '17px !important' },
  dialogPaper: {
    width: '36rem',
    height: '36rem',
    borderRadius: 10,
    border: '0.5px solid #878181',
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  inputAdornment: {
    color: '#878181',
  },
  required: {
    position: 'relative',
    top: '3px',
    left: '4px',
    color: '#f04b4b',
  },
  cellWrapper: {
    backgroundColor: '#fcffff',
    color: '#474747',
  },
  dialogContent: {
    marginTop: '4rem',
    fontFamily: 'Rubik',
    fontSize: 14,
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
  formFieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      marginTop: '.7rem',
      justifyContent: 'flex-start',
    },
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
  selectRoot: {
    height: '30rem',
  },
  tableRow: {
    '&:last-child th, &:last-child td': {
      borderBottom: 0,
    },
  },
  deleteBtn: {
    borderRadius: '3px',
    backgroundColor: '#EB5757',
    color: '#fff',
    textTransform: 'none',
    width: '7rem',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    fontWeight: 500,
    fontFamily: 'Rubik',
    '&:hover': {
      backgroundColor: '#EB5757',
    },
  },
  cancelBtn: {
    borderRadius: '3px',
    border: '1px solid #00000033',
    backgroundColor: 'transparent',
    textTransform: 'none',
    fontWeight: 500,
    fontFamily: 'Rubik',
    width: '7rem',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    boxShadow: 'none',
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography
        variant="h6"
        style={{
          fontFamily: 'Rubik',
          fontWeight: 500,
          fontSize: '19.6787px',
          lineHeight: '20px',
          marginTop: '1rem',
        }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <Close />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: '16px 65px 16px 16px',
  },
}))(MuiDialogContent);

const CssTextField = withStyles({
  root: {
    fontStyle: 'italic',
    fontFamily: 'Rubik,sans-serif',
    backgroundColor: '#fff',
    '& input + fieldset': {
      borderColor: '#ced4da',
    },
  },
})(TextField);

const adjustmentStock = [
  'Stock Entry 4 (11/12/21)',
  'Stock Entry 3 (11/11/21)',
  'Stock Entry 2 (11/10/21)',
  'Stock Entry 1 (11/08/21)',
  'Stock Entry 5 (11/12/20)',
];

export const AddAdjustmentDialog = ({
  open,
  handleDialogClose,
  productId,
  stockId,
  product,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));

  const { schema } = adjustQuanityForm;
  const { handleSubmit, errors, control, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    //setform Values
    console.log('Adjust', { productId, stockId });
    reset({
      productId: productId,
      stockId: stockId,
      quantity: 0,
      reason: '',
    });
  }, [open]);

  const handleBtnClick = (data, e) => {
    console.log({ data });
    // update form
    authClient
      .put(
        `/api/v1/accounting/products/stocks/adjustments?id=${productId}`,
        data,
      )
      .then(({ data }) => {
        console.log({ response: data });
        handleDialogClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log({ errors });

  return (
    <Dialog
      onClose={handleDialogClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      classes={{
        container: classes.dialogContainer,
        paper: classes.dialogPaper,
      }}
      disableBackdropClick>
      <DialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
        Adjust Quanitity
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit(handleBtnClick)}>
          {/* <>
            <Controller
              name="productId"
              control={control}
              render={(props) => (
                <InputField
                  placeholder="800"
                  fullWidth
                  size="small"
                  {...props}
                />
              )}
            />{' '}
            <Controller
              name="stockId"
              control={control}
              render={(props) => (
                <InputField
                  placeholder="800"
                  fullWidth
                  size="small"
                  {...props}
                />
              )}
            />
          </> */}

          <div
            style={{
              display: matchesXs ? 'block' : 'grid',
              gridTemplateColumns: 'repeat(2,1fr)',
              gap: '1rem 2rem',
            }}>
            <div className={classes.formFieldWrapper}>
              <TypographyH5 variant="h6" className={classes.formTitle}>
                Product
              </TypographyH5>
            </div>
            <div style={{ gridColumn: '2 / 6' }}>
              <InputField
                disabled
                fullWidth
                size="small"
                value={product.name}
              />
            </div>
            <div className={classes.formFieldWrapper}>
              <TypographyH5 variant="h6" className={classes.formTitle}>
                Stock In Hand:
              </TypographyH5>
              <span className={classes.required}>*</span>
            </div>
            <div style={{ gridColumn: '2 / 6' }}>
              <InputField
                disabled
                fullWidth
                size="small"
                value={product.totalRemainingVariantQuantity}
              />
            </div>
            <div
              className={classes.formFieldWrapper}
              style={{ alignItems: 'flex-start' }}>
              <TypographyH5 variant="h6" className={classes.formTitle}>
                Adjustment Reason{' '}
              </TypographyH5>
            </div>
            <div style={{ gridColumn: '2 / 6' }}>
              <Controller
                name="reason"
                control={control}
                render={(props) => (
                  <SelectComp
                    label="reason"
                    menuItem={[
                      {
                        label: 'Stock returned',
                        value: 'Stock returned',
                      },
                      {
                        label: 'Damages',
                        value: 'Damages',
                      },
                      {
                        label: 'Theft',
                        value: 'Theft',
                      },
                    ]}
                    input={<SelectInput />}
                    {...props}
                  />
                )}
              />
            </div>
            <div className={classes.formFieldWrapper}>
              <TypographyH5 variant="h6" className={classes.formTitle}>
                Adjustment Stock
              </TypographyH5>
            </div>
            <div style={{ gridColumn: '2 / 6' }}>
              <Controller
                name="yyyyy"
                control={control}
                render={(props) => (
                  <Select
                    fullWidth
                    size="small"
                    variant="outlined"
                    classes={{
                      select: classes.select,
                    }}
                    className={classes.selectInput}
                    {...props}>
                    {adjustmentStock.map((child, idx) => (
                      <MenuItem
                        style={{ padding: '.2rem 2rem' }}
                        key={idx}
                        value={child}>
                        <TypographyH5 style={{ fontSize: 15 }}>
                          {child}
                        </TypographyH5>
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </div>
            <div className={classes.formFieldWrapper}>
              <TypographyH5 variant="h6" className={classes.formTitle}>
                Adjustment Quantity
              </TypographyH5>
            </div>
            <div style={{ gridColumn: '2 / 6' }}>
              <Controller
                name="quantity"
                control={control}
                render={(props) => (
                  <InputField
                    placeholder="800"
                    fullWidth
                    size="small"
                    {...props}
                  />
                )}
              />
            </div>{' '}
            <div className={classes.formFieldWrapper}>
              <TypographyH5 variant="h6" className={classes.formTitle}>
                New Stock
              </TypographyH5>
            </div>
            <div style={{ gridColumn: '2 / 6' }}>
              <Controller
                name="name"
                control={control}
                render={(props) => (
                  <InputField
                    placeholder="89"
                    fullWidth
                    size="small"
                    {...props}
                  />
                )}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '1.2rem 0 0px 5rem',
            }}>
            <PrimaryButton type="submit" style={{ margin: '.5rem' }}>
              {' '}
              Done
            </PrimaryButton>
            <DefaultButton
              onClick={() => handleDialogClose()}
              style={{ margin: '.5rem' }}>
              Cancel
            </DefaultButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
