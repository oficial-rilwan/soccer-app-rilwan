import { useEffect, useState } from 'react';
import { Typography, makeStyles, IconButton } from '@material-ui/core';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import { VisibilityOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router';
import { authClient } from 'modules/authentication/requestClient';
import { useDispatch } from 'react-redux';
import payslipActions from 'redux/actions/payslipActions';

const { fetchPayslipData } = payslipActions;
const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem',
    borderRadius: '5px',
    marginTop: '1rem',
    marginBottom: '2rem',
  },
  cellWrapper: {
    backgroundColor: '#fcffff',
    color: '#474747',
  },
  table: {
    minWidth: 650,
  },
}));

export default function ViewPayslip({ match }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState({
    data: {
      id: '',
    },
  });
  const columns = [
    { id: 'annualSalary', label: 'Gross Salary', width: 250 },
    { id: 'payDay', label: 'Pay Date', width: 250 },
    { id: 'monthlySalary', label: 'Pay Amount', width: 190 },
    { id: 'payStatus', label: 'Pay Status', width: 220 },
    { id: 'action', label: 'Action', width: 10 },
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    authClient
      .get(
        `/api/v1/employee/payslip/management/fetch?employeeId=${match?.params?.id}`,
      )
      .then(({ data }) => {
        setRows(data?.data);
      })
      .catch((e) => console.error(e));
  }, [match.params.id]);

  return (
    <>
      <HeaderComp url={'/dashboard/payslip'} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ReturnBtn location="/dashboard/payslip" />
        <Typography
          variant="h5"
          style={{
            fontFamily: 'Rubik',
            fontSize: '20px',
            fontWeight: 500,
            marginLeft: '1rem',
          }}>
          Payslip
        </Typography>
      </div>
      <section className={classes.tableWrapper}>
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
                      width: column.width,
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
              {rows?.map((row, i) => (
                <TableRow hover key={i} className={classes.tableRow}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          fontFamily: 'Rubik, sans-serif',
                          backgroundColor: '#FCFFFF',
                          fontSize: '16px',
                          fontWeight: column.id == 'payStatus' ? 500 : 400,
                          borderBottom: 0,
                          color:
                            column.id == 'payStatus' &&
                            row.payStatus == 'pending'
                              ? '#F2994A'
                              : column.id == 'payStatus' &&
                                row.payStatus == 'Approved'
                              ? '#27AE60'
                              : '#232323',
                        }}>
                        {column.id == 'action' ? (
                          <div style={{ display: 'flex' }}>
                            <VisibilityOutlined
                              style={{
                                color: '#1F53D7',
                                cursor: 'pointer',
                                marginRight: '.7rem',
                              }}
                              onClick={() =>
                                history.push(
                                  `/dashboard/payslip/preview/${row.employeeId}`,
                                )
                              }
                            />
                            <GetAppOutlinedIcon
                              style={{ color: '#1F53D7', cursor: 'pointer' }}
                            />
                          </div>
                        ) : column.id == 'payDay' ? (
                          new Date(value).toLocaleDateString('en-GB')
                        ) : column.id == 'monthlySalary' ||
                          column.id == 'annualSalary' ? (
                          `NGN ${Number(value).toLocaleString()}`
                        ) : column.id === 'payStatus' ? (
                          value.substring(0, 1).toUpperCase() +
                          value.substring(1)
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
      </section>
    </>
  );
}
