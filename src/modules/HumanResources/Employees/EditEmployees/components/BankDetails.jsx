import {
  Paper,
  makeStyles,
  Typography,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
  InputBase,
  withStyles,
} from '@material-ui/core';
import { urlConstants } from 'lib/constants';
import { authClient } from 'modules/authentication/requestClient';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { useEffect, useState } from 'react';
import InputField from '../../AddEmployees/components/EmployeeInpt';
import Loader from 'react-loaders';
import { debounce } from 'lodash';

const useStyles = makeStyles((theme) => ({
  container: {
    background: '#FCFFFF',
    borderRadius: '5px',
    border: '0.5px solid #DFDFDF',
    height: 'auto',
    marginLeft: '3rem',
    justifyContent: 'center',
    padding: '2rem',
    [theme.breakpoints.down('xs')]: {
      padding: '1rem',
    },
    [theme.breakpoints.down('md')]: {
      margin: 0,
    },
  },
  formFieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: '2.5rem',
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
  menuItem: {
    height: '14rem',
  },
  loader: {
    textAlign: 'center',
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

export default function BankDetails({ match }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));

  const [values, setValues] = useState({
    data: {
      accountNo: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [banks, setBanks] = useState([]);
  const [progress, setProgress] = useState(false);

  const handleChange = (name) => (e) => {
    let { value } = e.target;
    setValues({ ...values, data: { ...values.data, [name]: value } });
  };

  useEffect(() => {
    setIsLoading(true);
    authClient
      .get(`${urlConstants.EMPLOYEE_DATA}${match?.params?.id}`)
      .then(({ data }) => {
        setValues({
          ...values,
          data: { ...data?.data },
        });
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, [match?.params?.id]);

  const handleSelectChange = (name) => (e) => {
    let { value } = e.target;
    setValues({ ...values, data: { ...values.data, [name]: value } });
  };

  useEffect(() => {
    const handler =
      values?.data?.accountNo &&
      setTimeout(() => {
        authClient
          .post('/api/v1/bank-account/resolve', {
            bankName: values.data.bankName,
            accountNumber: values.data.accountNo,
          })
          .then(({ data }) => {
            setValues({
              ...values,
              data: { ...values.data, accountName: data?.data?.accountName },
            });
          });
      }, 1500);
    return () => clearTimeout(handler);
  }, [values?.data?.accountNo, values.data.bankName]);

  useEffect(() => {
    const handler =
      values?.data?.accountNo &&
      setTimeout(() => {
        authClient
          .get('/api/v1/bank-account/banks')
          .then(({ data }) => setBanks(data?.data))
          .catch((e) => console.log(e));
      }, 1500);
    return () => clearTimeout(handler);
  }, [values?.data?.accountNo]);

  const handleBtnClick = () => {
    setProgress(true);
    authClient
      .put(
        `/api/v1/employee/update?employeeId=${match?.params?.id}`,
        values?.data,
      )
      .then((res) =>
        res?.status == 200 || 201
          ? (setProgress(false),
            setValues({
              ...values,
              data: {
                ...values.data,
                accountNo: '',
                bankName: '',
                accountName: '',
              },
            }))
          : null,
      )
      .catch((e) => console.log(e));
  };

  return (
    <>
      {isLoading ? (
        <div className={classes.loader}>
          <Loader type="line-scale" color="#2F49D0" />
        </div>
      ) : (
        <Paper elevation={0} className={classes.container}>
          <TypographyBold style={{ fontSize: 18 }}>
            Enter Bank Details
          </TypographyBold>
          <div
            style={{
              display: 'flex',
              justifyContent: matchesXs ? 'flex-start' : 'center',
              margin: 15,
              flexWrap: 'wrap',
              flexDirection: matchesXs ? 'column' : 'row',
            }}>
            <div className={classes.formFieldWrapper}>
              <Typography variant="h6" className={classes.formTitle}>
                Account No:
                <span className={classes.required}>*</span>
              </Typography>
            </div>
            <div style={{ gridColumn: '2/8' }}>
              <InputField
                placeholder="Account no"
                size="small"
                style={{ position: 'relative', left: matchesXs ? 0 : 11 }}
                fullWidth
                value={values?.data?.accountNo}
                inputProps={{ maxLength: 10 }}
                onChange={handleChange('accountNo')}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: matchesXs ? 'flex-start' : 'center',
              margin: 15,
              flexWrap: 'wrap',
              flexDirection: matchesXs ? 'column' : 'row',
            }}>
            <div
              className={classes.formFieldWrapper}
              style={{ marginRight: '4.5rem' }}>
              <Typography variant="h6" className={classes.formTitle}>
                Bank Name:
                <span className={classes.required}>*</span>
              </Typography>
            </div>
            <div
              style={{
                gridColumn: '2/8',
                position: 'relative',
                right: matchesXs ? 0 : 22,
              }}>
              <Select
                variant="outlined"
                onChange={handleSelectChange('bankName')}
                value={values?.data?.bankName}
                input={<SelectInput />}
                MenuProps={{
                  classes: {
                    paper: classes.menuItem,
                  },
                }}
                style={{ width: matchesXs ? '100%' : '120%' }}
                fullWidth
                displayEmpty>
                <MenuItem disabled value="" style={{ padding: '.5rem' }}>
                  <em>Choose Bank</em>
                </MenuItem>
                {banks &&
                  banks?.map((bank, i) => (
                    <MenuItem
                      value={bank?.name}
                      key={i}
                      style={{ padding: '.5rem' }}>
                      {bank?.name}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: matchesXs ? 'flex-start' : 'center',
              gap: '0 2rem',
              margin: '15px',
              flexWrap: 'wrap',
              flexDirection: matchesXs ? 'column' : 'row',
            }}>
            <div
              className={classes.formFieldWrapper}
              style={{ marginRight: '2.4rem' }}>
              <Typography variant="h6" className={classes.formTitle}>
                Account Name:
                <span className={classes.required}>*</span>
              </Typography>
            </div>
            <div style={{ gridColumn: '2/8' }}>
              <InputField
                size="small"
                value={values?.data?.accountName}
                onChange={handleChange('accountName')}
                fullWidth
                disabled
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <PrimaryButton
              style={{ width: 'auto' }}
              onClick={handleBtnClick}
              disabled={progress}>
              Save
            </PrimaryButton>
          </div>
        </Paper>
      )}
    </>
  );
}
