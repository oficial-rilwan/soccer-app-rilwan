import React, { useState, useEffect } from 'react';
import useRouter from 'lib/hooks/routes';
import {
  FormControl,
  FormHelperText,
  Typography,
  makeStyles,
  TextField,
  useMediaQuery,
  Dialog,
  IconButton,
  ListSubheader,
  Select,
  MenuItem,
} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputField from './EmployeeInpt';
import { useTheme, withStyles } from '@material-ui/core/styles';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import { exemptVAT } from './toolTipData';
import { TypographyBold } from 'modules/components/Typography/Typography';
import AccountSelect from 'modules/Accounting/inflow/AccountSelect';
import Lottie from 'react-lottie';
import { Close } from '@material-ui/icons';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import animationData from 'modules/animations/mail.json';
import { DialogTypography } from 'modules/components/Typography/Typography';
import { Redirect } from 'react-router';
import { authClient } from 'modules/authentication/requestClient';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import { serviceInventoryFrom } from 'site-constants';
import { useHistory, useParams } from 'react-router-dom';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import Loader from 'react-loaders';

const inventoryType = [
  {
    title: 'Inventory account',
    children: [{ name: 'Stock account ', id: '61a098f420415e0016e7ab84' }],
  },
];

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

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
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('910')]: {
      padding: '0 3rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 .5rem',
      justifyContent: 'flex-start',
    },
  },
  dialogSuccess: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '90%',
  },
  dialogContainer: {
    backgroundColor: '#f7fbfe61',
  },
  dialogPaper: {
    width: '36rem',
    height: '36rem',
    borderRadius: 10,
    border: '0.5px solid #878181',
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

  contentWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  gridWrapper2: {
    display: 'grid',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      width: '100%',
    },
    gridTemplateColumns: 'repeat(2,1fr)',
    // height: '20rem',
    gap: '1.5rem 3rem',
    paddingTop: '1rem',
  },
  heading: {
    fontSize: 18,
  },
  rowText: {
    backgroundColor: '#fff',
    'input + fieldset': {
      border: '1px solid #E7E8E8',
    },
  },
}));

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
    [theme.breakpoints.down('xs')]: {
      padding: '15px',
    },
  },
}))(MuiDialogContent);

export default function ServicesInventory() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { schema } = serviceInventoryFrom;

  const { handleSubmit, errors, control, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  let { id } = useParams();
  const isEditModde = !!id;
  const history = useHistory();

  useEffect(() => {
    //if in Edit mode fetch the parmas ID and set form with values
    if (isEditModde) {
      setLoading(true);
      authClient
        .get(
          `/api/v1/accounting/services/single?populateKeys=account,costPricing.account,sellingPricing.account&id=${id}`,
        )
        .then((form) => {
          const data = form.data?.data || {};
          //setform Values
          reset({
            type: data.type,
            name: data.name,
            description: data.description,
            vatExempted: data.vatExempted,
            price: data.price,
            accountId: data.accountId,
            vatRate: data.vatRate,
          });
          setLoading(false);
        })
        .catch((err) => setLoading(false));
    }
  }, []);

  //create service

  function createService(data, e) {
    return authClient
      .post(`/api/v1/accounting/services`, data)
      .then(({ data }) => {
        history.push('/dashboard/product-and-services');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //update service

  function updateService(id, data) {
    authClient
      .put(`/api/v1/accounting/services?id=${id}`, data)
      .then(({ data }) => {
        history.push('/dashboard/product-and-services');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleBtnClick = (data, e) => {
    // check for mode
    isEditModde ? updateService(id, data) : createService(data);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    //If Api is still fetching set loader to TRUE else false
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Loader type="line-scale" color="#2F49D0" />
      </div>
    );
  }
  console.log({ errors });

  return (
    <>
      <ReturnBtn />
      <div style={{ margin: '3rem 0rem' }}>
        <form onSubmit={handleSubmit(handleBtnClick)}>
          <section>
            <TypographyBold component="h2" className={classes.heading}>
              Details
            </TypographyBold>
            <div className={classes.container}>
              <div className={classes.formFields}>
                <div className={classes.gridWrapper2}>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Name <span className={classes.required}>*</span>
                    </Typography>
                  </div>
                  <div
                    style={{
                      gridColumn: '2/8',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <FormControl fullWidth error={!!errors['name']}>
                      {' '}
                      <Controller
                        name="name"
                        control={control}
                        render={(props) => (
                          <InputField
                            placeholder="Name"
                            size="small"
                            fullWidth
                            {...props}
                          />
                        )}
                      />
                      {errors['name'] && (
                        <FormHelperText>
                          {errors['name'].message}
                        </FormHelperText>
                      )}
                    </FormControl>
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
                          placeholder="Enter description..."
                          variant="outlined"
                          classes={{
                            root: classes.rowText,
                          }}
                          fullWidth
                          {...props}
                        />
                      )}
                    />
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      VAT Exempt Items?:
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
                          label="Item"
                          menuItem={[
                            { label: 'Yes', value: 'Yes' },
                            { label: 'No', value: 'No' },
                          ]}
                          input={<SelectInput />}
                          {...props}
                        />
                      )}
                    />
                    <Tooltip title={exemptVAT} style={{ marginLeft: 15 }}>
                      <HelpOutline />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <TypographyBold component="h2" className={classes.heading}>
              Pricing
            </TypographyBold>
            <div className={classes.container}>
              <div className={classes.formFields}>
                <div className={classes.gridWrapper2}>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Price:
                      <span className={classes.required}>*</span>
                    </Typography>
                  </div>
                  <div
                    style={{
                      gridColumn: '2/8',
                      alignItems: 'center',
                    }}>
                    <FormControl
                      color="error"
                      fullWidth
                      error={!!errors['price']}>
                      <Controller
                        name="price"
                        control={control}
                        render={(props) => (
                          <InputField
                            placeholder="7.5"
                            size="small"
                            style={{ width: matchesXs ? '100%' : '85%' }}
                            naira={'NGN'}
                            {...props}
                          />
                        )}
                      />
                      {errors['price'] && (
                        <FormHelperText>
                          {errors['price'].message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Account
                    </Typography>
                  </div>
                  <div
                    style={{
                      gridColumn: '2/7',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <Controller
                      name="accountId"
                      control={control}
                      render={(props) => (
                        <Select
                          fullWidth
                          size="small"
                          variant="outlined"
                          classes={{
                            select: classes.select,
                          }}
                          {...props}
                          input={<SelectInput />}
                          className={classes.selectInput}>
                          <div
                            style={{
                              textAlign: 'center',
                              borderBottom: '1px solid #eee',
                              padding: '0 0 .5rem',
                            }}>
                            <TypographyBold>Account Types</TypographyBold>
                          </div>
                          {inventoryType.map((type, i) => {
                            return [
                              <ListSubheader key={i} disableSticky>
                                <TypographyBold style={{ color: '#000' }}>
                                  {type.title}
                                </TypographyBold>
                              </ListSubheader>,
                              type.children.map(({ name, id }, idx) => (
                                <MenuItem
                                  style={{ padding: '.2rem 2rem' }}
                                  key={idx}
                                  value={name}>
                                  <TypographyH5 style={{ fontSize: 15 }}>
                                    {name}
                                  </TypographyH5>
                                </MenuItem>
                              )),
                            ];
                          })}
                        </Select>
                      )}
                    />
                  </div>
                  <div
                    style={{
                      gridColumn: '7/8',
                      display: 'flex',
                      alignItems: 'center',
                    }}></div>
                  <div className={classes.formFieldWrapper}>
                    <Typography variant="h6" className={classes.formTitle}>
                      Tax Rate
                    </Typography>
                  </div>
                  <div
                    style={{
                      gridColumn: '2/2',
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                    <Controller
                      name="vatRate"
                      control={control}
                      render={(props) => (
                        <InputField
                          placeholder="%"
                          size="small"
                          style={{ width: '50%' }}
                          {...props}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: matchesXs ? 0 : '1.2rem 0 0px 5rem',
            }}>
            <PrimaryButton style={{ margin: '.5rem' }} type="submit">
              Save
            </PrimaryButton>
            <DefaultButton
              onClick={() => history.push('/dashboard/product-and-services')}
              style={{ margin: '.5rem' }}
              onClick={() => {}}>
              Cancel
            </DefaultButton>
          </div>
        </form>
      </div>
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
          Add Service
        </DialogTitle>
        <DialogContent dividers style={{ padding: 0 }}>
          <div className={classes.dialogSuccess}>
            <Lottie
              options={defaultOptions}
              height={200}
              width={200}
              isClickToPauseDisabled={true}
            />
            <DialogTypography>Successful</DialogTypography>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
