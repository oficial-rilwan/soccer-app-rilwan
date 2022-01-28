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
  { id: 'firstName', label: 'First Name', minWidth: 220 },
  { id: 'lastName', label: 'Last Name', minWidth: 220 },
  { id: 'middleName', label: 'Middle Name', minWidth: 220 },
  { id: 'email', label: 'Email', minWidth: 220 },
  { id: 'phone', label: 'Phone Number', minWidth: 120 },
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

export default function ImportEmployees() {
  const classes = useStyles();
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();
  const [employeesContent, setEmployeesContent] = useState({
    data: [],
  });

  const history = useHistory();

  const [file, setFile] = useState('');

  const handleInputChange = (e) => {
    let { files } = e.target;
    let userData = new FormData();
    setFile(files[0]?.name);
    files && userData.append('file', files[0]);
    authClient
      .post('/api/v1/employee/read-file', userData)
      .then(({ data }) =>
        setEmployeesContent({ ...employeesContent, data: data?.data }),
      )
      .catch((e) => console.log(e));
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    history.push(`/dashboard/employees`);
  };

  const fileInput = useRef();

  const handleImport = () => {
    employeesContent.data &&
      authClient
        .post('/api/v1/employee/import', employeesContent?.data)
        .then((res) => {
          if (res.status === 201) {
            setOpen(true);
            setTimeout(() => {
              handleClose();
              history.push(`/dashboard/employees`);
            }, 6500);
          }
        })
        .catch((e) => console.log(e));
  };

  const handleDownload = () => {
    fetch(
      'https://jureb-backend.herokuapp.com/api/v1/employee/download-template',
    )
      .then((res) => res.blob())
      .then((blob) => {
        // 2. Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Employees.csv');
        // 3. Append to html page
        document.body.appendChild(link);
        // 4. Force download
        link.click();
        // 5. Clean up and remove the link
        link.parentNode.removeChild(link);
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <Header path={path} url={'/dashboard/employees'} pathname={pathname} />
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
                <PrimaryButton onClick={handleDownload}>Download</PrimaryButton>
              </div>
            </div>
          </li>
          <li
            className="list-group-item active"
            style={{
              borderLeft:
                employeesContent?.data.length > 0 && '3px solid #c4c4c4',
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
                <PrimaryButton onClick={() => fileInput.current.click()}>
                  Upload
                </PrimaryButton>
              </div>
            </div>
          </li>
          <li className="list-group-item active">
            <div className={classes.stepperBox}>
              <div className={classes.tableWrapper}>
                {employeesContent.data.length > 0 ? (
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
                        {employeesContent?.data?.map((row, i) => (
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
                                      column.id == 'firstName'
                                        ? 'capitalize'
                                        : 'none',
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
                    <TypographyH5>No employee has been imported</TypographyH5>
                  </div>
                )}
              </div>
            </div>
            <div style={{ textAlign: 'end' }}>
              <PrimaryButton onClick={handleImport}>
                Import Employees
              </PrimaryButton>
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
          onClose={() => history.push('/dashboard/employees')}>
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
            <DialogTypography>Import Successful</DialogTypography>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
