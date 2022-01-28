import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import { useLocation, useRouteMatch } from 'react-router';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Loader from 'react-loaders';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  employeeName: {
    fontFamily: 'Rubik,sans-serif',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '24px',
    textTransform: 'capitalize',
  },
  active: {
    fontFamily: 'Rubik',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '19px',
    color: '#2F49D0',
    textDecoration: 'none',
  },
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem 0 0',
    borderRadius: '5px',
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

export default function ViewPromotions() {
  const classes = useStyles();
  const { url, path } = useRouteMatch();
  const { pathname } = useLocation();
  const { isLoading, promotionData } = useSelector(
    (state) => state?.promotionData,
  );

  const columns = [
    { id: 'promotionDate', label: 'Expected Date', width: 400 },
    { id: 'oldPosition', label: 'Old Position', width: 350 },
    { id: 'newPosition', label: 'New Position', width: 300 },
    { id: 'promotionStatus', label: 'Status', width: 180 },
  ];

  return (
    <>
      <HeaderComp
        url={'/dashboard/promotions'}
        path={path}
        pathname={pathname}
      />
      <div>
        <ReturnBtn location={'/dashboard/promotions'} />
      </div>
      <div style={{ paddingTop: '1rem' }}>
        <Grid container className={classes.gridWrapper}>
          {isLoading ? (
            <div className={classes.loader}>
              <Loader type="ball-rotate" color="#2F49D0" />
            </div>
          ) : (
            <Grid item xs={12} md={2}>
              <div>
                <Typography variant="h3" className={classes.employeeName}>
                  {promotionData?.employeeToPromoteName}
                </Typography>
                <ul style={{ listStyle: 'none', padding: '0' }}>
                  <li className={classes.active}>Promotion Status</li>
                </ul>
              </div>
            </Grid>
          )}

          <Grid item xs={12} md={10}>
            {isLoading ? (
              <div className={classes.loader}>
                <Loader type="line-scale" color="#2F49D0" />
              </div>
            ) : (
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
                      {[promotionData]?.map((row, i) => (
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
                                    column.id === 'promotionStatus' &&
                                    row.promotionStatus === 'APPROVED'
                                      ? '#27AE60'
                                      : column.id == 'name'
                                      ? 'blue'
                                      : '#232323',
                                }}>
                                {column.id == 'promotionDate'
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
              </section>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}
