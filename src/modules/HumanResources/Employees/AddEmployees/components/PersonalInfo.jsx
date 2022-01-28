import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  Select,
  MenuItem,
  InputBase,
  Paper,
  Avatar,
  Checkbox,
} from '@material-ui/core';
import NaijaStates from 'naija-state-local-government';
import InputField from './EmployeeInpt';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import { BirthDateInput } from 'modules/components/DatePickers/Date';
import { useRef } from 'react';
const menuList = [
  {
    value: 'male',
    label: 'Male',
  },
  {
    value: 'female',
    label: 'Female',
  },
];

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

export default function PersonalInfo({
  values,
  classes,
  handleChange,
  handleSelectChange,
  handleInputChange,
  matchesXs,
  setValues,
  handleBirthChange,
}) {
  const fileInput = useRef();

  return (
    <>
      <section style={{ display: 'flex', justifyContent: 'center' }}>
        <Paper className={classes.container} elevation={0}>
          <div className={classes.formFields}>
            <div className={classes.employeeImgWrapper}>
              <input
                accept=".jpg,.png"
                type="file"
                style={{ display: 'none' }}
                ref={fileInput}
                onChange={handleInputChange('image')}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}>
                <Avatar className={classes.large} src={values?.checkImage} />
              </div>
              <Button
                onClick={() => fileInput.current.click()}
                variant="contained"
                color="primary"
                disableElevation
                className={classes.upload}>
                Upload Image
              </Button>
            </div>
            <div
              style={{
                display: matchesXs ? 'block' : 'grid',
                gridTemplateColumns: 'repeat(2,1fr)',
                gap: '1rem 2rem',
              }}>
              <div className={classes.formFieldWrapper}>
                <Typography variant="h6" className={classes.formTitle}>
                  First Name:
                  <span className={classes.required}>*</span>
                </Typography>
              </div>
              <div className={classes.halfGrid}>
                <InputField
                  placeholder="First name"
                  size="small"
                  fullWidth
                  onChange={handleChange('firstName')}
                />
              </div>
              <div className={classes.formFieldWrapper}>
                <Typography variant="h6" className={classes.formTitle}>
                  Middle Name:
                </Typography>
              </div>
              <div className={classes.halfGrid}>
                <InputField
                  placeholder="Middle name"
                  size="small"
                  fullWidth
                  onChange={handleChange('middleName')}
                />
              </div>
            </div>
            <div className={classes.gridWrapper}>
              <div className={classes.formFieldWrapper}>
                <Typography variant="h6" className={classes.formTitle}>
                  Last Name:
                  <span className={classes.required}>*</span>
                </Typography>
              </div>
              <div className={classes.halfGrid}>
                <InputField
                  placeholder="Last name"
                  size="small"
                  onChange={handleChange('lastName')}
                  fullWidth
                />
              </div>
              <div className={classes.formFieldWrapper}>
                <Typography variant="h6" className={classes.formTitle}>
                  Date Of Birth:
                  <span className={classes.required}>*</span>
                </Typography>
              </div>
              <div className={classes.halfGrid}>
                <BirthDateInput
                  value={values?.data?.dateOfBirth}
                  handleDateChange={handleBirthChange}
                  maxDate
                />
              </div>
              <div className={classes.formFieldWrapper}>
                <Typography variant="h6" className={classes.formTitle}>
                  Phone number:
                  <span className={classes.required}>*</span>
                </Typography>
              </div>
              <div className={classes.halfGrid}>
                <InputField
                  placeholder="080XXXXXXXX"
                  size="small"
                  inputProps={{ maxLength: 11 }}
                  fullWidth
                  onChange={handleChange('phone')}
                />
              </div>
              <div className={classes.formFieldWrapper}>
                <Typography variant="h6" className={classes.formTitle}>
                  Mobile 2:
                </Typography>
              </div>
              <div className={classes.halfGrid}>
                <InputField
                  placeholder="080XXXXXXXX"
                  size="small"
                  inputProps={{ maxLength: 11 }}
                  fullWidth
                  onChange={handleChange('mobile')}
                />
              </div>
              <div className={classes.formFieldWrapper}>
                <Typography variant="h6" className={classes.formTitle}>
                  Gender:
                  <span className={classes.required}>*</span>
                </Typography>
              </div>
              <div className={classes.halfGrid}>
                <SelectComp
                  label="Gender"
                  menuItem={menuList}
                  input={<SelectInput />}
                  handleSelectChange={handleSelectChange('gender')}
                  value={values.data.gender}
                  style={{ height: '2.4rem', backgroundColor: '#fff' }}
                />
              </div>
              <div
                className={classes.formFieldWrapper}
                style={matchesXs ? { marginTop: '.5rem' } : {}}>
                <Typography variant="h6" className={classes.formTitle}>
                  NIN:
                </Typography>
              </div>
              <div className={classes.halfGrid}>
                <InputField
                  placeholder="Enter NIN"
                  size="small"
                  fullWidth
                  onChange={handleChange('NIN')}
                />
              </div>
              <div className={classes.formFieldWrapper}>
                <Typography variant="h6" className={classes.formTitle}>
                  TIN:
                </Typography>
              </div>
              <div className={classes.halfGrid}>
                <InputField
                  placeholder="Enter TIN"
                  size="small"
                  onChange={handleChange('TIN')}
                  fullWidth
                />
              </div>
              <div className={classes.formFieldWrapper}>
                <Typography variant="h6" className={classes.formTitle}>
                  Home Address:
                  <span className={classes.required}>*</span>
                </Typography>
              </div>
              <div className={classes.halfGrid}>
                <div style={{ display: 'flex' }}>
                  <InputField
                    placeholder="House no"
                    size="small"
                    style={{ padding: 0, margin: 0 }}
                    onChange={handleChange('no')}
                    InputProps={{
                      className: classes.addressField,
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                  />
                  <InputField
                    placeholder="Street"
                    size="small"
                    fullWidth
                    style={{ padding: 0, margin: 0 }}
                    InputProps={{
                      className: classes.addressField,
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                    onChange={handleChange('street')}
                  />
                  <InputField
                    placeholder="City"
                    size="small"
                    style={{ padding: 0, margin: 0 }}
                    InputProps={{
                      className: classes.addressField,
                      classes: {
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                    onChange={handleChange('city')}
                  />
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2,1fr)',
                  }}>
                  <Select
                    variant="outlined"
                    onChange={handleSelectChange('state')}
                    value={values.data.state}
                    input={
                      <SelectInput classes={{ input: classes.selectInput }} />
                    }
                    fullWidth
                    displayEmpty>
                    <MenuItem disabled value="" style={{ padding: '.5rem' }}>
                      <em>State (Abia)</em>
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

                  <Select
                    variant="outlined"
                    onChange={handleSelectChange('lga')}
                    value={values.data.lga}
                    input={
                      <SelectInput classes={{ input: classes.selectInput }} />
                    }
                    fullWidth
                    displayEmpty>
                    <MenuItem disabled value="" style={{ padding: '.5rem' }}>
                      <em>L.G.A</em>
                    </MenuItem>
                    {NaijaStates.lgas(
                      values.data.state ? values.data.state : 'Abia',
                    ).lgas.map((lga, i) => (
                      <MenuItem
                        key={i}
                        value={lga}
                        style={{ padding: '.5rem' }}>
                        {lga}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className={classes.formFieldWrapper}>
                <Typography variant="h6" className={classes.formTitle}>
                  Email:
                  <span className={classes.required}>*</span>
                </Typography>
              </div>
              <div className={classes.halfGrid}>
                <InputField
                  placeholder="Email address"
                  size="small"
                  fullWidth
                  onChange={handleChange('email')}
                />
              </div>
              <div
                className={classes.formFieldWrapper}
                style={{ gridColumn: '2/8' }}>
                <label
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                  <Checkbox
                    color="primary"
                    onClick={() =>
                      setValues({
                        ...values,
                        data: {
                          ...values.data,
                          inviteButton: !values.data.inviteButton,
                        },
                      })
                    }
                  />
                  <Typography variant="h6" className={classes.footerText}>
                    Invite employee to onboard and enter their information.
                  </Typography>
                </label>
              </div>
              <div className={classes.formFieldWrapper}>
                <Typography variant="h6" className={classes.formTitle}>
                  Next of Kin:
                </Typography>
              </div>
              <div className={classes.halfGrid}>
                <InputField
                  placeholder="Next of Kin"
                  size="small"
                  onChange={handleChange('nextOfKin')}
                  fullWidth
                />
              </div>
              <div className={classes.formFieldWrapper}>
                <Typography variant="h6" className={classes.formTitle}>
                  Next of Kin Phone No:
                </Typography>
              </div>
              <div className={classes.halfGrid}>
                <InputField
                  size="small"
                  onChange={handleChange('nextOfKinPhone')}
                  inputProps={{
                    maxLength: 11,
                  }}
                  fullWidth
                />
              </div>
              <div className={classes.formFieldWrapper}>
                <Typography variant="h6" className={classes.formTitle}>
                  Relationship with Next of Kin:
                </Typography>
              </div>
              <div className={classes.halfGrid}>
                <InputField
                  size="small"
                  onChange={handleChange('nextOfKinRelationship')}
                  fullWidth
                />
              </div>
            </div>
          </div>
        </Paper>
      </section>
    </>
  );
}
