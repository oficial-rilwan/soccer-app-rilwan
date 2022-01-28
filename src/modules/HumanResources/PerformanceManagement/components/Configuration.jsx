import {
  Button,
  Checkbox,
  InputAdornment,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { CheckSharp, Search } from '@material-ui/icons';
import { urlConstants } from 'lib/constants';
import { authClient } from 'modules/authentication/requestClient';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { MaterialDatePicker } from 'modules/components/DatePickers/Date';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import InputForEmployeePage from 'modules/HumanResources/Employees/AddEmployees/components/EmployeeInpt';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  formFieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      margin: '.7rem 0',
      justifyContent: 'flex-start',
    },
  },
  typo: {
    fontSize: 15,
  },
  paragraph: {
    color: '#404040',
    fontFamily: 'Rubik',
    fontSize: 14,
  },
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '2rem',
    borderRadius: '5px',
    marginBottom: '2rem',
    [theme.breakpoints.down('xs')]: {
      padding: '.6rem',
    },
  },
  employeeTags: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 40,
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      minWidth: 168,
    },
  },
  checkBox: {
    [theme.breakpoints.down('xs')]: {
      margin: '0 10px',
    },
  },
}));

const CheckBtn = withStyles({
  root: {
    border: '1px solid #010A1B',
    backgroundColor: '#fff',
    borderRadius: 24,
    textTransform: 'none',
    fontFamily: 'Rubik',
    color: '#010A1B',
    fontSize: 14,
    fontWeight: 'normal',
    padding: '.5rem 1rem',
  },
})(Button);

export default function Configuration({ setProgress }) {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();

  const [employeesContent, setEmployeesContent] = useState({
    data: [],
    employeesData: [],
    name: '',
    startDate: '',
    endDate: '',
    periodicity: '',
    static: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state?.auth);
  const userId = useSelector((state) => state?.loginStats?.user?.userId);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);

  useEffect(() => {
    setIsLoading(true);
    authClient
      .get(
        `${urlConstants.EMPLOYEES_DATA}${
          user?.subAdminId || googleUser?.userId || userId
        }`,
      )
      .then(
        ({ data }) => (
          setIsLoading(false),
          setEmployeesContent({
            ...employeesContent,
            data: data?.data,
            static: data?.data,
          })
        ),
      )
      .catch(() => setIsLoading(false));
  }, []);

  const handleCheck = (data) => {
    employeesContent.employeesData.some(
      (item) => item.firstName == data.firstName,
    )
      ? setEmployeesContent({
          ...employeesContent,
          employeesData: employeesContent.employeesData.filter(
            (item) => item.firstName !== data.firstName,
          ),
        })
      : setEmployeesContent({
          ...employeesContent,
          employeesData: [...employeesContent.employeesData, data],
        });
  };

  const handleChange = (name) => (e) => {
    let { value } = e.target;
    setEmployeesContent({ ...employeesContent, [name]: value });
  };

  const handleDateChange = (name) => (value) => {
    setEmployeesContent({
      ...employeesContent,
      [name]: value,
    });
  };

  let minDay = new Date(employeesContent.startDate);
  minDay.setDate(minDay.getDate() + 1);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectChange = (name) => (e) => {
    let { value } = e.target;
    setEmployeesContent({ ...employeesContent, [name]: value });
  };

  const searchedItems = employeesContent?.data.filter((item) => {
    let name = `${item.firstName} ${item.lastName}`;
    return name.trim().toLowerCase().includes(searchTerm.trim().toLowerCase());
  });

  const handleCheckAll = () => {
    employeesContent?.employeesData.length < employeesContent?.static.length &&
      setEmployeesContent({
        ...employeesContent,
        employeesData:
          searchedItems.length == employeesContent.static.length
            ? employeesContent.static
            : searchedItems,
      });
  };

  const handleUncheck = () => {
    employeesContent?.employeesData.length <= employeesContent?.static.length &&
      setEmployeesContent({
        ...employeesContent,
        employeesData: [],
      });
  };

  const handleSearch = (e) => {
    let { value } = e.target;
    setSearchTerm(value);
  };

  useEffect(() => {
    searchedItems.some((item) =>
      employeesContent?.employeesData.includes(item)
        ? setEmployeesContent({
            ...employeesContent,
            employeesData: [item],
          })
        : setEmployeesContent({ ...employeesContent, employeesData: [] }),
    );
  }, [searchTerm]);

  return (
    <section className={classes.tableWrapper}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexDirection: matchesXs ? 'column' : 'row',
        }}>
        <div
          style={{
            display: matchesXs ? 'block' : 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            gap: '1.5rem 2rem',
          }}>
          <div className={classes.formFieldWrapper}>
            <TypographyH5 className={classes.typo}>
              Name of Survey:
            </TypographyH5>
          </div>
          <div style={{ gridColumn: '2/8' }}>
            <InputForEmployeePage
              placeholder=""
              size="small"
              fullWidth={matchesXs ? true : false}
              style={{
                fontStyle: 'italic',
              }}
              onChange={handleChange('name')}
              value={employeesContent.name}
            />
          </div>
          <div className={classes.formFieldWrapper}>
            <TypographyH5 className={classes.typo}>Periodicity:</TypographyH5>
          </div>
          <div style={{ gridColumn: '2/8' }}>
            <SelectComp
              menuItem={[
                { label: 'Monthly', value: 'monthly' },
                { label: 'Annually', value: 'annually' },
              ]}
              // fullWidth={matchesXs ? true : false}
              label="Periodicity"
              style={{
                fontStyle: 'italic',
                background: '#fff',
                height: '2.4rem',
                width: matchesXs ? '100%' : 'auto',
              }}
              onChange={handleSelectChange('periodicity')}
              value={employeesContent.periodicity}
            />
          </div>
          <div className={classes.formFieldWrapper}>
            <TypographyH5 className={classes.typo}>Start Date:</TypographyH5>
          </div>
          <div style={{ gridColumn: '2/8' }}>
            <MaterialDatePicker
              value={employeesContent.startDate}
              notched
              fontItalic
              handleDateChange={handleDateChange('startDate')}
            />
          </div>
          <div className={classes.formFieldWrapper}>
            <TypographyH5 className={classes.typo}>End Date:</TypographyH5>
          </div>
          <div style={{ gridColumn: '2/8' }}>
            <MaterialDatePicker
              value={employeesContent.endDate}
              notched
              fontItalic
              handleDateChange={handleDateChange('endDate')}
              minDate={minDay}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: '4rem' }}>
        <TypographyBold>Participants</TypographyBold>
        <Typography component="p" className={classes.paragraph}>
          Select the users who will respond to the survey
        </Typography>
        <InputForEmployeePage
          style={{
            fontStyle: 'italic',
            backgroundColor: '#fff',
            margin: '.8rem 0',
            width: matchesXs ? '100%' : '20rem',
          }}
          placeholder="Search Employees"
          size="small"
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{ color: '#828282' }} />
              </InputAdornment>
            ),
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '14rem',
          }}>
          <CheckBtn disableElevation startIcon={<CheckSharp />} onClick={handleCheckAll}>
            Select all
          </CheckBtn>
          <CheckBtn disableElevation onClick={handleUncheck}>None</CheckBtn>
        </div>
        <div
          style={{
            display: matchesXs ? 'grid' : 'flex',
            flexWrap: 'wrap',
            margin: '2rem 0',
            flexDirection: matchesXs ? 'column' : 'row',
            alignItems: matchesXs ? 'flex-start' : 'center',
            gridTemplateColumns: matchesXs ? 'repeat(2,1fr)' : 'none',
            overflowX: 'auto',
          }}>
          {employeesContent &&
            searchedItems?.map((item, i) => (
              <label key={i} className={classes.employeeTags}>
                <Checkbox
                  color="primary"
                  classes={{
                    root: classes.checkBox,
                  }}
                  checked={employeesContent?.employeesData.some(
                    (data) => data.firstName == item.firstName,
                  )}
                  onClick={() => handleCheck(item)}
                />
                <TypographyH5>
                  {item.firstName} {item.lastName}
                </TypographyH5>
              </label>
            ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <PrimaryButton
            onClick={() => {
              employeesContent?.employeesData.length > 0 &&
                setProgress(employeesContent);
            }}>
            Next
          </PrimaryButton>
          <DefaultButton style={{ margin: '0 1rem' }}>Cancel</DefaultButton>
        </div>
      </div>
    </section>
  );
}
