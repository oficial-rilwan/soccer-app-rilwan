import React, { useState, useEffect } from 'react';
import useRouter from 'lib/hooks/routes';
import {
  Typography,
  makeStyles,
  Checkbox,
  ListSubheader,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import InputField from './EmployeeInpt';
import { withStyles } from '@material-ui/core/styles';
import { HireDateInput } from 'modules/components/DatePickers/Date';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { exemptVAT, lowStockAlert, sku } from './toolTipData';
import { singleInventoryFrom } from 'site-constants';
import { authClient } from 'modules/authentication/requestClient';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import { useHistory, useParams } from 'react-router-dom';
import Loader from 'react-loaders';
import { AddAdjustmentDialog } from '../components/AddAdjustmentDialog';

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
    fontFamily: 'Rubik !important',
    fontStyle: 'normal',
    fontWeight: 'normal',
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
  InputField: { padding: '.5rem', width: '100%' },
  InputFieldVat: { padding: '.5rem', width: '100%', marginTop: '1rem' },
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
  formField2: {
    padding: '0 5rem',
    [theme.breakpoints.down('910')]: {
      padding: '0 2rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 .5rem',
    },
  },
  linkStyles: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    color: '#0F83EF',
    cursor: 'pointer',
    textDecoration: 'underline',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formFields: {
    padding: '0 7rem',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('910')]: {
      padding: '0 2rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 .5rem',
      justifyContent: 'flex-start',
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
  formFieldWrapper3: {
    display: 'flex',
    alignItems: 'center',
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

  gridWrapper2: {
    display: 'grid',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
    gridTemplateColumns: 'repeat(2,1fr) 1rem',
    gridTemplateRows: 'repeat(3,1fr)',
    gap: '1rem 2rem',
  },
  gridWrapper3: {
    display: 'grid',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
    gridTemplateColumns: 'repeat(11,1fr)',
    gridTemplateRows: 'repeat(3,4rem)',
    gap: '1rem 1rem',
    paddingTop: '.3rem',
  },
  heading: {
    fontSize: 18,
    paddingBottom: '1.2rem',
  },
}));

const inventoryType = [
  {
    title: 'Inventory account',
    children: [{ name: 'Sales Account', id: '61a098f420415e0016e7ab84' }],
  },
];

const accountType = [
  {
    title: 'Asset account',
    children: [{ name: 'Cost of Goods Sold', id: '61a098f420415e0016e7ab84' }],
  },
];

const salesAccountType = [
  {
    title: 'Asset account',
    children: [{ name: 'Sales Account', id: '61a098f420415e0016e7ab84' }],
  },
];

export default function AddInventory({
  handleChange = () => {},

  handleHireChange = () => {},
}) {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [stockId, setStockId] = useState();
  const [isAdjDialogueOpen, openAdjDialogue] = useState(false);
  let { id } = useParams();
  const isEditModde = !!id;
  const { schema } = singleInventoryFrom;
  const history = useHistory();
  const [product, setProduct] = useState({});

  const { handleSubmit, errors, control, reset, setValue } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  function handleDialogClose() {
    openAdjDialogue(false);
  }

  useEffect(() => {
    if (id) {
      authClient
        .get(`/api/v1/accounting/products/stocks?productId=${id}`)
        .then((stock) => {
          if (stock && stock.data) {
            setStockId(stock.data.data[0].productId);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  useEffect(() => {
    //if in Edit mode fetch the parmas ID and set form with values
    if (isEditModde) {
      setLoading(true);
      authClient
        .get(
          `/api/v1/accounting/products/single?id=${id}&populateKeys=account,costPricing.account,sellingPricing.account`,
        )
        .then((form) => {
          const data = form.data?.data || {};
          setProduct(data);
          const fields = {
            type: data.type,
            name: data.name,
            description: data.description,
            vatExempted: data.vatExempted,
            sku: data.sku,
            code: data.code,
            unit: data.unit,
            costPricing: {
              price: data.costPricing.price,
              accountId: data.costPricing.account,
              vatRate: data.costPricing.vatRate,
              vatInclusive: data.costPricing.vatInclusive,
            },
            sellingPricing: {
              price: data.sellingPricing.price,
              accountId: data.sellingPricing.account,
              vatRate: data.sellingPricing.vatRate,
              vatInclusive: data.sellingPricing.vatInclusive,
            },
            totalStockQuantity: data.totalStockQuantity,
            asOfDate: data.asOfDate,
            accountId: data.accountId,
            lowStockCount: data.lowStockCount,
          };
          reset(fields);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          history.push('/dashboard/product-and-services');
        });
    }
  }, []);

  function createUser(data, e) {
    data.type = 'SINGLE';
    return authClient
      .post(`/api/v1/accounting/products`, data)
      .then(({ data }) => {
        history.push('/dashboard/product-and-services');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function updateUser(id, data) {
    data.type = 'SINGLE';
    authClient
      .put(`/api/v1/accounting/products?id=${id}`, data)
      .then(({ data }) => {
        history.push('/dashboard/product-and-services');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleBtnClick = (data, e) => {
    isEditModde ? updateUser(id, data) : createUser(data);
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

  return (
    <>
      <ReturnBtn />

      <AddAdjustmentDialog
        handleDialogClose={handleDialogClose}
        open={isAdjDialogueOpen}
        stockId={stockId}
        productId={id}
        product={product}
      />

      <div style={{ margin: '3rem 0rem' }}>
        <section>
          <TypographyBold variant="h2" className={classes.heading}>
            Details
          </TypographyBold>
          <form onSubmit={handleSubmit(handleBtnClick)}>
            <section style={{ display: 'flex', justifyContent: 'center' }}>
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
                        display: 'grid',
                        alignItems: 'center',
                      }}>
                      <FormControl
                        class={classes.InputField}
                        color="error"
                        fullWidth
                        error={!!errors['name']}>
                        <Controller
                          name="name"
                          control={control}
                          render={(props) => (
                            <InputField
                              placeholder=""
                              size="small"
                              onChange={handleChange('employeeID')}
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

                    {isEditModde && (
                      <>
                        <div className={classes.formFieldWrapper}>
                          <Typography
                            variant="h6"
                            className={classes.formTitle}>
                            Type <span className={classes.required}>*</span>
                          </Typography>
                        </div>
                        <div
                          style={{
                            gridColumn: '2/8',
                            display: 'grid',
                            alignItems: 'center',
                          }}>
                          <FormControl class={classes.InputField} fullWidth>
                            <SelectComp
                              disabled
                              label="Produt"
                              menuItem={[{ label: 'Product' }]}
                              input={<SelectInput />}
                            />
                          </FormControl>
                        </div>
                      </>
                    )}
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
                            placeholder="Type description here"
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
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        VAT Exempt Items?:
                        <span className={classes.required}>*</span>
                      </Typography>
                    </div>
                    <div
                      style={{
                        gridColumn: '2/8',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <FormControl
                        class={classes.InputField}
                        color="error"
                        fullWidth
                        error={true}>
                        <Controller
                          name="vatExempted"
                          control={control}
                          render={(props) => (
                            <SelectComp
                              label="vatExempted"
                              menuItem={[
                                { label: 'yes', value: 'YES' },
                                { label: 'no', value: 'NO' },
                              ]}
                              input={<SelectInput />}
                              {...props}
                            />
                          )}
                        />
                        {errors['vatExempted'] && (
                          <FormHelperText>
                            {errors['vatExempted'].message}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <Tooltip
                        style={{ marginRight: '-22px', color: '#00000066' }}
                        title={exemptVAT}>
                        <HelpOutline />
                      </Tooltip>
                    </div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Stock Keeping UNIT (SKU):
                      </Typography>
                    </div>
                    <div
                      style={{
                        gridColumn: '2/8',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <FormControl
                        class={classes.InputField}
                        fullWidth
                        error={!!errors['sku']}>
                        <Controller
                          name="sku"
                          control={control}
                          render={(props) => (
                            <InputField
                              placeholder=""
                              size="small"
                              fullWidth
                              {...props}
                            />
                          )}
                        />
                        {errors['sku'] && (
                          <FormHelperText>
                            {errors['sku'].message}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <Tooltip
                        style={{ marginRight: '-22px', color: '#00000066' }}
                        title={sku}>
                        <HelpOutline />
                      </Tooltip>
                    </div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Product Code:
                        <span className={classes.required}>*</span>
                      </Typography>
                    </div>
                    <div
                      style={{
                        gridColumn: '2/8',
                        display: 'grid',
                        alignItems: 'center',
                      }}>
                      <FormControl
                        class={classes.InputField}
                        fullWidth
                        error={!!errors['code']}>
                        <Controller
                          name="code"
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
                        {errors['code'] && (
                          <FormHelperText>
                            {errors['code'].message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Unit:
                        <span className={classes.required}>*</span>
                      </Typography>
                    </div>
                    <div
                      style={{
                        gridColumn: '2/8',
                        display: 'grid',
                        alignItems: 'center',
                      }}>
                      <FormControl
                        class={classes.InputField}
                        fullWidth
                        error={!!errors['unit']}>
                        <Controller
                          name="unit"
                          control={control}
                          render={(props) => (
                            <SelectComp
                              label="Unit"
                              menuItem={[
                                { label: 'Dozen', value: 'Dozen' },
                                { label: 'Box', value: 'Box' },
                                { label: 'Carton', value: 'Carton' },
                                { label: 'Grams', value: 'Grams' },
                                { label: 'Kilogramms', value: 'Kilogramms' },
                                { label: 'Meter', value: 'Meter' },
                                { label: 'Tablets', value: 'Tablets' },
                                { label: 'Units', value: 'Units' },
                                { label: 'Pieces', value: 'Pieces' },
                                { label: 'Pairs', value: 'Pairs' },
                              ]}
                              input={<SelectInput />}
                              {...props}
                            />
                          )}
                        />
                        {errors['unit'] && (
                          <FormHelperText>
                            {errors['unit'].message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className={classes.contentWrapper}>
              <div style={{ width: '57rem', margin: '3rem 0 0' }}>
                <TypographyBold variant="h3" className={classes.heading}>
                  Pricing
                </TypographyBold>
              </div>
            </div>
            <section style={{ display: 'flex', justifyContent: 'center' }}>
              <div className={classes.container}>
                <div className={classes.formField2}>
                  <div className={classes.gridWrapper3}>
                    <div
                      className={classes.formFieldWrapper3}
                      style={{ gridColumn: '1/5', marginLeft: '1rem' }}>
                      <Controller
                        name=""
                        control={control}
                        render={(props) => (
                          <Checkbox
                            color="primary"
                            color="primary"
                            {...props}
                            checked={props.value}
                            onChange={(e) => props.onChange(e.target.checked)}
                          />
                        )}
                      />
                      <label
                        style={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                        <Typography variant="p" className={classes.footerText}>
                          Was the item purchased?
                        </Typography>
                      </label>
                    </div>
                    <div
                      style={{
                        gridColumn: '5/7',
                        display: 'grid',
                        alignItems: 'center',
                      }}></div>
                    <div
                      className={classes.formFieldWrapper3}
                      style={{ gridColumn: '7/12', marginLeft: '1rem' }}>
                      <Controller
                        name=""
                        control={control}
                        render={(props) => (
                          <Checkbox
                            color="primary"
                            color="primary"
                            {...props}
                            checked={props.value}
                            onChange={(e) => props.onChange(e.target.checked)}
                          />
                        )}
                      />
                      <label
                        style={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}>
                        <Typography variant="p" className={classes.footerText}>
                          Was the item sold?
                        </Typography>
                      </label>
                    </div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Cost Price
                      </Typography>
                    </div>
                    <div
                      style={{
                        gridColumn: '2/5',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <FormControl
                        class={classes.InputFieldVat}
                        color="error"
                        fullWidth
                        error={!!errors.costPricing?.price}>
                        <Controller
                          name="costPricing.price"
                          control={control}
                          render={(props) => (
                            <InputField
                              naira={'NGN'}
                              placeholder="600"
                              size="small"
                              fullWidth
                              {...props}
                            />
                          )}
                        />
                        <div>
                          {errors.costPricing?.price && (
                            <FormHelperText>
                              {errors.costPricing?.price.message}
                            </FormHelperText>
                          )}
                          <Controller
                            name="costPricing.vatInclusive"
                            control={control}
                            render={(props) => (
                              <Checkbox
                                color="primary"
                                {...props}
                                checked={props.value}
                                onChange={(e) =>
                                  props.onChange(e.target.checked)
                                }
                              />
                            )}
                          />

                          <Typography variant="p" className={classes.formTitle}>
                            VAT Inclusive
                          </Typography>
                        </div>
                      </FormControl>
                    </div>
                    <div
                      style={{
                        gridColumn: '5/7',
                        display: 'grid',
                        alignItems: 'center',
                      }}></div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Selling price
                      </Typography>
                    </div>
                    <div
                      style={{
                        gridColumn: '8 / 11',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      {' '}
                      <FormControl
                        class={classes.InputFieldVat}
                        color="error"
                        fullWidth
                        error={!!errors.sellingPricing?.price}>
                        <Controller
                          name="sellingPricing.price"
                          control={control}
                          render={(props) => (
                            <InputField
                              naira={'NGN'}
                              placeholder="700"
                              size="small"
                              fullWidth
                              {...props}
                            />
                          )}
                        />
                        {errors.sellingPricing?.price && (
                          <FormHelperText>
                            {errors.sellingPricing?.price.message}
                          </FormHelperText>
                        )}
                        <div>
                          <Controller
                            name="sellingPricing.vatInclusive"
                            control={control}
                            render={(props) => (
                              <Checkbox
                                color="primary"
                                {...props}
                                checked={props.value}
                                onChange={(e) =>
                                  props.onChange(e.target.checked)
                                }
                              />
                            )}
                          />

                          <Typography variant="p" className={classes.formTitle}>
                            VAT Inclusive
                          </Typography>
                        </div>
                      </FormControl>
                    </div>

                    <div
                      style={{
                        gridColumn: '11/ 12',
                        display: 'flex',
                        alignItems: 'center',
                      }}></div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Account
                      </Typography>
                    </div>
                    <div
                      style={{
                        gridColumn: '2/5',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <Controller
                        name="costPricing.accountId"
                        control={control}
                        render={(props) => (
                          <SelectComp
                            label="Account"
                            menuItem={[
                              {
                                label: 'Cost of Sales',
                                value: '61a098f420415e0016e7ab84',
                              },
                            ]}
                            input={<SelectInput />}
                            {...props}
                          />
                        )}
                      />
                    </div>
                    <div
                      style={{
                        gridColumn: '5/7',
                        display: 'grid',
                        alignItems: 'center',
                      }}></div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Account
                      </Typography>
                    </div>
                    <div
                      style={{
                        gridColumn: '8/11',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <Controller
                        name="sellingPricing.accountId"
                        control={control}
                        render={(props) => (
                          <SelectComp
                            label="Account"
                            menuItem={[
                              {
                                label: 'Sales Account',
                                value: '61a098f420415e0016e7ab84',
                              },
                            ]}
                            input={<SelectInput />}
                            {...props}
                          />
                        )}
                      />
                    </div>
                    <div
                      style={{
                        gridColumn: '11/ 12',
                        display: 'flex',
                        alignItems: 'center',
                      }}></div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        VAT:
                      </Typography>
                    </div>
                    <div
                      style={{
                        gridColumn: '2/5',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <Controller
                        name="costPricing.vatRate"
                        control={control}
                        render={(props) => (
                          <InputField
                            placeholder="7.5"
                            size="small"
                            naira={'%'}
                            {...props}
                          />
                        )}
                      />
                    </div>
                    <div
                      style={{
                        gridColumn: '5/7',
                        display: 'grid',
                        alignItems: 'center',
                      }}></div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        VAT:
                      </Typography>
                    </div>
                    <div
                      style={{
                        gridColumn: '8/12',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <Controller
                        name="sellingPricing.vatRate"
                        control={control}
                        render={(props) => (
                          <InputField
                            placeholder="7.5"
                            size="small"
                            naira={'%'}
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
              <div
                style={{
                  margin: '3rem 0 0',
                  margin: '3rem 0 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                <TypographyBold variant="h3" className={classes.heading}>
                  Inventory
                </TypographyBold>
                {isEditModde && (
                  <Typography
                    variant="h5"
                    className={classes.linkStyles}
                    onClick={() =>
                      history.push(
                        `/dashboard/product-and-services/products/variables/${id}/adjustment/${stockId}`,
                      )
                    }>
                    {' '}
                    View Stock History
                  </Typography>
                )}
              </div>
            </div>
            <section style={{ display: 'flex', justifyContent: 'center' }}>
              <div className={classes.container}>
                <div className={classes.formFields}>
                  <div className={classes.gridWrapper2}>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Inventory at Hand:
                        <span className={classes.required}>*</span>
                      </Typography>
                    </div>
                    <div
                      style={{
                        gridColumn: '2/8',
                        display: 'grid',
                        alignItems: 'center',
                      }}>
                      <FormControl
                        class={classes.InputField}
                        color="error"
                        fullWidth
                        error={!!errors['totalStockQuantity']}>
                        <Controller
                          name="totalStockQuantity"
                          control={control}
                          render={(props) => (
                            <InputField
                              placeholder="67"
                              size="small"
                              fullWidth
                              {...props}
                            />
                          )}
                        />
                        {errors['totalStockQuantity'] && (
                          <FormHelperText>
                            {errors['totalStockQuantity'].message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        {!isEditModde ? 'As of Date:' : 'Adjust:'}
                        {!isEditModde && (
                          <span className={classes.required}>*</span>
                        )}
                      </Typography>
                    </div>
                    <div style={{ gridColumn: '2/8', display: 'grid' }}>
                      {isEditModde ? (
                        <Typography
                          variant="h5"
                          className={classes.linkStyles}
                          onClick={() => openAdjDialogue(true)}>
                          Adjust Quantity{' '}
                        </Typography>
                      ) : (
                        <FormControl
                          class={classes.InputField}
                          color="error"
                          fullWidth
                          error={!!errors['asOfDate']}>
                          <Controller
                            name="asOfDate"
                            control={control}
                            render={(props) => (
                              <HireDateInput
                                style={{ width: '100%' }}
                                {...props}
                              />
                            )}
                          />
                          {errors['asOfDate'] && (
                            <FormHelperText>
                              {errors['asOfDate'].message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      )}
                    </div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Inventory Asset Account
                        <span className={classes.required}>*</span>
                      </Typography>
                    </div>
                    <div
                      style={{
                        gridColumn: '2/8',
                        display: 'grid',
                        alignItems: 'center',
                      }}>
                      <FormControl
                        class={classes.InputField}
                        color="error"
                        fullWidth
                        error={!!errors['accountId']}>
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
                              className={classes.selectInput}>
                              <div
                                style={{
                                  textAlign: 'center',
                                  borderBottom: '1px solid #eee',
                                  padding: '0 0 .5rem',
                                }}>
                                <TypographyBold>Account Types</TypographyBold>k
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
                                      value={id}>
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
                        {errors['accountId'] && (
                          <FormHelperText>
                            {errors['accountId'].message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Low Stock Alert:
                        <span className={classes.required}>*</span>
                      </Typography>
                    </div>
                    <div
                      style={{
                        gridColumn: '2/8',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <FormControl
                        class={classes.InputField}
                        color="error"
                        fullWidth
                        error={!!errors['lowStockCount']}>
                        <Controller
                          name="lowStockCount"
                          control={control}
                          render={(props) => (
                            <InputField
                              placeholder="899"
                              size="small"
                              fullWidth
                              {...props}
                            />
                          )}
                        />
                        {errors['lowStockCount'] && (
                          <FormHelperText>
                            {errors['lowStockCount'].message}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <Tooltip
                        style={{ marginRight: '-22px', color: '#00000066' }}
                        title={lowStockAlert}>
                        <HelpOutline />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '1.2rem 0 0px 5rem',
              }}>
              <PrimaryButton style={{ margin: '.5rem' }} type="submit">
                Save
              </PrimaryButton>
              <DefaultButton
                onClick={() => history.push('/dashboard/product-and-services')}
                style={{ margin: '.5rem' }}>
                Cancel
              </DefaultButton>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
