import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import Loader from 'react-loaders';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem',
    borderRadius: '5px',
    marginTop: '1.2rem',
    marginBottom: '2rem',
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
  btnRoot: {
    fontFamily: 'Rubik',
    backgroundColor: '#fff',
    textTransform: 'none',
    color: '#1F53D7',
    '&:hover': {
      color: '#1F53D7',
    },
  },
  noRecord: {
    fontFamily: 'Rubik',
    fontSize: '1rem',
    fontStyle: 'italic',
  },
  recordWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '5rem',
  },
}));

export default function Closed() {
  const classes = useStyles();
  const history = useHistory();
  const columns = [
    { id: 'employeeToqueryName', label: 'Employee Name', width: 180 },
    { id: 'queryDate', label: 'Date', width: 180 },
    { id: 'queryFor', label: 'Query Type', width: 180 },
    { id: 'queryStatus', label: 'Status', width: 180 },
    { id: 'action', label: 'Action', width: 10 },
  ];

  const [values, setValues] = useState({
    data: [],
    isLoading: false,
  });

  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const user = useSelector((state) => state?.auth?.user);
  const authUserId = useSelector((state) => state?.loginStats.user?.userId);

  useEffect(() => {
    setValues({ ...values, isLoading: true });
    authClient
      .get(
        `/api/v1/employee/query/management/fetch?page=1&limit=20&queryStatus=CLOSED&issuersId=${
          user?.subAdminId || googleUser?.userId || authUserId
        }`,
      )
      .then(({ data }) =>
        setValues({ ...values, isLoading: false, data: data?.data }),
      )
      .catch(
        (e) => (setValues({ ...values, isLoading: false }), console.log(e)),
      );
  }, []);

  return (
    <>
      {values?.isLoading ? (
        <div className={classes.loader}>
          <Loader type="line-scale" color="#2F49D0" />
        </div>
      ) : values?.data?.length <= 0 ? (
        <div className={classes.recordWrapper}>
          <TypographyBold variant="h6" className={classes.noRecord}>
            No Closed query at the moment
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
                {values?.data?.map((row, i) => (
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
                            textTransform: 'capitalize',
                            color:
                              column.id == 'action'
                                ? '#1F53D7'
                                : column.id == 'queryStatus' &&
                                  row.queryStatus == 'OPEN'
                                ? '#00DC7D'
                                : column.id == 'queryStatus' &&
                                  row.queryStatus == 'CLOSED'
                                ? '#EB5757'
                                : '#232323',
                          }}>
                          {column.id == 'suspendDate' ? (
                            `${
                              new Date(value)
                                .toLocaleDateString('en-GB')
                                .substr(0, 6) +
                              new Date(value)
                                .toLocaleDateString('en-GB')
                                .substr(8)
                            }`
                          ) : column.id == 'action' ? (
                            <Button
                              size="small"
                              disableElevation
                              classes={{
                                root: classes.btnRoot,
                              }}
                              onClick={() =>
                                history.push(`/dashboard/query/view`)
                              }>
                              View
                            </Button>
                          ) : column.id == 'queryStatus' ? (
                            value.substr(0).toLowerCase()
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
