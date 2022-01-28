import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import Loader from 'react-loaders';
import { TypographyBold } from 'modules/components/Typography/Typography';
import terminationAction from 'redux/actions/terminationActions';
import { useDispatch, useSelector } from 'react-redux';

const { fetchTerminationData } = terminationAction;

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem',
    borderRadius: '5px',
    marginTop: '1.2rem',
    marginBottom: '2rem',
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
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10rem',
    textAlign: 'center',
  },
}));

export default function Terminate({ reload }) {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [termination, setTermination] = useState({
    data: [],
  });
  const [error, setError] = useState('');
  const columns = [
    { id: 'employeeToTerminateName', label: 'Employee Name', width: 150 },
    { id: 'employeeRole', label: 'Role', width: 120 },
    { id: 'reason', label: 'Termination For', width: 150 },
    { id: 'issuersName', label: 'Issuer', width: 10 },
    { id: 'terminateDate', label: 'Date', width: 10 },
  ];

  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const user = useSelector((state) => state?.auth?.user);

  const authUserId = useSelector((state) => state?.loginStats.user?.userId);

  useEffect(() => {
    setIsLoading(true);
    authClient
      .get(
        `/api/v1/employee/terminate/management/fetch?issuersId=${
          user?.subAdminId || googleUser?.userId || authUserId
        }`,
      )
      .then((res) => {
        if (res.status == 200) {
          setIsLoading(false);
          setTermination({ ...termination, data: res?.data?.data });
        }
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, [reload]);

  return (
    <>
      {isLoading ? (
        <div className={classes.loader}>
          <Loader type="line-scale" color="#2F49D0" />
        </div>
      ) : termination?.data.length <= 0 ? (
        <div style={{ textAlign: 'center', fontStyle: 'italic' }}>
          <TypographyBold style={{ padding: '45px' }}>
            Termination records not found
          </TypographyBold>
        </div>
      ) : (
        <div className={classes.tableWrapper}>
          <TableContainer className={classes.container}>
            <Table
              className={classes.table}
              stickyHeader
              aria-label="sticky-table">
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
                {termination?.data?.map((row, i) => (
                  <TableRow hover key={i} className={classes.tableRow}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          onClick={() => (
                            dispatch(
                              fetchTerminationData(
                                row?.terminationId,
                                setError,
                              ),
                            ),
                            history.push(
                              `/dashboard/termination/terminate/view/${row?.terminationId}`,
                            )
                          )}
                          style={{
                            fontFamily: 'Rubik, sans-serif',
                            backgroundColor: '#FCFFFF',
                            fontSize: '16px',
                            color:
                              column.id == 'employeeToTerminateName'
                                ? '#1F53D7'
                                : '#232323',
                            fontWeight:
                              column.id == 'employeeToTerminateName'
                                ? 500
                                : 400,
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                          }}>
                          {column.id == 'terminateDate'
                            ? `${
                                new Date(value)
                                  .toLocaleDateString('en-GB')
                                  .substr(0, 6) +
                                new Date(value)
                                  .toLocaleDateString('en-GB')
                                  .substr(8)
                              }`
                            : value}
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
