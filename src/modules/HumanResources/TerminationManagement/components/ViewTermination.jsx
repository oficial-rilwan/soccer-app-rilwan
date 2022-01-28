import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useMediaQuery } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Loader from 'react-loaders';

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
}));

export default function ViewTerminate() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const columns = [
    { id: 'reason', label: 'Termination For', width: matchesXs ? 150 : 250 },
    { id: 'expectedDate', label: 'Date', width: matchesXs ? 150 : 250 },
    { id: 'terminationStatus', label: 'Status', width: 10 },
  ];
  const { isLoading, terminationData } = useSelector(
    (state) => state?.terminationData,
  );

  return (
    <>
      <div style={{ paddingTop: '1rem' }}>
        <Grid container className={classes.gridWrapper}>
          <Grid item xs={12} md={2}>
            {isLoading ? (
              <div className={classes.loader}>
                <Loader type="ball-rotate" color="#2F49D0" />
              </div>
            ) : (
              <div>
                <Typography variant="h3" className={classes.employeeName}>
                  {terminationData?.employeeToTerminateName}
                </Typography>
                <ul style={{ listStyle: 'none', padding: '0' }}>
                  <li className={classes.active}>Termination Status</li>
                </ul>
              </div>
            )}
          </Grid>
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
                      {[terminationData]?.map((row, i) => (
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
                                    column.id == 'terminationStatus' &&
                                    row.status == 'CLOSED'
                                      ? '#EB5757'
                                      : column.id == 'terminationStatus'
                                      ? '#119b17'
                                      : '#232323',
                                }}>
                                {column.id == 'expectedDate'
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
