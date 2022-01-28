import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import backendUrl from '../../../../.config';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  Avatar,
  FormControl,
  FormHelperText,
  InputAdornment,
  MenuList,
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import userActions from '../../../../redux/actions/userActions';
import camera from 'lib/assets/images/camera.png';
import { ReactComponent as ArrowUp } from 'lib/assets/icons/arrowup.svg';
import InputComp from 'lib/components/InputComp';
import NaijaStates from 'naija-state-local-government';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loaders';
import SelectComp from '../components/SelectCOmp';
import { HireDateInput } from 'modules/components/DatePickers/Date';
import { GridContainer, GridItem } from 'modules/components/Grid';
import { profileFormData } from 'site-constants';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  uploadContainer: {
    padding: '.7rem 2.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  logoBox: {
    height: '80px',
    width: '80px',
    borderRadius: '50%',
    background: '#474747',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '.8rem',
  },
  logoBox2: {
    height: '80px',
    width: '80px',
    borderRadius: '50%',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '11px',
  },
  contentSection: {
    margin: '1rem 3rem',
    [theme.breakpoints.down('sm')]: {
      margin: '.7rem .3rem',
    },
  },
  formContainer: {
    padding: '.7rem 2.5rem',
    [theme.breakpoints.down('xs')]: {
      padding: '0px',
    },
  },
  gridForm: {
    display: 'grid',
    justifyContent: 'space-between',
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: '.7rem',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  gridForm2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '.4rem',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  selectInput: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ccc',
    },
  },
  notched: {
    '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
      borderColor: '#F5F6F8',
    },
  },
  businessNotched: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#F5F6F8',
    },
  },
  large: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
  camera: {
    width: 'auto',
    height: 18,
    borderRadius: 0,
  },
}));

const sectors = [
  { title: 'Accounting & Consultancy' },
  { title: 'Advertising & Public Relations' },
  { title: 'Aerospace & Defence' },
  { title: 'Automotive' },
  { title: 'Banking & Credit' },
  { title: 'Basic Industries' },
  { title: 'Business & Consumer Services' },
  { title: 'Chemicals' },
  { title: 'Construction & Engineering' },
  { title: 'Consumer Industries' },
  { title: 'Education' },
  { title: 'Environment & Waste Management' },
  { title: 'Government' },
  { title: 'Healthcare' },
  { title: 'Insurance' },
  { title: 'Law Firm' },
  {
    title: 'Media & Information',
  },
  { title: 'Metals & Mining' },
  { title: 'Not For Profit' },
  { title: 'Oil & Gas' },
  { title: 'Pharmaceuticals & BioTech' },
  { title: 'Property' },
  { title: 'Retail & Leisure' },
  { title: 'Securities & Investment' },
  { title: 'Technology' },
  { title: 'Telecoms' },
  { title: 'Transport' },
  { title: 'Utilities' },
];

let businessData = [
  'Incorporated Trustee',
  'Limited by Guarantee',
  'Partnership',
  'Private Limited Company',
  'Private Unlimited Company',
  'Public Limited Company',
  'Sole Proprietorship',
  'Cooperative Societies /Trade Associations',
];

export default function ProfileInformation({ nextView, setUserDetails }) {
  const dispatch = useDispatch();
  const { update } = userActions;
  const UserData = useSelector((state) => state?.auth);
  const GoogleData = useSelector((state) => state?.loginStats);

  // Form Data///////////////////////////////////
  const { schema } = profileFormData;

  const {
    handleSubmit,
    errors,
    setError,
    control,
    watch,
    formState: { isSubmitting, isValid },
    setValue,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema()),
    defaultValues: {
      businessName: '',
      businessType: '',
      country: '',
      state: '',
      lga: '',
    },
  });
  console.log(isSubmitting);

  const watchState = watch(['state']);
  const watchBusiness = watch('businessType');
  const watchNumber = watch('number');
  const watchCity = watch('city');
  const watchStreet = watch('street');

  const businessMap = {
    'Incorporated Trustee': 'CAC/IT',
    'Limited by Guarantee': 'RC',
    Partnership: 'BN',
    'Private Limited Company': 'RC',
    'Private Unlimited Company': 'RC',
    'Public Limited Company': 'RC',
    'Sole Proprietorship': 'BN',
    'Cooperative Societies /Trade Associations': 'CAC/IT',
  };

  useEffect(() => {
    setValue('lga', '');
  }, [watchState]);

  const menuList = [
    {
      label: 'Nigeria',
      value: 'Nigeria',
    },
  ];

  // Form Data Ends///////////////////////////////////

  // useEffect(() => {
  //   if (UserData.nextTab == 'Complete') {
  //     nextView('Complete-Profile');
  //   }
  // }, [UserData.nextTab, GoogleData.nextTab]);

  //id:61f3e28e8bd919001d0955a0
  // ownerAccountId: '61f3d0d08bd919001d095594';

  // Submit Form///////////////////////////////////
  const [formError, setFormError] = useState('');
  const history = useHistory();
  const token = JSON.parse(localStorage.getItem('jureb-user-token'));

  const handleClick = async (data, e) => {
    console.log(data, token);
    const businessData = {
      name: data?.businessName,
      type: data?.businessType,
      registrationNumber: data?.registrationNumber,
      dateOfIncorporation: data?.dateOfIncorporation.toGMTString(),
      startDate: data?.businessStartDate.toGMTString(),
      phone: data.phone ? data.phone : '',
      sector: data?.businessSector,
      address: {
        houseNo: data?.number,
        street: data?.street,
        city: data?.city,
        lga: data?.lga,
        state: data?.state,
        country: data?.country,
      },
    };
    console.log(businessData);
    try {
      const res = await axios.post(
        `${backendUrl.baseUrl}/api/v1/user/cp/account/organizations`,
        businessData,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      res && history.push('/plans');
      console.log(res);
    } catch (error) {
      console.log(error?.response?.data);
      console.log(error);
      setFormError(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    formError && window.scroll(0, 0);
  }, [formError]);
  // Submit Form Ends///////////////////////////////////
  const classes = useStyles();

  // const businessType = watch(['businessType']);

  return (
    <>
      {UserData?.isLoading || GoogleData?.isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '42rem',
            textAlign: 'center',
          }}>
          <Loader type="line-scale" color="#2F49D0" />
        </div>
      ) : (
        <section className={classes.contentSection}>
          <Typography
            variant="h5"
            style={{ textAlign: 'center', padding: '.5rem 0' }}>
            We need some profile information to complete your account
          </Typography>
          <form onSubmit={handleSubmit(handleClick)}>
            <div className={classes.uploadContainer}>
              <div className={classes.logoBox}>
                <Avatar src={camera} className={classes.camera} alt="photo" />
              </div>
              <input
                accept=".jpg,.png"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                name="logo"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  disableElevation
                  color="primary"
                  component="span">
                  <span
                    style={{ display: 'inline-block', marginRight: '10px' }}>
                    Upload Logo
                  </span>{' '}
                  <ArrowUp />
                </Button>
              </label>
            </div>
            {formError && (
              <Alert style={{ marginBottom: '1rem' }} severity="error">
                {formError}
              </Alert>
            )}
            <div className={classes.formContainer}>
              <Controller
                name="businessName"
                control={control}
                render={(props) => {
                  const { ref } = props;
                  return (
                    <InputComp
                      required
                      label="Name Of Business"
                      placeholder="Enter the full name of business"
                      fullWidth
                      name="businessName"
                      error={!!errors['businessName']}
                      helperText={errors['businessName']?.message}
                      inputRef={ref}
                      {...props}
                    />
                  );
                }}
              />

              <Typography variant="h6">
                Type of Business
                <span
                  style={{
                    color: '#ed1818',
                    top: '2px',
                    position: 'relative',
                    left: '4px',
                  }}>
                  *
                </span>
              </Typography>
              <FormControl fullWidth error={!!errors['businessType']}>
                <Controller
                  name="businessType"
                  control={control}
                  noRef={true}
                  render={(props) => (
                    <Select
                      variant="outlined"
                      displayEmpty
                      className={classes.selectInput}
                      // inputRef={props?.ref}
                      {...props}>
                      <MenuItem value="" disabled style={{ padding: '.5rem' }}>
                        <em style={{ color: '#ababab' }}>Select Business</em>
                      </MenuItem>
                      {businessData.map((business, i) => (
                        <MenuItem
                          value={business}
                          key={i}
                          style={{ padding: '.5rem' }}>
                          {business}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                {errors['businessType'] && (
                  <FormHelperText>
                    {errors['businessType'].message}
                  </FormHelperText>
                )}
              </FormControl>
              <div>
                <Controller
                  name="registrationNumber"
                  control={control}
                  render={(props) => (
                    <InputComp
                      required
                      label="Registration Number"
                      registration={businessMap[watchBusiness]}
                      fullWidth
                      placeholder="123XXX"
                      name="registrationNumber"
                      error={!!errors['registrationNumber']}
                      inputRef={props?.ref}
                      helperText={errors['registrationNumber']?.message}
                      {...props}
                    />
                  )}
                />
              </div>
              <div className={classes.gridForm}>
                <div>
                  <Typography component="h6">
                    Date of incorporation
                    <span
                      style={{
                        color: '#ed1818',
                        position: 'relative',
                        top: 2,
                        left: 4,
                      }}></span>
                  </Typography>
                  <Controller
                    // rules={{
                    // false, //b usinessType.businessType === 'Sole Proprietorship',
                    //  validate: () => false,
                    // businessType.businessType != 'Sole Proprietorship',
                    //  }}
                    name="dateOfIncorporation"
                    control={control}
                    rules={{ validate: () => false }}
                    render={(props) => (
                      <HireDateInput
                        required={false}
                        // error={!!errors['dateOfIncorporation']}
                        fullWidth
                        size="medium"
                        disableFuture
                        inputRef={props?.ref}
                        font
                        // helperText={errors['dateOfIncorporation']?.message}
                        {...props}
                      />
                    )}
                  />
                </div>
                <div>
                  <Typography component="h6">
                    Business Start Date
                    <span
                      style={{
                        color: '#ed1818',
                        position: 'relative',
                        top: 2,
                        left: 4,
                      }}></span>
                  </Typography>
                  <Controller
                    name="businessStartDate"
                    control={control}
                    rules={{ validate: () => false }}
                    render={(props) => (
                      <HireDateInput
                        required={false}
                        fullWidth
                        size="medium"
                        font
                        disableFuture
                        // error={!!errors['businessStartDate']}
                        inputRef={props?.ref}
                        // helperText={errors['businessStartDate']?.message}
                        {...props}
                      />
                    )}
                  />
                </div>
              </div>
              <Typography variant="h6">
                Business Sector
                <span
                  style={{
                    color: '#ed1818',
                    top: '2px',
                    position: 'relative',
                    left: '4px',
                  }}>
                  *
                </span>
              </Typography>
              <FormControl fullWidth error={!!errors['country']}>
                <Controller
                  name="businessSector"
                  control={control}
                  noRef={true}
                  render={(props) => (
                    <Select
                      variant="outlined"
                      displayEmpty
                      className={classes.selectInput}
                      // inputRef={props?.ref}
                      {...props}>
                      <MenuItem value="" disabled style={{ padding: '.5rem' }}>
                        <em style={{ color: '#ababab' }}>Select Sector</em>
                      </MenuItem>
                      {sectors.map((business, i) => (
                        <MenuItem
                          value={business.title}
                          key={i}
                          style={{ padding: '.5rem' }}>
                          {business.title}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />

                {errors['businessSector'] && (
                  <FormHelperText>
                    {errors['businessSector'].message}
                  </FormHelperText>
                )}
              </FormControl>

              <GridContainer>
                <GridItem xs={12} sm={3}>
                  <Controller
                    name="number"
                    control={control}
                    render={(props) => {
                      return (
                        <InputComp
                          required={true}
                          label="Number"
                          placeholder="444"
                          fullWidth
                          name="number"
                          type="number"
                          error={!!errors['number']}
                          helperText={errors['number']?.message}
                          inputRef={props?.ref}
                          {...props}
                        />
                      );
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={5}>
                  <Controller
                    name="street"
                    control={control}
                    render={(props) => {
                      return (
                        <InputComp
                          required={true}
                          label="Street"
                          placeholder="ParkView Estate"
                          fullWidth
                          name="street"
                          error={!!errors['street']}
                          helperText={errors['street']?.message}
                          inputRef={props?.ref}
                          {...props}
                        />
                      );
                    }}
                  />
                </GridItem>

                <GridItem xs={12} sm={4}>
                  <Controller
                    name="city"
                    control={control}
                    render={(props) => {
                      return (
                        <InputComp
                          required={true}
                          placeholder="Ugeli"
                          label="City"
                          fullWidth
                          name="city"
                          error={!!errors['city']}
                          helperText={errors['city']?.message}
                          inputRef={props?.ref}
                          {...props}
                        />
                      );
                    }}
                  />
                </GridItem>
              </GridContainer>
              <div className={classes.gridForm2}>
                <FormControl fullWidth error={!!errors['phone']}>
                  <Controller
                    name="phone"
                    control={control}
                    render={(props) => {
                      return (
                        <InputComp
                          placeholder="Phone Number"
                          label="Telephone Number"
                          fullWidth
                          required={true}
                          name="phone"
                          error={!!errors['phone']}
                          inputProps={{ maxLength: 11 }}
                          helperText={errors['phone']?.message}
                          inputRef={props?.ref}
                          {...props}
                        />
                      );
                    }}
                    rules={{
                      required: true,
                    }}
                  />
                </FormControl>

                <FormControl
                  fullWidth
                  style={{ padding: '.4rem 0' }}
                  error={!!errors['country']}>
                  <Typography variant="h6">
                    Country
                    <span
                      style={{
                        color: '#ed1818',
                        top: '2px',
                        position: 'relative',
                        left: '4px',
                      }}>
                      *
                    </span>
                  </Typography>
                  <Controller
                    name="country"
                    control={control}
                    noRef={true}
                    render={(props) => (
                      <Select
                        variant="outlined"
                        displayEmpty
                        className={classes.selectInput}
                        // inputRef={props?.ref}
                        {...props}>
                        <MenuItem
                          value=""
                          disabled
                          style={{ padding: '.5rem' }}>
                          <em style={{ color: '#ababab' }}>Country</em>
                        </MenuItem>
                        {menuList.map((business, i) => (
                          <MenuItem
                            value={business.label}
                            key={i}
                            style={{ padding: '.5rem' }}>
                            {business.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors['country']?.message && (
                    <FormHelperText>{errors['country'].message}</FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  fullWidth
                  error={!!errors['state']}
                  helperText={errors['state']?.message}>
                  <Typography variant="h6">
                    State
                    <span
                      style={{
                        color: '#ed1818',
                        top: '2px',
                        position: 'relative',
                        left: '4px',
                      }}>
                      *
                    </span>
                  </Typography>
                  <Controller
                    name="state"
                    noRef={true}
                    control={control}
                    render={(props) => (
                      <Select
                        labelId="state-label"
                        variant="outlined"
                        displayEmpty
                        className={classes.selectInput}
                        fullWidth
                        // inputRef={props?.ref}
                        {...props}>
                        <MenuItem disabled value="">
                          <em style={{ color: '#ababab' }}>State (Abia)</em>
                        </MenuItem>
                        {NaijaStates.states().map((state, i) => (
                          <MenuItem
                            key={i}
                            value={state}
                            style={{ padding: '.5rem' }}>
                            {state}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />

                  {errors['state']?.message && (
                    <FormHelperText>{errors['state'].message}</FormHelperText>
                  )}
                </FormControl>
                <FormControl
                  fullWidth
                  error={!!errors['lga']}
                  helperText={errors['lga']?.message}>
                  <Typography variant="h6">
                    Local Government Area
                    <span
                      style={{
                        color: '#ed1818',
                        top: '2px',
                        position: 'relative',
                        left: '4px',
                      }}>
                      *
                    </span>
                  </Typography>
                  <Controller
                    name="lga"
                    control={control}
                    noRef={true}
                    render={(props) => (
                      <Select
                        labelId="lga-label"
                        variant="outlined"
                        displayEmpty
                        className={classes.selectInput}
                        fullWidth
                        {...props}>
                        <MenuItem disabled value="">
                          <em style={{ color: '#ababab' }}>Select LGA</em>
                        </MenuItem>
                        {NaijaStates.lgas(watchState?.state || 'Abia').lgas.map(
                          (lga, i) => (
                            <MenuItem
                              key={i}
                              value={lga || ''}
                              style={{ padding: '.5rem' }}>
                              {lga}
                            </MenuItem>
                          ),
                        )}
                      </Select>
                    )}
                  />

                  {errors['lga']?.message && (
                    <FormHelperText>{errors['lga'].message}</FormHelperText>
                  )}
                </FormControl>
              </div>

              <Button
                variant="contained"
                color="primary"
                disableElevation
                fullWidth
                style={{
                  marginTop: '1.5rem',
                  borderRadius: '3px',
                  lineHeight: '1.9',
                }}
                type="submit">
                Finish Setup
              </Button>
              <Typography
                variant="h6"
                style={{ textAlign: 'center', marginTop: '1rem' }}>
                By submitting this form, I agree that Jureb APT may contact me
                to help me complete the creation of my account.
              </Typography>
            </div>
          </form>
        </section>
      )}
    </>
  );
}
