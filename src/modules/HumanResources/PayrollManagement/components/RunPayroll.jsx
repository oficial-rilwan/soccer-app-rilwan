import { makeStyles, useTheme } from '@material-ui/core/styles';
import { TypographyBold } from 'modules/components/Typography/Typography';
import {
  IconButton,
  TableFooter,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { ReactComponent as Info } from 'lib/assets/icons/info.svg';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Rows from './Rows';
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
    fontFamily: 'Rubik',
    fontWeight: 500,
    fontSize: '16px',
  },
  actionBtn: {
    textTransform: 'none',
    color: '#1F53D7',
  },
  default: {
    border: 0,
    fontWeight: 400,
    color: '#FF0303',
    margin: '0 20px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
      margin: 0,
    },
  },
}));

export default function RunPayroll() {
  const classes = useStyles();
  const theme = useTheme();

  const { payrollData } = useSelector((state) => state?.payrollData);

  let counter = 0;

  payrollData?.employeesArray?.forEach(
    (data) => (counter += Number(data.monthlySalary)),
  );

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <IconButton>
          <Info />
        </IconButton>
        <Typography
          varaint="h4"
          style={{
            fontFamily: 'OpenSansRegular',
            color: '#1F53D7',
            fontSize: 14,
          }}>
          You can View individual Payslips and make corrections if any
        </Typography>
      </div>
      <div>
        <TypographyBold
          style={{ color: '#474747', padding: '13px', fontSize: 17 }}>
          Payroll Summary
        </TypographyBold>
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            stickyHeader
            aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.cellWrapper}>Name</TableCell>
                <TableCell className={classes.cellWrapper}>
                  Gross Income
                </TableCell>
                <TableCell className={classes.cellWrapper}>Taxes</TableCell>
                <TableCell className={classes.cellWrapper}>
                  Other Deductions
                </TableCell>
                <TableCell className={classes.cellWrapper}>Take Home</TableCell>
                <TableCell className={classes.cellWrapper}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payrollData?.employeesArray?.map((row, i) => (
                <Rows key={i} row={row} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.cellWrapper}>Total</TableCell>
                <TableCell className={classes.cellWrapper} />
                <TableCell className={classes.cellWrapper}>
                  {/* NGN375,000.00 */}
                </TableCell>
                <TableCell className={classes.cellWrapper}>
                  {/* NGN3,000.00 */}
                </TableCell>
                <TableCell className={classes.cellWrapper}>
                  {`NGN ${counter.toLocaleString()}.00`}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
