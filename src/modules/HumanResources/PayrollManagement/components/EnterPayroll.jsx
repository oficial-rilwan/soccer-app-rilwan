import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Add from '@material-ui/icons/Add';
import { MaterialDatePicker } from 'modules/components/DatePickers/Date';
import {
  Checkbox,
  ClickAwayListener,
  IconButton,
  useMediaQuery,
  Tooltip,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  Radio,
  DialogActions,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { ReactComponent as ToolTipIcon } from 'lib/assets/images/tooltip.svg';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { DefaultButton } from 'modules/components/Buttons/Defaults';

const useStyles = makeStyles((theme) => ({
  datePicker: {
    width: '100%',
  },
  cellWrapper: {
    backgroundColor: '#fcffff',
    color: '#474747',
  },
  table: {
    minWidth: 650,
  },
  tableRow: {
    '&:last-child th, &:last-child td': {
      borderBottom: 0,
    },
  },
  employeeWrapper: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  maxWidth: {
    maxWidth: 380,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 300,
    },
    backgroundColor: '#394452',
    fontFamily: 'Rubik',
    fontSize: 12,
    lineHeight: 1.5,
    padding: '.9rem',
    fontWeight: 'normal',
    color: '#fff',
    borderRadius: '11.8483px',
    boxShadow: '0px 1.8513px 5.92417px rgba(0, 0, 0, 0.25)',
  },
  tooltipArrow: {
    color: '#394452',
  },
  payrollPolicy: {
    fontSize: 15,
    color: '#1F53D7',
    cursor: 'pointer',
  },
  dialogContent: {
    margin: '.5rem 0',
  },
  dialogPaper: {
    width: '35rem',
    height: '25rem',
    maxWidth: 'inherit',
  },
  policyList: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const longText = `Enter Date in which you want your pay period to start and
end, as well as the day you want your employees to be paid.
Pay Day by default is set to the same day in which payroll
was created, you can adjust it in the policy.`;

export default function EnterPayroll({
  rows,
  handleClick,
  setProgress,
  setEmployeesRecord,
  employeesRecord,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const [dialogOpen, setDialogOpen] = useState(false);
  const columns = [
    { id: 'employee', label: 'Employee', width: 10 },
    { id: 'bonuses', label: 'Bonuses \\ Deductions', width: 250 },
    { id: 'total', label: 'Total', width: 190 },
  ];

  const [tooltipOpen, setToolTipOpen] = useState(false);
  const [policy, setPolicy] = useState({
    date: '',
    test: '',
  });

  const handleTooltipClose = () => {
    setToolTipOpen(false);
  };

  const handleTooltipOpen = () => {
    setToolTipOpen(true);
  };

  const [values, setValues] = useState({
    checked: false,
    data: {
      employeesArray: [],
      payDay: '',
      payPeriodStarts: '',
      payPeriodEnds: '',
    },
  });

  // const [radio, setRadio] = useState({
  //   active: ''
  // })

  // const handleRadio = () => {
  //   setRadio
  // }

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleDateChange = (name) => (value) => {
    setValues({
      ...values,
      data: {
        ...values.data,
        [name]: value,
      },
    });
  };

  const handleCheck = (row) => {
    values.data.employeesArray.some((item) => item.firstName == row?.firstName)
      ? setValues({
          ...values,
          data: {
            ...values.data,
            employeesArray: values.data.employeesArray.filter(
              (item) => item.firstName !== row?.firstName,
            ),
          },
        })
      : setValues({
          ...values,
          data: {
            ...values.data,
            employeesArray: [...values.data.employeesArray, row],
          },
        });
  };

  const handleCheckAll = () => {
    values.data.employeesArray.length < rows.length
      ? setValues({
          ...values,
          data: { ...values.data, employeesArray: rows },
        })
      : setValues({ ...values, data: { ...values.data, employeesArray: [] } });
  };

  let minPayPeriodEnds = new Date(values?.data.payPeriodStarts);
  minPayPeriodEnds.setDate(minPayPeriodEnds.getDate() + 1);

  // let minPayDay = new Date(values?.data.payPeriodEnds);
  // minPayDay.setDate(minPayDay.getDate() + 6);

  const handlePolicy = (id) => {
    const dummy = new Date(values.data.payDay);
    dummy.setDate(dummy.getDate() + id);
    // setPolicy({...policy, data: new Date(values.data.payDay).get})
    setValues({ ...values, data: { ...values.data, payDay: dummy } });
  };

  useEffect(() => {
    setProgress(values.data);
    setEmployeesRecord({ ...employeesRecord, data: values.data });
  }, [values.data]);

  return (
    <>
      <div>
        <div
          style={{
            margin: '10px 10px 0',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: 25,
            }}>
            <span style={{ color: '#3E3E3E', margin: '5px 0' }}>
              Pay Period Starts
            </span>
            <MaterialDatePicker
              notched
              size="medium"
              handleDateChange={handleDateChange('payPeriodStarts')}
              value={values.data.payPeriodStarts}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: 25,
            }}>
            <span style={{ color: '#3E3E3E', margin: '5px 0' }}>
              Pay Period Ends
            </span>
            <MaterialDatePicker
              notched
              size="medium"
              handleDateChange={handleDateChange('payPeriodEnds')}
              value={values.data.payPeriodEnds}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginRight: 10,
            }}>
            <span style={{ color: '#3E3E3E', margin: '5px 0' }}>Pay Day</span>
            <MaterialDatePicker
              notched
              // disablePast
              size="medium"
              handleDateChange={handleDateChange('payDay')}
              value={values.data.payDay}
            />
          </div>
          <div
            style={matchesSm ? { flex: 0 } : { flex: 1, margin: '30px 0 0' }}>
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <Tooltip
                title={longText}
                PopperProps={{
                  disablePortal: true,
                }}
                classes={{
                  tooltip: classes.maxWidth,
                  arrow: classes.tooltipArrow,
                }}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 400 }}
                onClose={handleTooltipClose}
                open={tooltipOpen}
                disableFocusListener
                disableHoverListener
                placement="right"
                arrow={matchesXs ? false : true}
                disableTouchListener>
                <IconButton onClick={handleTooltipOpen}>
                  <ToolTipIcon />
                </IconButton>
              </Tooltip>
            </ClickAwayListener>
          </div>
          <div>
            <TypographyH5
              className={classes.payrollPolicy}
              onClick={handleClickOpen}>
              Click Here to Select Payday Policy
            </TypographyH5>
          </div>
        </div>
        <TableContainer style={{ margin: '15px 0 0' }}>
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
                      fontFamily: 'Rubik',
                      fontWeight: 500,
                      fontSize: '15px',
                      color: '#474747',
                    }}
                    className={classes.cellWrapper}>
                    {column.id == 'employee' ? (
                      <label className={classes.employeeWrapper}>
                        <Checkbox
                          color="primary"
                          checked={
                            values.data.employeesArray.length === rows.length
                          }
                          onClick={handleCheckAll}
                        />
                        {column.label}
                      </label>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, i) => (
                <TableRow hover key={i} className={classes.tableRow}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        style={{
                          fontFamily: 'Rubik, sans-serif',
                          backgroundColor: '#FCFFFF',
                          fontSize: '16px',
                          paddingLeft: column.id == 'bonuses' && '4rem',
                          fontWeight:
                            column.id == 'name' || column.id == 'total'
                              ? 500
                              : 400,
                          color:
                            column.id == 'employee'
                              ? '#1F53D7'
                              : column.id == 'total'
                              ? '#000000'
                              : '#232323',
                        }}>
                        {column.id == 'bonuses' ? (
                          <IconButton
                            onClick={() =>
                              handleClick(row, row.firstName, row.lastName)
                            }>
                            <Add
                              style={{
                                color: '#1F53D7',
                                border: '3px solid',
                                borderRadius: 3,
                              }}
                            />
                          </IconButton>
                        ) : column.id == 'employee' ? (
                          <>
                            <label className={classes.employeeWrapper}>
                              <Checkbox
                                color="primary"
                                checked={values.data.employeesArray.some(
                                  (item) => item.firstName == row.firstName,
                                )}
                                onClick={() => handleCheck(row)}
                              />
                              {row.firstName} {row.lastName}
                            </label>
                          </>
                        ) : (
                          `NGN ${Number(row.monthlySalary).toLocaleString()}`
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
      <Dialog
        onClose={handleClose}
        disableBackdropClick
        classes={{
          paper: classes.dialogPaper,
        }}
        open={dialogOpen}>
        <DialogTitle>Select Pay Day Policy</DialogTitle>
        <DialogContent dividers>
          <TypographyH5>
            This is the day you would want funds to be Withdrawn from your
            account and paid to your employees.
          </TypographyH5>
          <section className={classes.dialogContent}>
            <div className={classes.policyList}>
              <Radio color="primary" onClick={() => handlePolicy(0)} />
              <TypographyH5>Pay immediately</TypographyH5>
            </div>
            <div className={classes.policyList}>
              <Radio color="primary" onClick={() => handlePolicy(2)} />
              <TypographyH5>Pay after 2 days</TypographyH5>
            </div>
            <div className={classes.policyList}>
              <Radio color="primary" onClick={() => handlePolicy(5)} />
              <TypographyH5>Pay after 5 days</TypographyH5>
            </div>
          </section>
        </DialogContent>
        <DialogActions>
          <DefaultButton onClick={handleClose}>Close</DefaultButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
