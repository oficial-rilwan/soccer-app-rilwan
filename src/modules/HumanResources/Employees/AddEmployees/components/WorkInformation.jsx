import { MenuItem, Select, Typography } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import InputField from './EmployeeInpt';
import { withStyles } from '@material-ui/core/styles';
import { HireDateInput } from 'modules/components/DatePickers/Date';
import InputComponent from './InputComponent';

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

export default function WorkInformation({
  handleChange,
  handleSelectChange,
  values,
  classes,
  handleHireChange,
  anchorEl,
  setAnchorEl,
  handlePopClose,
}) {
  return (
    <>
      <div style={{ margin: '3rem 0rem' }}>
        <div className={classes.contentWrapper}>
          <div style={{ width: '57rem' }}>
            <Typography variant="h3" className={classes.title2}>
              Work Information
            </Typography>
          </div>
        </div>
        <section style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={classes.container}>
            <div className={classes.formFields}>
              <div className={classes.gridWrapper2}>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Employee ID:
                  </Typography>
                </div>
                <div style={{ gridColumn: '2/8' }}>
                  <InputField
                    value={values.data.employeeID}
                    size="small"
                    random
                    fullWidth
                    disabled
                    InputProps={{
                      classes: {
                        root: classes.random,
                      },
                    }}
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Manager:
                  </Typography>
                </div>
                <div style={{ gridColumn: '2/8' }}>
                  <InputField
                    placeholder="Manager name"
                    size="small"
                    onChange={handleChange('employeeManager')}
                    fullWidth
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Department:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: '2/8' }}>
                  <InputField
                    placeholder="Enter Department"
                    size="small"
                    onChange={handleChange('department')}
                    fullWidth
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Designation:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: '2/8' }}>
                  <InputField
                    placeholder="Enter Designation"
                    size="small"
                    onChange={handleChange('designation')}
                    fullWidth
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Employment Type:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: '2/8' }}>
                  <SelectComp
                    label="employment"
                    menuItem={[
                      { label: 'Full-time', value: 'Full-time' },
                      { label: 'Contract', value: 'Contract' },
                      { label: 'Part-time', value: 'Part-time' },
                    ]}
                    handleSelectChange={handleSelectChange('employmentType')}
                    input={<SelectInput />}
                    value={values.data.employmentType}
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Date Of Hire:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: '2/8' }}>
                  <HireDateInput
                    handleDateChange={handleHireChange}
                    value={values?.data?.dateOfHire}
                  />
                </div>
                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Work Location:
                    <span className={classes.required}>*</span>
                  </Typography>
                </div>
                <div style={{ gridColumn: '2/8' }}>
                  <InputComponent
                    placeholder="Enter work location"
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    value={values.data.workLocation}
                    handleChange={handleChange('workLocation')}
                    handlePopClose={handlePopClose}
                  />
                </div>

                <div className={classes.formFieldWrapper}>
                  <Typography variant="h6" className={classes.formTitle}>
                    Vacation Policy:
                  </Typography>
                </div>
                <div style={{ gridColumn: '2/8' }}>
                  <Select
                    variant="outlined"
                    onChange={handleSelectChange('vacationPolicy')}
                    value={values.data.vacationPolicy}
                    input={<SelectInput />}
                    fullWidth
                    displayEmpty>
                    <MenuItem disabled value="" style={{ padding: '.5rem' }}>
                      <em>Select policy</em>
                    </MenuItem>
                    <MenuItem
                      value={'7 working days a year'}
                      style={{ padding: '.5rem' }}>
                      7 working days a year
                    </MenuItem>
                    <MenuItem
                      value={'14 working days a year'}
                      style={{ padding: '.5rem' }}>
                      14 working days a year
                    </MenuItem>
                    <MenuItem
                      value={'21 working days a year'}
                      style={{ padding: '.5rem' }}>
                      21 working days a year
                    </MenuItem>
                    <MenuItem
                      value={'28 working days a year'}
                      style={{ padding: '.5rem' }}>
                      28 working days a year
                    </MenuItem>
                    <MenuItem
                      value={'30 working days a year'}
                      style={{ padding: '.5rem' }}>
                      30 working days a year
                    </MenuItem>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
