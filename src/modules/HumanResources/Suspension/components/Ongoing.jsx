import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import Loader from 'react-loaders';
import { useDispatch, useSelector } from 'react-redux';
import suspensionAction from 'redux/actions/suspensionActions';
import { TypographyBold } from 'modules/components/Typography/Typography';

const { fetchSuspensionData } = suspensionAction;

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

export default function Ongoing({ searchTerm, reload }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const columns = [
    { id: 'employeeToSuspendName', label: 'Employee Name', width: 10 },
    { id: 'suspendDate', label: 'Date', width: 120 },
    { id: 'suspensionFor', label: 'Suspension Type', width: 10 },
    { id: 'action', label: 'Action', width: 10 },
  ];
  const [dataValues, setDataValues] = useState({
    data: [],
    isLoading: false,
  });
  const history = useHistory();
  const [error, setError] = useState('');

  const searchedItems = dataValues?.data?.filter((item) => {
    let name = `${item.employeeToSuspendName}`;
    return name.trim().toLowerCase().includes(searchTerm.trim().toLowerCase());
  });

  const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  const user = useSelector((state) => state?.auth?.user);

  const authUserId = useSelector((state) => state?.loginStats.user?.userId);

  useEffect(() => {
    setDataValues({ ...dataValues, isLoading: true });
    authClient
      .get(
        `/api/v1/employee/suspension/management/fetch?issuersId=${
          user?.subAdminId || googleUser?.userId || authUserId
        }`,
      )
      .then((res) => {
        if (res.status == 200 || 201) {
          const ongoing = res?.data?.data?.filter(
            (item) => item.suspensionStatus === 'ONGOING',
          );
          setDataValues({
            ...dataValues,
            data: ongoing,
            isLoading: false,
          });
        }
      })
      .catch((e) => {
        setDataValues({ ...dataValues, isLoading: false });
      });
  }, [reload]);

  return (
    <>
      {dataValues?.isLoading ? (
        <div className={classes.loader}>
          <Loader type="line-scale" color="#2F49D0" />
        </div>
      ) : dataValues?.data.length === 0 ? (
        <div className={classes.recordWrapper}>
          <TypographyBold variant="h6" className={classes.noRecord}>
            No Ongoing suspension at the moment
          </TypographyBold>
        </div>
      ) : searchedItems?.length === 0 ? (
        <div className={classes.recordWrapper}>
          <TypographyBold variant="h6" className={classes.noRecord}>
            Sorry, could not find employee
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
                {searchedItems?.map((row, i) => (
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
                              column.id == 'action' ? '#1F53D7' : '#232323',
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
                            <Typography
                              variant="h4"
                              style={{
                                fontFamily: 'Rubik',
                                fontSize: '15px',
                                cursor: 'pointer',
                              }}
                              onClick={() => (
                                dispatch(
                                  fetchSuspensionData(
                                    row?.suspensionId,
                                    setError,
                                  ),
                                ),
                                history.push(
                                  `/dashboard/suspension/view/${row?.suspensionId}`,
                                )
                              )}>
                              View
                            </Typography>
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
