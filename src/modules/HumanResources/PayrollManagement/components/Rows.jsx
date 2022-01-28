import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableCell from '@material-ui/core/TableCell';

import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Box from './Box';
import { useSelector } from 'react-redux';
import { authClient } from 'modules/authentication/requestClient';

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
  toggle: {
    background: '#EEF5FC',
    '&:hover': {
      background: '#EEF5FC',
    },
  },
  responsiveContainer: {
    width: '100%',
    overflowX: 'auto',
  },
  spacing: {
    justifyContent: 'space-between',
    display: 'flex',
    minWidth: 450,
    padding: '.5rem 0',
  },
  deductions: {
    color: '#EB5757',
    fontSize: '16px',
    fontWeight: 'normal',
    fontFamily: 'Rubik',
  },
  payroll: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#fff',
    padding: '.6rem',
    borderRadius: '5px 5px 3px 3px',
    margin: '1rem 0',
    marginBottom: '2rem',
  },
  cellData: {
    fontFamily: 'Rubik, sans-serif',
    backgroundColor: '#FCFFFF',
    fontSize: '16px',
    // fontWeight: column.id == 'name' ? 500 : 400,
    color: '#232323',
    textTransform: 'capitalize',
    borderBottom: 0,
  },
}));

export default function Rows({ row }) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    id: '',
  });

  const user = useSelector((state) => state?.auth?.user);
  const userId = useSelector((state) => state?.loginStats?.user?.userId);
  const googleUser = useSelector((state) => state?.loginStats?.googleUser);

  const [boxData, setBoxData] = useState({
    meta: '',
    address: '',
    businessName: '',
  });

  useEffect(() => {
    authClient
      .get(
        `/api/v1/sub-admin/profile?subAdminId=${
          user?.subAdminId || userId || googleUser?.userId
        }`,
      )
      .then(({ data }) => {
        let { meta, address, businessName } = data?.data;
        setBoxData({ ...boxData, meta, address, businessName });
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <React.Fragment>
        <TableRow hover className={classes.tableRow}>
          <TableCell className={classes.cellData}>
            {row?.firstName
              ? `${row?.firstName} ${row?.lastName}`
              : row.employeeName}
          </TableCell>
          <TableCell className={classes.cellData}>{`NGN ${Math.floor(
            Number(row.annualSalary),
          ).toLocaleString()}`}</TableCell>
          <TableCell className={classes.cellData}>
            {`NGN ${Number(
              Math.floor(row.salaryDetails?.annualTax),
            ).toLocaleString()}`}
          </TableCell>
          <TableCell className={classes.cellData}>
            {`NGN ${Math.floor(
              Number(row.salaryDetails?.totalDeductions),
            ).toLocaleString()}`}
          </TableCell>
          <TableCell className={classes.cellData}>
            {`NGN ${Math.floor(Number(row.monthlySalary)).toLocaleString()}`}
          </TableCell>
          <TableCell className={classes.cellData}>
            <IconButton
              size="small"
              classes={{
                root: classes.toggle,
              }}
              onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box data={row} boxData={boxData} />
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    </>
  );
}
