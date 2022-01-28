import {
  useMediaQuery,
  useTheme,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { TypographyBold } from 'modules/components/Typography/Typography';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import CompanyLogo from 'lib/assets/icons/fresible.svg';

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem 3rem',
    borderRadius: '5px',
    margin: '.5rem 0',
    [theme.breakpoints.down('xs')]: {
      padding: '.6rem',
    },
  },
  responsiveContainer: {
    width: '100%',
    overflowX: 'auto',
  },
  spacing: {
    justifyContent: 'space-between',
    display: 'flex',
    minWidth: 450,
    padding: '.5rem 0',
  },
  deductions: {
    color: '#EB5757',
    fontSize: '16px',
    fontWeight: 'normal',
    fontFamily: 'Rubik',
  },
  payroll: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#fff',
    padding: '.6rem',
    borderRadius: '5px 5px 3px 3px',
    margin: '1rem 0',
    marginBottom: '2rem',
  },
  cellData: {
    fontFamily: 'Rubik, sans-serif',
    backgroundColor: '#FCFFFF',
    fontSize: '16px',
    // fontWeight: column.id == 'name' ? 500 : 400,
    color: '#232323',
    textTransform: 'capitalize',
    borderBottom: 0,
  },
}));

export default function EditPayroll() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const responsive = useMediaQuery(theme.breakpoints.down(450));
  return (
    <>
      <HeaderComp url="/dashboard/payroll" />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ReturnBtn />
        <PrimaryButton style={{ width: matchesXs && 'auto' }}>
          Appprove Payslip
        </PrimaryButton>
      </div>
      <TypographyBold variant="h5" style={{ fontSize: 17, margin: '10px 0' }}>
        Payroll Management
      </TypographyBold>
      <section style={{ paddingBottom: '1.5rem' }}>
        <div className={classes.tableWrapper}>
          <div style={{ padding: '.5rem 0' }}>
            <section>
              <div
                style={{
                  textAlign: 'center',
                  padding: '3rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Typography
                  variant="h4"
                  style={{
                    fontFamily: 'Rubik',
                    fontWeight: 500,
                    fontSize: 17,
                    flex: 1,
                  }}>
                  Payslip for the month of January
                </Typography>
              </div>
              <div style={{ padding: '0 .8rem' }}>
                <Typography
                  variant="h4"
                  style={{
                    fontFamily: 'Rubik',
                    fontWeight: 500,
                    fontSize: 14,
                    textAlign: 'right',
                  }}>
                  Payslip #0001
                </Typography>
                <img
                  src={CompanyLogo}
                  style={{
                    borderRadius: '50%',
                    border: '1px solid #878181',
                    padding: '1rem',
                  }}
                />
                <div className={classes.responsiveContainer}>
                  <div className={classes.spacing}>
                    <div style={{ width: '10rem' }}>
                      <Typography
                        variant="h6"
                        style={{
                          fontFamily: 'Rubik',
                          fontSize: '16px',
                          fontWeight: 'normal',
                        }}>
                        Fresible Ltd 65, Ogunalana Drive, Surulere, Lagos.
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        variant="h6"
                        style={{
                          fontFamily: 'Rubik',
                          fontSize: '16px',
                          fontWeight: 'normal',
                        }}>
                        <span style={{ fontWeight: 500 }}>Pay Period</span>:
                        05/01/2021 - 31/01/2021
                      </Typography>
                      <Typography
                        variant="h6"
                        style={{
                          fontFamily: 'Rubik',
                          fontSize: '16px',
                          fontWeight: 'normal',
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}>
                        <span style={{ fontWeight: 500 }}>Date of Payment</span>
                        : 05/02/2021
                      </Typography>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: '10rem',
                    padding: '1.3rem 0',
                  }}>
                  <Typography
                    variant="h6"
                    style={{
                      fontFamily: 'Rubik',
                      fontSize: '16px',
                      fontWeight: 'normal',
                    }}>
                    John Doe Web Designer Employee ID: FT-0009 Joining Date: 1
                    Jan 2013
                  </Typography>
                </div>
                <div
                  style={{
                    borderBottom: '1px solid #C4C4C4',
                  }}
                />
                <div style={{ padding: '1.3rem 0' }}>
                  <Typography
                    variant="h4"
                    style={{
                      fontFamily: 'Rubik',
                      fontWeight: 500,
                      fontSize: 16,
                    }}>
                    Breakdown
                  </Typography>
                  <div className={classes.responsiveContainer}>
                    <div className={classes.spacing}>
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: '16px',
                          fontWeight: 'normal',
                          fontFamily: 'Rubik',
                        }}>
                        Base Salary
                      </Typography>
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: '16px',
                          fontWeight: 'normal',
                          fontFamily: 'Rubik',
                        }}>
                        NGN300,000.00
                      </Typography>
                    </div>
                    <div className={classes.spacing}>
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: '16px',
                          fontWeight: 'normal',
                          fontFamily: 'Rubik',
                        }}>
                        Bonuses
                      </Typography>
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: '16px',
                          fontWeight: 'normal',
                          fontFamily: 'Rubik',
                          color: '#27AE60',
                        }}>
                        NGN30,000.00
                      </Typography>
                    </div>
                    <div className={classes.spacing}>
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: '16px',
                          fontWeight: 'normal',
                          fontFamily: 'Rubik',
                        }}>
                        NHF
                      </Typography>
                      <Typography variant="h6" className={classes.deductions}>
                        NGN0.00
                      </Typography>
                    </div>
                    <div className={classes.spacing}>
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: '16px',
                          fontWeight: 'normal',
                          fontFamily: 'Rubik',
                        }}>
                        NHIS
                      </Typography>
                      <Typography variant="h6" className={classes.deductions}>
                        -NGN10,00.00
                      </Typography>
                    </div>
                    <div className={classes.spacing}>
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: '16px',
                          fontWeight: 'normal',
                          fontFamily: 'Rubik',
                        }}>
                        Life Assurance
                      </Typography>
                      <Typography variant="h6" className={classes.deductions}>
                        NGN0.00
                      </Typography>
                    </div>
                    <div className={classes.spacing}>
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: '16px',
                          fontWeight: 'normal',
                          fontFamily: 'Rubik',
                        }}>
                        Pension
                      </Typography>
                      <Typography variant="h6" className={classes.deductions}>
                        NGN10,000.00
                      </Typography>
                    </div>
                    <div className={classes.spacing}>
                      <Typography
                        variant="h6"
                        style={{
                          fontSize: '16px',
                          fontWeight: 'normal',
                          fontFamily: 'Rubik',
                        }}>
                        PAYE
                      </Typography>
                      <Typography variant="h6" className={classes.deductions}>
                        -NGN30,000.00
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
