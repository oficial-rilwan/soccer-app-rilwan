import { makeStyles, useTheme } from '@material-ui/core/styles';
import EmployeeImg from '../../../../../lib/assets/images/employee-img.png';
import {
  Paper,
  Grid,
  Typography,
  Dialog,
  Avatar,
  Button,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { authClient } from 'modules/authentication/requestClient';
import { useEffect, useState } from 'react';
import Loader from 'react-loaders';
import { urlConstants } from 'lib/constants';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontFamily: 'Rubik',
    fontWeight: 500,
    fontSize: '22px',
    lineHeight: '24px',
    color: '#1F53D7',
    padding: '.3rem 0',
    textTransform: 'capitalize',
  },
  subHead: {
    fontFamily: 'Rubik',
    fontSize: '15px',
    lineHeight: '21px',
    padding: '.3rem 0',
    color: '#6C6B6B',
    textTransform: 'capitalize',
  },
  titleHead: {
    fontFamily: 'Rubik',
    fontSize: '16px',
    lineHeight: '19px',
    color: '#515050',
  },
  contentHead: {
    fontFamily: 'Rubik',
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '19px',
    textAlign: 'right',
    textTransform: 'capitalize',
    color: '#000000',
  },
  employeeName: {
    fontFamily: 'Rubik,sans-serif',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '24px',
    textTransform: 'capitalize',
  },
  employeeData: {
    display: 'grid',
    textAlign: 'initial',
    height: '19rem',
    gridTemplateColumns: 'auto',
    gap: '1rem',
    [theme.breakpoints.up('1200')]: {
      padding: '0 2rem',
    },
    [theme.breakpoints.down('959')]: {
      padding: '0 6rem',
    },
    [theme.breakpoints.down('xs')]: {
      height: '23rem',
      padding: 0,
    },
  },
  flexWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '4%',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10rem',
    textAlign: 'center',
  },
  nameCard: {
    height: '43px',
    width: '43px',
    background: '#251F47',
    borderRadius: '50%',
    marginRight: '.7rem',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
  name: {
    margin: 0,
    textAlign: 'center',
    color: '#00DC7D',
    fontSize: '1.2rem',
    marginTop: '0.55rem',
  },
  dialogPaper: {
    width: '20rem',
    height: '20rem',
    background: 'transparent',
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  enhance: {
    fontStyle: 'italic',
    fontSize: 14,
    marginTop: 10,
    color: '#0F83EF',
  },
  imageEdit: {
    width: 230,
    height: 230,
    borderRadius: '50%',
  },
  avatar: {
    width: 70,
    height: 70,
    cursor: 'pointer',
  },
  editBtn: {
    color: '#fff',
    border: '1px solid #fff',
    position: 'relative',
    bottom: 50,
  },
  respContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}));

export default function OverView({ match }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [values, setValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const {
    firstName,
    lastName,
    department,
    employeeManager,
    dateOfHire,
    employeeID,
    address,
    email,
    phone,
    mobile,
    designation,
    workLocation,
    dateOfBirth,
    bankName,
    employmentType,
    annualSalary,
    TIN,
    nextOfKin,
  } = values;

  useEffect(() => {
    setIsLoading(true);
    authClient
      .get(`${urlConstants.EMPLOYEE_DATA}${match?.params?.id}`)
      .then(({ data }) => (setIsLoading(false), setValues(data?.data)))
      .catch((e) => console.log(e));
  }, [match?.params?.id]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    history.push(
      `/dashboard/employees/edit/personal-information/${match.params.id}`,
    );
  };

  return (
    <>
      {isLoading ? (
        <div className={classes.loader}>
          <Loader type="line-scale" color="#2F49D0" />
        </div>
      ) : (
        <Grid
          container
          justify="center"
          spacing={matchesXs ? 5 : 0}
          style={{ flexGrow: 1, height: 'inherit' }}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              style={{
                height: matchesSm ? 'auto' : '39rem',
                margin: '1rem',
                background: '#FCFFFF',
                borderRadius: 3,
                border: '0.3px solid #C4C4C4',
              }}>
              <section style={{ textAlign: 'center' }}>
                <div style={{ padding: matchesXs ? '1rem' : '2rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}>
                    {values?.meta?.url ? (
                      <Avatar
                        src={values?.meta?.url}
                        onClick={handleClickOpen}
                        className={classes.avatar}
                      />
                    ) : (
                      <Avatar>
                        <div className={classes.nameCard}>
                          <Typography variant="h4" className={classes.name}>
                            {firstName?.substring(0, 1).toUpperCase()}
                          </Typography>
                        </div>
                      </Avatar>
                    )}
                    <TypographyH5 className={classes.enhance}>
                      Click on image to enhance
                    </TypographyH5>
                  </div>
                  <div>
                    <Typography variant="h3" className={classes.heading}>
                      {firstName} {lastName}
                    </Typography>
                    <Typography component="p" className={classes.subHead}>
                      {designation}
                    </Typography>
                  </div>
                  <div
                    className={classes.employeeData}
                    style={{ margin: '2rem 0' }}>
                    <div className={classes.flexWrapper}>
                      <Typography variant="h5" className={classes.titleHead}>
                        Designation:
                      </Typography>
                      <Typography variant="h5" className={classes.contentHead}>
                        {designation}
                      </Typography>
                    </div>
                    <div className={classes.flexWrapper}>
                      <Typography variant="h5" className={classes.titleHead}>
                        Department:
                      </Typography>
                      <Typography variant="h5" className={classes.contentHead}>
                        {department}
                      </Typography>
                    </div>
                    <div className={classes.flexWrapper}>
                      <Typography variant="h5" className={classes.titleHead}>
                        Manager:
                      </Typography>
                      <Typography variant="h5" className={classes.contentHead}>
                        {employeeManager ? employeeManager : 'Issued by HR'}
                      </Typography>
                    </div>
                    <div className={classes.flexWrapper}>
                      <Typography variant="h5" className={classes.titleHead}>
                        Start Date:
                      </Typography>
                      <Typography variant="h5" className={classes.contentHead}>
                        {new Date(dateOfHire).toLocaleDateString('en-GB')}
                      </Typography>
                    </div>
                    <div className={classes.flexWrapper}>
                      <Typography variant="h5" className={classes.titleHead}>
                        Employee ID:
                      </Typography>
                      <Typography variant="h5" className={classes.contentHead}>
                        {employeeID}
                      </Typography>
                    </div>
                    <div className={classes.flexWrapper}>
                      <Typography variant="h5" className={classes.titleHead}>
                        Work Address:
                      </Typography>
                      <Typography variant="h5" className={classes.contentHead}>
                        {workLocation}
                      </Typography>
                    </div>
                  </div>
                </div>
              </section>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              style={{
                height: 'auto',
                margin: '1rem',
                background: '#FCFFFF',
                borderRadius: 3,
                border: '0.3px solid #C4C4C4',
              }}>
              <section>
                <div style={{ padding: '1rem' }}>
                  <Typography
                    variant="h3"
                    className={classes.employeeName}
                    style={matchesSm ? { textAlign: 'center' } : {}}>
                    Personal Information
                  </Typography>
                  <div
                    style={{
                      height: 'auto',
                      padding: matchesXs ? '2rem 0rem' : '1rem 0 0',
                    }}
                    className={classes.employeeData}>
                    <div className={classes.flexWrapper}>
                      <Typography variant="h5" className={classes.titleHead}>
                        Date of Birth:
                      </Typography>
                      <Typography variant="h5" className={classes.contentHead}>
                        {new Date(dateOfBirth).toLocaleDateString('en-GB')}
                      </Typography>
                    </div>
                    <div className={classes.flexWrapper}>
                      <Typography variant="h5" className={classes.titleHead}>
                        Contact Email:
                      </Typography>
                      <Typography
                        variant="h5"
                        className={classes.contentHead}
                        style={{ textTransform: 'none' }}>
                        {email}
                      </Typography>
                    </div>
                    <div className={classes.flexWrapper}>
                      <Typography variant="h5" className={classes.titleHead}>
                        Phone:
                      </Typography>
                      <Typography variant="h5" className={classes.contentHead}>
                        {phone}
                      </Typography>
                    </div>
                    <div className={classes.flexWrapper}>
                      <Typography variant="h5" className={classes.titleHead}>
                        Mobile:
                      </Typography>
                      <Typography variant="h5" className={classes.contentHead}>
                        {mobile ? mobile : 'Not available'}
                      </Typography>
                    </div>{' '}
                    <div className={classes.flexWrapper}>
                      <Typography variant="h5" className={classes.titleHead}>
                        TIN No:
                      </Typography>
                      <Typography variant="h5" className={classes.contentHead}>
                        {TIN}
                      </Typography>
                    </div>
                    <div className={classes.flexWrapper}>
                      <Typography variant="h5" className={classes.titleHead}>
                        Address:
                      </Typography>
                      <Typography
                        variant="h5"
                        style={{ width: 220 }}
                        className={classes.contentHead}>
                        {address}
                      </Typography>
                    </div>
                    <div className={classes.flexWrapper}>
                      <Typography variant="h5" className={classes.titleHead}>
                        Next Of Kin:
                      </Typography>
                      <Typography variant="h5" className={classes.contentHead}>
                        {nextOfKin}
                      </Typography>
                    </div>
                  </div>
                </div>
              </section>
            </Paper>
            <Paper
              elevation={0}
              style={{
                height: matchesSm ? 'auto' : '9rem',
                margin: '1rem',
                background: '#FCFFFF',
                borderRadius: 3,
                border: '0.3px solid #C4C4C4',
              }}>
              <section>
                <div style={{ padding: '1rem' }}>
                  <Typography
                    variant="h3"
                    className={classes.employeeName}
                    style={matchesSm ? { textAlign: 'center' } : {}}>
                    Compensation
                  </Typography>
                  <div
                    style={{
                      height: 'auto',
                      padding: matchesXs ? '2rem 0rem' : '1rem 0 0',
                    }}
                    className={classes.employeeData}>
                    <div className={classes.flexWrapper}>
                      <Typography variant="h5" className={classes.titleHead}>
                        Employment Type:
                      </Typography>
                      <Typography variant="h5" className={classes.contentHead}>
                        {employmentType}
                      </Typography>
                    </div>
                    <div className={classes.flexWrapper}>
                      <Typography variant="h5" className={classes.titleHead}>
                        Wage:
                      </Typography>
                      <Typography variant="h5" className={classes.contentHead}>
                        {`NGN ${Math.floor(
                          Number(annualSalary?.replace(/,/g, '') / 12),
                        ).toLocaleString()}/mnth`}
                      </Typography>
                    </div>
                  </div>
                </div>
              </section>
            </Paper>
            <Paper
              elevation={0}
              style={{
                height: matchesSm ? 'auto' : '9rem',
                margin: '1rem',
                background: '#FCFFFF',
                borderRadius: 3,
                border: '0.3px solid #C4C4C4',
              }}>
              <section>
                <div style={{ padding: '1rem' }}>
                  <Typography
                    variant="h3"
                    className={classes.employeeName}
                    style={matchesSm ? { textAlign: 'center' } : {}}>
                    Payment Information
                  </Typography>
                  <div
                    style={{
                      height: 'auto',
                      padding: matchesXs ? '2rem 0rem' : '1rem 0 0',
                    }}
                    className={classes.employeeData}>
                    <div className={classes.flexWrapper}>
                      <Typography variant="h5" className={classes.titleHead}>
                        Bank Name:
                      </Typography>
                      <Typography variant="h5" className={classes.contentHead}>
                        {bankName}
                      </Typography>
                    </div>
                    <div className={classes.flexWrapper}>
                      <Typography variant="h5" className={classes.titleHead}>
                        Account No:
                      </Typography>
                      <Typography variant="h5" className={classes.contentHead}>
                        {values?.accountNo}
                      </Typography>
                    </div>
                  </div>
                </div>
              </section>
            </Paper>
          </Grid>
        </Grid>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{
          paper: classes.dialogPaper,
        }}>
        {values?.meta?.url ? (
          <div className={classes.respContainer}>
            <Avatar className={classes.imageEdit} src={values?.meta.url} />
            <Button
              onClick={handleEdit}
              size="small"
              disableElevation
              variant="outlined"
              className={classes.editBtn}>
              Edit
            </Button>
          </div>
        ) : (
          <>
            <div className={classes.nameCard}>
              <Typography variant="h4" className={classes.name}>
                {firstName?.substring(0, 1).toUpperCase()}
              </Typography>
            </div>
          </>
        )}
      </Dialog>
    </>
  );
}
