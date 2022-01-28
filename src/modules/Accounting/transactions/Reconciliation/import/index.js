import React, { useRef, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import Header from 'modules/SiteLayout/Header/Header';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import { authClient } from 'modules/authentication/requestClient';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import Lottie from 'react-lottie';
import animationData from 'modules/animations/mail.json';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import { Typography } from '@material-ui/core';
import { DialogTypography } from 'modules/components/Typography/Typography';
import { useSelector, useDispatch } from 'react-redux';
import UploadStatement from 'redux/actions/UploadStatement';
import './index.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '5%',
  },
  stepperBox: {
    background: '#FCFFFF',
    border: ' 0.5px solid #DFDFDF',
    borderRadius: '3px',
    padding: '9px 10px',
    position: 'relative',
    top: '-65px',
  },
  dialogContainer: {
    backgroundColor: '#f7fbfe61',
  },
  dialogPaper: {
    width: '31rem',
    height: '29rem',
  },
  dialogSuccess: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'inherit',
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
  recordWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '5rem',
  },
  noRecord: {
    fontFamily: 'Rubik',
    fontSize: '1rem',
    fontStyle: 'italic',
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const columns = [
  { id: 'Date', label: 'Date', minWidth: 170 },
  { id: 'Reference', label: 'Reference', minWidth: 100 },
  { id: 'Description', label: 'Description', minWidth: 120 },
  { id: 'Debit', label: 'Debit', minWidth: 120 },
  { id: 'Credit', label: 'Credit', minWidth: 120 },
];

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography
        variant="h6"
        style={{
          fontFamily: 'Rubik',
          fontWeight: 500,
          fontSize: '16.6787px',
          lineHeight: '20px',
        }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const history = useHistory();

  const [file, setFile] = useState('');
  const [csvFile, setCsvFile] = useState();
  const [csvArray, setCsvArray] = useState([]);

  const processCSV = (str, delim = ',') => {
    const headers = str.slice(0, str.indexOf('\n')).split(delim);
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');

    const newArray = rows.map((row) => {
      const values = row.split(delim);
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });

    if (
      (Array.isArray(newArray) &&
        newArray[0].Date !== '' &&
        newArray[0].Date !== undefined &&
        newArray[0].Credit !== undefined) ||
      (newArray[0].Debit !== undefined &&
        (newArray[0].Credit !== '' || newArray[0].Debit !== ''))
    ) {
      setCsvArray(newArray);
      dispatch(UploadStatement(newArray));
      return;
    }

    alert('Invalid File format');
  };

  const handleInputChange = (e) => {
    let { files } = e.target;
    setFile(files[0]?.name);
    setCsvFile(e.target.files[0]);
  };

  console.log({ csvArray });

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    history.push(`/dashboard/customers`);
  };

  const fileInput = useRef();

  const handleImport = () => {
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      processCSV(text);
    };

    reader.readAsText(file);
  };

  const onDownload = () => {
    const link = document.createElement('a');
    link.download = `bank_stmt_template.csv`;
    link.href = `/assets/docs/bank_stmt_template.csv`;
    link.click();
  };

  return (
    <>
      <Header path={path} url={'/dashboard/transactions'} pathname={pathname} />
      <ReturnBtn />

      <div className={classes.root}>
        <ul className="list-group vertical-steps">
          <li className="list-group-item completed">
            <div className={classes.stepperBox}>
              <h3>Download Template</h3>
              <p>
                Download the template locally to your device and populate the
                required fields
              </p>
              <div style={{ textAlign: 'end' }}>
                <PrimaryButton onClick={onDownload}>Download</PrimaryButton>
              </div>
            </div>
          </li>
          <li
            className="list-group-item active"
            style={{
              borderLeft: '3px solid #c4c4c4',
            }}>
            <div className={classes.stepperBox}>
              <h3>Upload Template</h3>
              <p>Upload the populated template that was downloaded</p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <TypographyH5 style={{ marginRight: '1rem', fontSize: 13 }}>
                  {file}
                </TypographyH5>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  ref={fileInput}
                  onChange={handleInputChange}
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                />
                <PrimaryButton
                  onClick={() => {
                    fileInput.current.click();
                  }}>
                  Upload
                </PrimaryButton>
              </div>
            </div>
          </li>
          <li className="list-group-item active">
            <div className={classes.stepperBox}>
              <div className={classes.tableWrapper}>
                {csvArray.length > 0 ? (
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
                                fontSize: '15px',
                                fontWeight: 400,
                                width: 148,
                                maxWidth: 150,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                              }}
                              className={classes.cellWrapper}>
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {csvArray.map((row, i) => (
                          <TableRow hover key={i} className={classes.tableRow}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  onClick={() => {}}
                                  style={{
                                    fontFamily: 'Rubik, sans-serif',
                                    backgroundColor: '#FCFFFF',
                                    fontWeight:
                                      column.id == 'name'
                                        ? '500'
                                        : column.id == 'status'
                                        ? 500
                                        : 400,
                                    fontSize: '15px',
                                    cursor: 'pointer',
                                    textTransform:
                                      column.id == 'name'
                                        ? 'capitalize'
                                        : 'none',
                                    color:
                                      column.id == 'name'
                                        ? '#1F53D7'
                                        : column.id == 'status'
                                        ? '#000'
                                        : '#000',
                                  }}>
                                  {value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                    <TypographyH5>
                      No Bank statement has been imported
                    </TypographyH5>
                  </div>
                )}
              </div>
            </div>
            <div style={{ textAlign: 'end' }}>
              {csvArray.length ? (
                <PrimaryButton
                  onClick={() => {
                    history.push('/dashboard/reconciliation/transactions');
                  }}>
                  Submit
                </PrimaryButton>
              ) : (
                <PrimaryButton onClick={handleImport}>
                  Upload Statement
                </PrimaryButton>
              )}
            </div>
          </li>
        </ul>
      </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{
          container: classes.dialogContainer,
          paper: classes.dialogPaper,
        }}
        disableBackdropClick>
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => history.push('/dashboard/customers')}>
          Import Customers
        </DialogTitle>
        <DialogContent dividers>
          <div className={classes.dialogSuccess}>
            <Lottie
              options={defaultOptions}
              height={200}
              width={200}
              isClickToPauseDisabled={true}
            />
            <DialogTypography>> Successful</DialogTypography>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
