import HeaderComp from 'modules/SiteLayout/Header/Header';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import { useEffect, useState } from 'react';
import { authClient } from 'modules/authentication/requestClient';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '5px',
    backgroundColor: '#EEF5FC',
    padding: '1rem',
    borderRadius: '5px',
    border: '1px solid #DFDFDF',
    flexGrow: 1,
    marginBottom: '4rem',
    marginTop: '1rem',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  stickyHeader: { backgroundColor: 'transparent' },
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '.6rem',
    borderRadius: '5px',
    marginTop: '1.2rem',
    marginBottom: '2rem',
  },
  tableContainer: {
    overflowX: 'auto',
    '&::-webkit-scrollbar-track': {
      webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
      borderRadius: '10px',
      backgroundColor: '#F5F5F5',
      height: '5px',
    },
    '&::-webkit-scrollbar': {
      width: '12px',
      backgroundColor: '#F5F5F5',
      height: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, .3)',
      backgroundColor: '#5559',
    },
  },
  heading: {
    fontSize: 14,
  },
  dialogContainer: {
    backgroundColor: '#f7fbfe61',
  },
  container: { marginBottom: '17px !important' },
  dialogPaper: {
    width: '36rem',
    height: '36rem',
    borderRadius: 10,
    border: '0.5px solid #878181',
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  inputAdornment: {
    color: '#878181',
  },
  dialogSuccess: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '90%',
  },
  required: {
    position: 'relative',
    top: '3px',
    left: '4px',
    color: '#f04b4b',
  },
  cellWrapper: {
    backgroundColor: '#fcffff',
    color: '#474747',
  },
  dialogContent: {
    marginTop: '4rem',
    fontFamily: 'Rubik',
    fontSize: 14,
  },
  formTitle: {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '19px',
    /* identical to box height */
    color: '#010A1B',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  formFieldWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      marginTop: '.7rem',
      justifyContent: 'flex-start',
    },
  },
  selectInput: {
    height: 42,
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#F5F6F8',
    },
    '& :focus': {
      backgroundColor: 'transparent',
    },
  },
  select: {
    padding: 12,
  },
  selectRoot: {
    height: '30rem',
  },
  popOver: {
    width: '28rem',
    height: 'auto',
  },
  text_1: {
    fontSize: 15,
    lineHeight: 1.7,
  },
  tableRow: {
    '&:last-child th, &:last-child td': {
      borderBottom: 0,
    },
  },
  deleteBtn: {
    borderRadius: '3px',
    backgroundColor: '#EB5757',
    color: '#fff',
    textTransform: 'none',
    width: '7rem',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    fontWeight: 500,
    fontFamily: 'Rubik',
    '&:hover': {
      backgroundColor: '#EB5757',
    },
  },
  cancelBtn: {
    borderRadius: '3px',
    border: '1px solid #00000033',
    backgroundColor: 'transparent',
    textTransform: 'none',
    fontWeight: 500,
    fontFamily: 'Rubik',
    width: '7rem',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    boxShadow: 'none',
  },
  endAdornment: {
    background: '#878181',
  },
  adornedStart: {
    backgroundColor: '#E0E0E0',
    color: '#000',
  },
}));

const columns = [
  { id: 'fiscalYear', label: 'Fiscal Year', minWidth: 120 },
  {
    id: 'totalAllocatedBudgetCategoryAmount',
    label: 'Amount Budgeted',
    minWidth: 100,
  },
  { id: 'amountExpended', label: 'Amount Spent', minWidth: 120 },
];

export default function ViewReport() {
  const classes = useStyles();
  const history = useHistory();

  const [values, setValues] = useState([]);

  useEffect(() => {
    authClient
      .get(
        '/api/v1/accounting/budget/overview?transactionType=outflow&fiscalYear=2021-2022',
      )
      .then(({ data }) => setValues(data?.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <HeaderComp url="/dashboard/budget" />
      <ReturnBtn />
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
                      minWidth: column.minWidth,
                      fontFamily: 'Rubik',
                      fontWeight: 500,
                      fontSize: '16px',
                      fontWeight: 700,
                    }}
                    className={classes.cellWrapper}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[values]?.map((row, i) => (
                <TableRow hover key={i} className={classes.tableRow}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <>
                        <TableCell
                          key={column.id}
                          style={{
                            fontFamily: 'Rubik, sans-serif',
                            backgroundColor: '#FCFFFF',
                            fontSize: '16px',
                            color: '#1F53D7',
                            textTransform: 'capitalize',
                            width: 148,
                            maxWidth: 150,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                          }}>
                          <p
                            style={{ cursor: 'pointer' }}
                            // onClick={() =>
                            //   history.push('/dashboard/budget/fiscal-year')
                            // }
                          >
                            {column.id === 'fiscalYear'
                              ? value?.fiscalYear
                              : value}
                          </p>
                        </TableCell>
                      </>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
