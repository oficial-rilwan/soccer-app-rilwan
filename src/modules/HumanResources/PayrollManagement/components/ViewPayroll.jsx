import { TypographyBold } from 'modules/components/Typography/Typography';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import Rows from './Rows';
import { authClient } from 'modules/authentication/requestClient';
import { TypographyH5 } from 'modules/components/Typography/Typography';

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
  payStats: {
    backgroundColor: '#EEF5FC',
    border: '0.5px solid #878181',
    borderRadius: 3,
    margin: '10px 0',
    height: 50,
    width: '59rem',
    padding: '15px',
    display: 'flex',
  },
  payStatsListItem: {
    display: 'flex',
    alignItems: 'center',
    borderRight: '1px solid #000',
  },
}));

export default function ViewPayroll({ match }) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [review, setReview] = useState({
    preparedBy: '',
    reviewedBy: '',
    createdAt: '',
  });

  useEffect(() => {
    authClient
      .get(
        `/api/v1/employee/payslip/management/fetch?payRollManagementId=${match?.params?.id}`,
      )
      .then(({ data }) => setRows(data?.data))
      .catch((e) => console.log(e));
    authClient
      .get(
        `/api/v1/employee/payroll/management/fetch?payRollManagementId=${match?.params?.id}`,
      )
      .then(({ data }) =>
        setReview({
          ...review,
          preparedBy: data?.data?.issuersName,
          reviewedBy: data?.data?.issuersName,
          createdAt: data?.data?.createdAt,
        }),
      )
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <HeaderComp url="/dashboard/payroll" />
      <ReturnBtn location="/dashboard/payroll" />
      <TypographyBold
        variant="h5"
        style={{ fontSize: 17, padding: '1.5rem 0 10px' }}>
        Payroll Management
      </TypographyBold>
      <div className={classes.payStats}>
        <div className={classes.payStatsListItem}>
          <div
            style={{
              borderRadius: '50%',
              backgroundColor: '#1F53D7',
              width: 12,
              height: 12,
            }}></div>
          <TypographyH5 style={{ fontSize: 12, margin: '0 15px 0 15px' }} sty>
            {`Prepared by: ${review.preparedBy} - ${new Date(
              review.createdAt,
            ).toLocaleDateString('en-GB')}`}
          </TypographyH5>
        </div>
        <div className={classes.payStatsListItem}>
          <div
            style={{
              borderRadius: '50%',
              backgroundColor: '#1F53D7',
              width: 12,
              height: 12,
              marginLeft: 15,
            }}></div>
          <TypographyH5 style={{ fontSize: 12, margin: '0 15px 0 15px' }} sty>
            {`Reviewed by: ${review.preparedBy} - ${new Date(
              review.createdAt,
            ).toLocaleDateString('en-GB')}`}
          </TypographyH5>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              borderRadius: '50%',
              backgroundColor: '#1F53D7',
              width: 12,
              height: 12,
              marginLeft: 15,
            }}></div>
          <TypographyH5 style={{ fontSize: 12, margin: '0 15px 0 15px' }} sty>
            {`Approved by: ${review.preparedBy} - ${new Date(
              review.createdAt,
            ).toLocaleDateString('en-GB')}`}
          </TypographyH5>
        </div>
      </div>
      <div style={{ padding: '0 0 1rem' }}>
        <div className={classes.tableWrapper}>
          <TypographyBold
            style={{ color: '#474747', padding: '.8rem', fontSize: 17 }}>
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
                  <TableCell className={classes.cellWrapper}>
                    Take Home
                  </TableCell>
                  <TableCell className={classes.cellWrapper}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row, i) => (
                  <Rows key={i} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
