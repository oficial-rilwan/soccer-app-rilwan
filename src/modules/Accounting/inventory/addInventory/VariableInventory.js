import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  Typography,
  makeStyles,
  TextField,
  FormControl,
  FormHelperText,
  IconButton,
  Button,
} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import InputField from './EmployeeInpt';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import { exemptVAT, lowStockAlert, sku } from './toolTipData';
import { variableInventoryFrom } from 'site-constants';
import { authClient } from 'modules/authentication/requestClient';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import { useHistory, useParams } from 'react-router';
import { DeleteForeverOutlined } from '@material-ui/icons';
import { AddAdjustmentDialog } from '../components/AddAdjustmentDialog';
import Loader from 'react-loaders';

const JurebButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    borderRadius: '2px',
    fontFamily: 'Rubik',
    backgroundColor: '#EEF5FC',
    marginRight: '7px',
  },
})(Button);

const columns = [
  { id: 'code', label: 'Code', minWidth: 100 },
  { id: 'productCode', label: 'Product Code', minWidth: 100 },
  { id: 'price', label: 'Price', minWidth: 110 },
  { id: 'stock', label: 'stock', minWidth: 100 },
  { id: 'action', label: 'Action', minWidth: 120 },
];

const cosType = [
  {
    title: 'Inventory account',
    children: [
      { id: '61a098f420415e0016e7ab84', name: 'Cost of Sales account ' },
    ],
  },
];

const salesType = [
  {
    title: 'Inventory account',
    children: [{ id: '61a098f420415e0016e7ab84', name: 'Sales Account ' }],
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
  viewStockHistory: {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '21px',
    padding: '0em 0rem 1rem',
    textDecoration: 'underline',
    color: '#0F83EF',
    cursor: 'pointer',
  },
  formFields: {
    display: 'grid',
    justifyContent: 'center',
    padding: '0 7rem',
    [theme.breakpoints.down('910')]: {
      padding: '0 3rem',
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 .5rem',
    },
  },
  InputField: { padding: '.5rem' },

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
    display: 'grid',
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
    gridTemplateColumns: 'repeat(2,1fr) 1rem',
    gridTemplateRows: 'repeat(3,1fr)',
    // height: '20rem',
    gap: '1rem 2rem',
    paddingTop: '1rem',
  },
}));

export default function AddInventory({}) {
  const classes = useStyles();
  const history = useHistory();
  let { id } = useParams();
  const { schema } = variableInventoryFrom;
  const [isAdjDialogueOpen, openAdjDialogue] = useState(false);
  const [product, setProduct] = useState({});
  const [showVariationDetail, EditVariationdetail] = useState(false);
  const [stockId, setStockId] = useState();
  const [isLoading, setLoading] = useState(false);

  const { handleSubmit, errors, control, reset } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const isEditModde = !!id;

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

  const handleDeleteOpen = () => {};
  console.log({ errors });

  useEffect(() => {
    //if in Edit mode fetch the parmas ID and set form with values
    if (isEditModde) {
      setLoading(true);
      authClient
        .get(`/api/v1/accounting/products/single?populateKeys=account&id=${id}`)
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
              accountId: data.costPricing.accountId,
              vatRate: data.costPricing.vatRate,
              vatInclusive: data.costPricing.vatInclusive,
            },
            sellingPricing: {
              price: data.sellingPricing.price,
              accountId: data.sellingPricing.accountId,
              vatRate: data.sellingPricing.vatRate,
              vatInclusive: data.sellingPricing.vatInclusive,
            },
            variant: {
              price: data.variant.price,
              name: data.variant.name,
              code: data.variant.code,
              unit: data.variant.unit,
              unitCount: data.variant.unitCount,
            },
            totalStockQuantity: data.totalStockQuantity,
            asOfDate: data.asOfDate,
            accountId: data.accountId,
            lowStockCount: data.lowStockCount,
          };
          reset(fields);
          setLoading(false);
        })
        .catch((error) => setLoading(false));
    }
  }, []);

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

  function createUser(data, e) {
    data.type = 'VARIABLE';
    data.asOfDate = new Date();
    console.log({ data });
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
    data.type = 'VARIABLE';
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

  console.log({ errors });
  console.log('VI', { id, stockId });

  return (
    <>
      <ReturnBtn />
      {true && (
        <AddAdjustmentDialog
          handleDialogClose={handleDialogClose}
          open={isAdjDialogueOpen}
          stockId={stockId}
          productId={id}
          product={product}
        />
      )}
      <form onSubmit={handleSubmit(handleBtnClick)}>
        <div style={{ margin: '3rem 0rem' }}>
          <section>
            <div style={{ width: '57rem' }}>
              <Typography variant="h3" className={classes.title2}>
                Details{' '}
              </Typography>
            </div>
            <section style={{ display: 'grid' }}>
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
                        fullWidth
                        error={!!errors['name']}>
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
                      <FormControl
                        class={classes.InputField}
                        fullWidth
                        error={!!errors['description']}>
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
                        {errors['description'] && (
                          <FormHelperText>
                            {errors['description'].message}
                          </FormHelperText>
                        )}
                      </FormControl>
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
                        fullWidth
                        error={!!errors['vatExempted']}>
                        <Controller
                          name="vatExempted"
                          control={control}
                          render={(props) => (
                            <SelectComp
                              label="VAT Exempted"
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
                        style={{ marginright: '-22px', color: '#00000066' }}
                        title={exemptVAT}>
                        <HelpOutline />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {isEditModde && !showVariationDetail ? (
              <>
                <div
                  style={{
                    margin: '3rem 0 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                  <Typography variant="h3" className={classes.title2}>
                    Variation{' '}
                  </Typography>
                  <Typography
                    variant="h5"
                    onClick={() =>
                      history.push(
                        `/dashboard/product-and-services/products/variables/${id}/adjustment/${stockId}`,
                      )
                    }
                    className={classes.viewStockHistory}>
                    View Stock History
                  </Typography>
                </div>
                <section>
                  <div className={classes.container}>
                    <TypographyBold
                      style={{
                        color: '#0F83EF',
                        fontSize: 14,
                        padding: '.45rem 0',
                      }}>
                      Two (2) Variations registered
                    </TypographyBold>
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
                          {[product].map((row, i) => (
                            <TableRow
                              hover
                              key={i}
                              className={classes.tableRow}>
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
                                    {column.id === 'action' &&
                                    row['accountId'] ? (
                                      <>
                                        <IconButton
                                          onClick={() => handleDeleteOpen()}>
                                          <DeleteForeverOutlined
                                            style={{ color: '#EB5757' }}
                                          />
                                        </IconButton>
                                      </>
                                    ) : column.id == 'productCode' ? (
                                      row.variant?.code
                                    ) : column.id == 'price' ? (
                                      row.variant?.price
                                    ) : column.id == 'stock' ? (
                                      row.variant?.unitCount
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
                    <JurebButton onClick={() => openAdjDialogue(true)}>
                      Adjust Quanitiy on Hand
                    </JurebButton>
                    <JurebButton onClick={() => EditVariationdetail(true)}>
                      Edit Variation Detail
                    </JurebButton>
                  </div>
                </section>
              </>
            ) : (
              <>
                <div style={{ width: '57rem', margin: '3rem 0 0' }}>
                  <Typography variant="h3" className={classes.title2}>
                    Main Item
                  </Typography>
                </div>

                <section style={{ display: 'grid' }}>
                  <div className={classes.container}>
                    <div className={classes.formFields}>
                      <div className={classes.gridWrapper2}>
                        <div className={classes.formFieldWrapper}>
                          <Typography
                            variant="h6"
                            className={classes.formTitle}>
                            Stock Keeping UNIT (SKU):{' '}
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
                            error={!!errors['sku']}>
                            <Controller
                              name="sku"
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
                            {errors['sku'] && (
                              <FormHelperText>
                                {errors['sku'].message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </div>{' '}
                        <div className={classes.formFieldWrapper}>
                          <Typography
                            variant="h6"
                            className={classes.formTitle}>
                            Unit
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
                                  fullWidth
                                  label="unit"
                                  menuItem={[
                                    { label: 'Dozen', value: 'Dozen' },
                                    { label: 'Box', value: 'Box' },
                                    { label: 'Carton', value: 'Carton' },
                                    { label: 'Grams', value: 'Grams' },
                                    {
                                      label: 'Kilogramms',
                                      value: 'Kilogramms',
                                    },
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
                        <div className={classes.formFieldWrapper}>
                          <Typography
                            variant="h6"
                            className={classes.formTitle}>
                            Product Code
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
                        </div>{' '}
                        <div className={classes.formFieldWrapper}>
                          <Typography
                            variant="h6"
                            className={classes.formTitle}>
                            Selling Price:{' '}
                          </Typography>
                        </div>
                        <div
                          style={{
                            gridColumn: '2/8',
                            display: 'flex',
                            alignItems: 'center',
                          }}>
                          {' '}
                          <FormControl
                            class={classes.InputField}
                            fullWidth
                            error={!!errors.sellingPricing?.price}>
                            <Controller
                              name="sellingPricing.price"
                              control={control}
                              render={(props) => (
                                <InputField
                                  placeholder="7.5"
                                  size="small"
                                  fullWidth
                                  naira={'NGN'}
                                  {...props}
                                />
                              )}
                            />
                            {errors.sellingPricing?.price && (
                              <FormHelperText>
                                {errors.sellingPricing?.price.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                          <Tooltip
                            style={{ marginRight: '-22px', color: '#00000066' }}
                            title={exemptVAT}>
                            <HelpOutline />
                          </Tooltip>
                        </div>
                        <div
                          style={{
                            gridColumn: '1/ 8',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <div>
                            {' '}
                            <FormControl
                              class={classes.InputField}
                              fullWidth
                              error={!!errors.sellingPricing?.vatInclusive}>
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
                              {errors.sellingPricing?.vatInclusive && (
                                <FormHelperText>
                                  {errors.sellingPricing?.vatInclusive.message}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </div>
                          <Typography variant="p" className={classes.formTitle}>
                            VAT Inclusive{' '}
                          </Typography>
                        </div>
                        <div className={classes.formFieldWrapper}>
                          <Typography
                            variant="h6"
                            className={classes.formTitle}>
                            Purchase Price:{' '}
                          </Typography>
                        </div>
                        <div
                          style={{
                            gridColumn: '2/8',
                            alignItems: 'center',
                            display: 'flex',
                            alignItems: 'center',
                          }}>
                          <FormControl
                            class={classes.InputField}
                            fullWidth
                            error={!!errors.costPricing?.price}>
                            <Controller
                              control={control}
                              name="costPricing.price"
                              render={(props) => (
                                <InputField
                                  placeholder="7.5"
                                  size="small"
                                  fullWidth
                                  naira={'NGN'}
                                  {...props}
                                />
                              )}
                            />
                            {errors.costPricing?.price && (
                              <FormHelperText>
                                {errors.costPricing?.price.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                          <Tooltip
                            style={{ marginright: '-22px', color: '#00000066' }}
                            title={exemptVAT}>
                            <HelpOutline />
                          </Tooltip>
                        </div>
                        <div
                          style={{
                            gridColumn: '1/ 8',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <div>
                            {' '}
                            <FormControl
                              class={classes.InputField}
                              fullWidth
                              error={!!errors['costPricing.vatInclusive']}>
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
                              {errors['costPricing.vatInclusive'] && (
                                <FormHelperText>
                                  {errors['costPricing.vatInclusive'].message}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </div>
                          <Typography variant="p" className={classes.formTitle}>
                            VAT Inclusive{' '}
                          </Typography>
                        </div>
                        <div className={classes.formFieldWrapper}>
                          <Typography
                            variant="h6"
                            className={classes.formTitle}>
                            Stock In Hand
                          </Typography>
                        </div>
                        <div
                          style={{
                            gridColumn: '2/8',
                            display: 'grid',
                            alignItems: 'center',
                          }}>
                          {' '}
                          <FormControl
                            class={classes.InputField}
                            fullWidth
                            error={!!errors['totalStockQuantity']}>
                            <Controller
                              name="totalStockQuantity"
                              control={control}
                              render={(props) => (
                                <InputField
                                  placeholder="70"
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
                        </div>{' '}
                        <div className={classes.formFieldWrapper}>
                          <Typography
                            variant="h6"
                            className={classes.formTitle}>
                            Low Stock Alert
                          </Typography>
                        </div>
                        <div
                          style={{
                            gridColumn: '2/8',
                            display: 'flex',
                            alignItems: 'center',
                          }}>
                          {' '}
                          <FormControl
                            class={classes.InputField}
                            fullWidth
                            error={!!errors['lowStockCount']}>
                            <Controller
                              name="lowStockCount"
                              control={control}
                              render={(props) => (
                                <InputField
                                  placeholder="10"
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
                            style={{ marginright: '-22px', color: '#00000066' }}
                            title={lowStockAlert}>
                            <HelpOutline />
                          </Tooltip>
                        </div>{' '}
                      </div>
                    </div>
                  </div>
                </section>
                <div style={{ width: '57rem', margin: '3rem 0 0' }}>
                  <Typography variant="h3" className={classes.title2}>
                    Variant{' '}
                  </Typography>
                </div>

                <section style={{ display: 'grid' }}>
                  <div className={classes.container}>
                    <div className={classes.formFields}>
                      <div className={classes.gridWrapper2}>
                        <div className={classes.formFieldWrapper}>
                          <Typography
                            variant="h6"
                            className={classes.formTitle}>
                            Variant Name:{' '}
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
                            error={!!errors.variant?.name}>
                            <Controller
                              name="variant.name"
                              control={control}
                              render={(props) => (
                                <InputField
                                  placeholder="Water (Single)"
                                  size="small"
                                  fullWidth
                                  {...props}
                                />
                              )}
                            />
                            {errors.variant?.name && (
                              <FormHelperText>
                                {errors.variant.name.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </div>
                        <div className={classes.formFieldWrapper}>
                          <Typography
                            variant="h6"
                            className={classes.formTitle}>
                            Unit <span className={classes.required}>*</span>
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
                            error={!!errors.variant?.unit}>
                            <Controller
                              name="variant.unit"
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
                            {errors.variant?.unit && (
                              <FormHelperText>
                                {errors.variant.unit.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </div>
                        <div className={classes.formFieldWrapper}>
                          <Typography
                            variant="h6"
                            className={classes.formTitle}>
                            Product Code:
                          </Typography>
                        </div>
                        <div
                          style={{
                            gridColumn: '2/8',
                            display: 'grid',
                            alignItems: 'center',
                          }}>
                          {' '}
                          <FormControl
                            class={classes.InputField}
                            fullWidth
                            error={!!errors.variant?.code}>
                            <Controller
                              name="variant.code"
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
                            {errors.variant?.code && (
                              <FormHelperText>
                                {errors.variant.code.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </div>
                        <div className={classes.formFieldWrapper}>
                          <Typography
                            variant="h6"
                            className={classes.formTitle}>
                            Price: <span className={classes.required}>*</span>
                          </Typography>
                        </div>
                        <div
                          style={{
                            gridColumn: '2/8',
                            marginBottom: '1rem',
                            alignItems: 'center',
                          }}>
                          <FormControl
                            class={classes.InputField}
                            fullWidth
                            error={!!errors.variant?.price}>
                            <Controller
                              name="variant.price"
                              control={control}
                              render={(props) => (
                                <InputField
                                  fullWidth
                                  placeholder="7.5"
                                  size="small"
                                  naira={'NGN'}
                                  {...props}
                                />
                              )}
                            />{' '}
                            {errors.variant?.price && (
                              <FormHelperText>
                                {errors.variant.price.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </div>
                        <div className={classes.formFieldWrapper}>
                          <Typography
                            variant="h6"
                            className={classes.formTitle}>
                            Total Unit Quanitiy:{' '}
                            <span className={classes.required}>*</span>
                          </Typography>
                        </div>
                        <div
                          style={{
                            gridColumn: '2/2',
                            display: 'flex',
                            alignItems: 'center',
                          }}>
                          <FormControl
                            class={classes.InputField}
                            fullWidth
                            error={!!errors.variant?.unitCount}>
                            <Controller
                              name="variant.unitCount"
                              control={control}
                              render={(props) => (
                                <InputField
                                  placeholder="JX1078"
                                  size="small"
                                  fullWidth
                                  {...props}
                                />
                              )}
                            />{' '}
                            {errors.variant?.unitCount && (
                              <FormHelperText>
                                {errors.variant.unitCount.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                          <Tooltip
                            style={{ marginright: '-22px', color: '#00000066' }}
                            title={exemptVAT}>
                            <HelpOutline />
                          </Tooltip>
                        </div>{' '}
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}
            <div style={{ width: '57rem', margin: '3rem 0 0' }}>
              <Typography variant="h3" className={classes.title2}>
                Account{' '}
              </Typography>
            </div>
            <section style={{ display: 'grid' }}>
              <div className={classes.container}>
                <div className={classes.formFields}>
                  <div className={classes.gridWrapper2}>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Sold Items
                      </Typography>
                    </div>
                    <div
                      style={{
                        gridColumn: '2/8',
                        display: 'grid',
                        alignItems: 'center',
                      }}>
                      {' '}
                      <FormControl
                        class={classes.InputField}
                        fullWidth
                        error={!!errors.sellingPricing?.accountId}>
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
                        {errors.sellingPricing?.accountId && (
                          <FormHelperText>
                            {errors.sellingPricing.accountId.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>{' '}
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Purchased Items
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
                        error={!!errors.costPricing?.accountId}>
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
                        {errors.costPricing?.accountId && (
                          <FormHelperText>
                            {errors.costPricing.accountId.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>{' '}
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Inventory Account{' '}
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
                        error={!!errors.name}>
                        <Controller
                          name="accountId"
                          control={control}
                          render={(props) => (
                            <SelectComp
                              label="inventory"
                              menuItem={[
                                {
                                  label: 'Inventory account',
                                  value: '61a098f420415e0016e7ab84',
                                },
                              ]}
                              input={<SelectInput />}
                              {...props}
                            />
                          )}
                        />
                        {errors.accountId && (
                          <FormHelperText>
                            {errors.accountId.message}
                          </FormHelperText>
                        )}
                      </FormControl>
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
          </section>
        </div>
      </form>
    </>
  );
}
