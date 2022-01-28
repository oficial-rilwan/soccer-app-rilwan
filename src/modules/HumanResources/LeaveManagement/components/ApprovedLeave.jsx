import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import Loader from 'react-loaders';
import { TypographyBold } from 'modules/components/Typography/Typography';
import leaveAction from 'redux/actions/leaveActions';
import { useDispatch, useSelector } from 'react-redux';

const { fetchLeaveDataApproved } = leaveAction;

const useStyles = makeStyles((theme) => ({
  container: {
    borderRadius: '5px',
    margin: '2rem 0',
    border: 0,
  },
  tableContainer: {
    borderRadius: '5px',
    border: '1px solid #dbe3e3',
    margin: '2rem 0',
  },
  table: {
    minWidth: 650,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10rem',
    textAlign: 'center',
  },
  cellWrapper: {
    backgroundColor: '#fcffff',
    color: '#474747',
  },
  tableRow: {
    '&:last-child th, &:last-child td': {
      borderBottom: 0,
    },
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
}));

export default function Approved() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const columns = [
    { id: 'name', label: 'Employee Name', minWidth: 5 },
    { id: 'employeeRole', label: 'Role', minWidth: 10 },
    { id: 'leaveType', label: 'Leave Type', minWidth: 10 },
    { id: 'from', label: 'From', minWidth: 10 },
    { id: 'to', label: 'To', minWidth: 10 },
    { id: 'days', label: 'Total Days', minWidth: 10 },
  ];
  const [isLoading, setIsLoading] = useState(false);

  const [rows, setRows] = useState([]);
  const [errors, setErrors] = useState('');

  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const user = useSelector((state) => state?.auth?.user);
  const authUserId = useSelector((state) => state?.loginStats.user?.userId);

  useEffect(() => {
    setIsLoading(true);
    authClient
      .get(
        `/api/v1/employee/leave/management/fetch?page=1&limit=20&leaveStatus=APPROVED&issuersId=${
          user?.subAdminId || googleUser?.userId || authUserId
        }`,
      )
      .then(({ data }) => (setRows(data), setIsLoading(false)))
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, []);

  return (
    <>
      <div className={classes.container}>
        {isLoading ? (
          <div className={classes.loader}>
            <Loader type="line-scale" color="#2F49D0" />
          </div>
        ) : rows?.data?.length > 0 ? (
          <TableContainer className={classes.tableContainer}>
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
                        minWidth: column.minWidth,
                        fontFamily: 'Rubik',
                        fontSize: '16px',
                        fontWeight: column.id == 'name' ? 500 : 'normal',
                      }}
                      className={classes.cellWrapper}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.data?.map((row, i) => (
                  <TableRow hover key={i} className={classes.tableRow}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          onClick={() => (
                            dispatch(
                              fetchLeaveDataApproved(row.employeeId, setErrors),
                            ),
                            history.push(
                              `/dashboard/leave/status/${row.employeeId}`,
                            )
                          )}
                          style={{
                            fontFamily: 'Rubik, sans-serif',
                            backgroundColor: '#FCFFFF',
                            fontWeight: '500',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: column.id == 'name' ? 500 : 'normal',
                            color: column.id == 'name' ? '#1F53D7' : '#474747',
                            textTransform:
                              column.id == 'name' ||
                              column.id == 'leaveType' ||
                              column.id == 'employeeRole'
                                ? 'capitalize'
                                : 'normal',
                          }}>
                          {column.id == 'name'
                            ? `${row.name}`
                            : column.id == 'from' || column.id == 'to'
                            ? `${
                                new Date(value)
                                  .toLocaleDateString('en-GB')
                                  .substr(0, 6) +
                                new Date(value)
                                  .toLocaleDateString('en-GB')
                                  .substr(8)
                              }`
                            : column.id == 'leaveType' &&
                              row?.leaveType == 'public_holiday'
                            ? 'Public Holiday'
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className={classes.recordWrapper}>
            <TypographyBold variant="h6" className={classes.noRecord}>
              No Approved leave at the moment
            </TypographyBold>
          </div>
        )}
      </div>
    </>
  );
}
