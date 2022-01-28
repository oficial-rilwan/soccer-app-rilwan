import InputBase from '@material-ui/core/InputBase';
import {
  Typography,
  MenuItem,
  Checkbox,
  Select,
  useMediaQuery,
  IconButton,
} from '@material-ui/core';
import InputField from './EmployeeInpt';
import { useTheme, withStyles } from '@material-ui/core/styles';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import DeductionsDialog from './DeductionsDialog';

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

export default function DeductionsAndCompensation({
  classes,
  handleChange,
  setCheckBox,
  checkbox,
  handleSelectChange,
  values,
  setValues,
}) {
  // State for handling the list of values for the banks
  // when fetched successfully
  const [banks, setBanks] = useState([]);

  // State handler for the new deductions field
  const [data, setData] = useState({
    data: {
      name: '',
      amountType: '',
      amount: '',
    },
    record: [],
  });

  // Endpoint used to fetch all banks in the Country
  // N:B Paystack is provider
  useEffect(() => {
    authClient
      .get('/api/v1/bank-account/banks')
      .then(({ data }) => setBanks(data?.data))
      .catch((e) => console.log(e));
  }, []);

  const theme = useTheme();
  const [compensation, setCompensation] = useState({
    deductions: ['Pension', 'PAYE', 'NHF', 'NHIS'],
    description: '',
  });
  // State handler for the dialog component
  const [dialogOpen, setDialogOpen] = useState(false);

  // Function to open the dialog box to add new deductions
  const handleAddDeductions = () => {
    setData({
      ...data,
      data: {
        ...data.data,
        name: '',
        amount: '',
        amountType: '',
      },
    });
    setDialogOpen(true);
  };

  return (
    <>
      <div style={{ margin: '3rem 0rem, 0rem' }}>
        <div className={classes.contentWrapper}>
          <div style={{ width: '57rem' }}>
            <Typography variant="h3" className={classes.title2}>
              Compensation and Deduction
            </Typography>
          </div>
        </div>
        <section style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={classes.container}>
            <div className={classes.formFields}>
              <div className={classes.gridWrapper2}>
                {values?.data?.employmentType.includes('Full-time') ? (
                  <>
                    <div className={classes.formFieldWrapper}>
                      <Typography variant="h6" className={classes.formTitle}>
                        Annual Salary:
                      </Typography>
                    </div>
                    <div style={{ gridColumn: '2/8' }}>
                      <InputField
                        placeholder="Enter Annual Salary"
                        type="text"
                        size="small"
                        fullWidth
                        value={values?.data?.annualSalary}
                        onChange={handleChange('annualSalary')}
                      />
                    </div>
                  </>
                ) : (
                  ''
                )}
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Bank Name:
                  </Typography>
                </div>
                <div style={{ gridColumn: '2/8' }}>
                  <Select
                    variant="outlined"
                    onChange={handleSelectChange('bankName')}
                    value={values.data.bankName}
                    input={<SelectInput />}
                    MenuProps={{
                      classes: {
                        paper: classes.menuItem,
                      },
                    }}
                    placeholder="Choose Bank"
                    size="small"
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
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Account No:
                  </Typography>
                </div>
                <div style={{ gridColumn: '2/8' }}>
                  <InputField
                    placeholder="Account no"
                    size="small"
                    fullWidth
                    inputProps={{ maxLength: 10 }}
                    onChange={debounce(handleChange('accountNo'), 1500)}
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Account Name:
                  </Typography>
                </div>
                <div style={{ gridColumn: '2/8' }}>
                  <InputField
                    placeholder="Name of Account"
                    type="text"
                    size="small"
                    fullWidth
                    disabled
                    onChange={handleChange('accountName')}
                    value={values.data.accountName || ''}
                  />
                </div>

                <div
                  className={classes.formFieldWrapper}
                  style={{ alignItems: 'flex-start' }}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Deductions:
                  </Typography>
                </div>
                <div style={{ gridColumn: '2/8' }}>
                  {compensation?.deductions?.map((item, i) => (
                    <label
                      key={i}
                      style={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox
                        color="primary"
                        checked={values?.data?.deductions?.includes(item)}
                        onClick={() => {
                          values?.data?.deductions?.includes(item)
                            ? setValues({
                                ...values,
                                data: {
                                  ...values.data,
                                  deductions: values.data.deductions.filter(
                                    (el) => el !== item,
                                  ),
                                },
                              })
                            : setValues({
                                ...values,
                                data: {
                                  ...values.data,
                                  deductions: [...values.data.deductions, item],
                                },
                              });
                        }}
                        onChange={() =>
                          setCheckBox({
                            ...checkbox,
                            [item]: !checkbox?.[item],
                          })
                        }
                      />
                      <Typography
                        variant="h6"
                        className={classes.deductionList}>
                        {item == 'PAYE'
                          ? 'Pay As You Earn (PAYE)'
                          : item == 'NHF'
                          ? 'National Housing Fund (NHF)'
                          : item}
                      </Typography>
                    </label>
                  ))}
                  {data?.record?.map((item, i) => (
                    <label
                      key={i}
                      style={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox
                        color="primary"
                        onClick={() => {
                          values.data.deductionTypes.some(
                            (data) => data.name === item.name,
                          )
                            ? setValues({
                                ...values,
                                data: {
                                  ...values.data,
                                  deductionTypes: values.data.deductionTypes.filter(
                                    (el) => el !== item,
                                  ),
                                },
                              })
                            : setValues({
                                ...values,
                                data: {
                                  ...values.data,
                                  deductionTypes: [
                                    ...values.data.deductionTypes,
                                    item,
                                  ],
                                },
                              });
                        }}
                      />
                      <Typography
                        variant="h6"
                        className={classes.deductionList}>
                        {item.name}
                      </Typography>
                    </label>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={handleAddDeductions}>
                      <AddCircleOutlineIcon style={{ color: '#1F53D7' }} />
                    </IconButton>
                    <TypographyH5 style={{ color: '#1F53D7' }}>
                      Add New Deductions
                    </TypographyH5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <DeductionsDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        data={data}
        setData={setData}
      />
    </>
  );
}
