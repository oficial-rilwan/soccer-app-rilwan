import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { TypographyBold } from 'modules/components/Typography/Typography';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, useMediaQuery } from '@material-ui/core';

import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { authClient } from 'modules/authentication/requestClient';
import Loader from 'react-loaders';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import SelectComp from 'modules/authentication/Signup/components/SelectCOmp';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem',
    borderRadius: '5px',
    margin: '.5rem 0',
  },
  table: {
    minWidth: 650,
  },
  tableRow: {
    '&:last-child th, &:last-child td': {
      borderBottom: 0,
    },
  },
  cellWrapper: {
    backgroundColor: '#fcffff',
    color: '#474747',
  },
  actionBtn: {
    textTransform: 'none',
    color: '#1F53D7',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10rem',
    textAlign: 'center',
  },
  recordWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '5rem',
  },
  noRecord: {
    fontFamily: 'Rubik',
    fontSize: '1rem',
    fontStyle: 'italic',
  },
  filterWrapper: {
    backgroundColor: '#EEF5FC',
    borderRadius: 3,
    border: '1px solid #DFDFDF',
    margin: '10px 0',
    padding: '20px 20px',
  },
}));

export default function PayrollManagement() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    id: '',
    data: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state?.auth);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const authUserId = useSelector((state) => state?.loginStats.user?.userId);

  const columns = [
    { id: 'payMonth', label: 'Pay Month', width: 550 },
    { id: 'noOfEmployees', label: 'Number of Employees', width: 500 },
    { id: 'total', label: 'Total', width: 250 },
    { id: 'action', label: 'Action', width: 100 },
  ];
  const [filterTerm, setFilterTerm] = useState('');

  const handleChange = () => (e) => {
    let { value } = e.target;

    setFilterTerm(value);
  };

  const searchedItems = values?.data?.filter((item) => {
    let name = `${item.payYear}`;
    return name.trim().toLowerCase().includes(filterTerm.trim().toLowerCase());
  });

  useEffect(() => {
    setIsLoading(true);
    authClient
      .get(
        `/api/v1/employee/payroll/management/fetch?issuersId=${
          user?.subAdminId || googleUser?.userId || authUserId
        }`,
      )
      .then(({ data }) => {
        setIsLoading(false);
        setValues({ ...values, data: data?.data });
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, []);

  return (
    <>
      <HeaderComp url="/dashboard/payroll" />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '1rem 0',
        }}>
        <PrimaryButton
          onClick={() => history.push('/dashboard/payroll/create')}>
          Run Payroll
        </PrimaryButton>
      </div>

      <div className={classes.filterWrapper}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TypographyBold
            style={{
              fontSize: 15,
              marginBottom: 10,
              position: 'relative',
              bottom: 38,
            }}>
            Filter:
          </TypographyBold>
          <div style={{ marginLeft: '10px' }}>
            <TypographyH5 style={{ fontSize: 13, marginTop: 13 }}>
              Period
            </TypographyH5>
            <SelectComp
              label="Year"
              value={values?.data?.year}
              menuItem={[
                { label: '2020', value: '2020' },
                { label: '2021', value: '2021' },
              ]}
              style={{
                fontStyle: 'italic',
                width: matchesXs ? '100%' : '8rem',
                height: '2.4rem',
                margin: '.5rem 0',
                background: '#fff',
              }}
              onChange={handleChange('year')}
            />
          </div>
        </div>
      </div>
      <TypographyBold variant="h5" style={{ fontSize: 17 }}>
        Payroll Management
      </TypographyBold>
      {isLoading ? (
        <div className={classes.loader}>
          <Loader type="line-scale" color="#2F49D0" />
        </div>
      ) : values?.data.length <= 0 ? (
        <div className={classes.recordWrapper}>
          <TypographyBold variant="h6" className={classes.noRecord}>
            No Payroll record at the moment
          </TypographyBold>
        </div>
      ) : (
        <div className={classes.tableWrapper}>
          <TableContainer className={classes.container}>
            <Table
              className={classes.table}
              stickyHeader
              aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        fontFamily: 'Rubik',
                        fontWeight: 500,
                        width: column.width,
                        fontSize: '16px',
                        color:
                          column.id == 'action' || column.id == 'toggle'
                            ? '#6c6b6b00'
                            : '#6C6B6B',
                      }}
                      className={classes.cellWrapper}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {values?.data &&
                  searchedItems?.map((row, i) => (
                    <TableRow hover key={i} className={classes.tableRow}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            style={{
                              fontFamily: 'Rubik, sans-serif',
                              backgroundColor: '#FCFFFF',
                              fontSize: '16px',
                              fontWeight: column.id === 'name' ? 500 : 400,
                              color: '#232323',
                              paddingLeft: column.id === 'noOfEmployees' && 90,
                              textTransform: 'capitalize',
                            }}
                            align="left">
                            {column.id == 'action' ? (
                              <Button
                                disableElevation
                                className={classes.actionBtn}
                                onClick={() =>
                                  history.push(
                                    `/dashboard/payroll/view/${row?.PayRollManagementId}`,
                                  )
                                }>
                                View
                              </Button>
                            ) : column.id === 'total' ? (
                              `NGN ${value?.toLocaleString()}`
                            ) : column.id === 'payMonth' ? (
                              `${row?.payMonth} ${row?.payYear}`
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
        </div>
      )}
    </>
  );
}
