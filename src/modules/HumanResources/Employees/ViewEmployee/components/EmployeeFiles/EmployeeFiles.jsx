import {
  Typography,
  Paper,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  Snackbar,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useEffect, useRef, useState } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { GetAppOutlined, DeleteForeverOutlined } from '@material-ui/icons';
import CloseIcon from '@material-ui/icons/Close';
import { authClient } from 'modules/authentication/requestClient';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: 'Rubik',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    padding: '0rem 0rem 1.5rem',
  },
  title_2: {
    fontFamily: 'Rubik',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '21px',
    paddingTop: '2.4rem',
    marginBottom: '1rem',
  },
  required: {
    color: '#FF0303',
    verticalAlign: 'sub',
    margin: '.3rem',
  },
  formTitle: {
    fontFamily: 'Rubik, sans-serif',
    fontWeight: 'normal',
    fontSize: '15px',
    lineHeight: '19px',
    color: '#010A1B',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  fileBtn: {
    textTransform: 'none',
    backgroundColor: '#fff',
    fontFamily: 'Rubik',
    borderRadius: '2px',
    fontWeight: 400,
    '&:hover': {
      backgroundColor: '#fff',
      borderRadius: '2px',
    },
  },
  chosenFile: {
    fontFamily: 'Rubik',
    fontStyle: 'italic',
    fontSize: '14px',
    lineHeight: '17px',
  },
  fileSize: {
    fontFamily: 'Rubik',
    fontSize: '14px',
    lineHeight: '17px',
    paddingTop: '.5rem',
  },
  textArea: {
    backgroundColor: '#fff',
    margin: '0 .8rem',
    padding: 0,
    marginLeft: '1rem',
    width: '24rem',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin: 0,
    },
  },
  dialog: {
    background: '#fff',
    /* tab shade */
    boxShadow: '0px 8px 24px 0.694947px rgba(51, 63, 81, 0.15)',
    borderRadius: '7.85156px',
    width: '40rem',
    height: '20rem',
    [theme.breakpoints.down('xs')]: {
      height: '25rem',
    },
  },
  dialogTitle: {
    fontFamily: 'Rubik',
    fontSize: 15,
  },
  dialogContent: {
    marginTop: '4rem',
    fontFamily: 'Rubik',
    fontSize: 14,
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
  tableRow: {
    '&:last-child th, &:last-child td': {
      borderBottom: 0,
    },
  },
  btnRoot: {
    '&.Mui-disabled': {
      opacity: '.5',
      backgroundColor: '#EB5757',
      color: '#fff',
    },
  },
}));

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(4),
    background: '#EB5757',
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: '#fff',
    marginTop: 8,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" className={useStyles().dialogTitle}>
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
    textAlign: 'center',
  },
}))(MuiDialogContent);

export default function EmployeeFiles({ match }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [employeeUploadId, setEmployeeUploadId] = useState('');
  const [disabled, setDisabled] = useState(false);

  const handleClickOpen = (id) => {
    setDialogOpen(true);
    setEmployeeUploadId(id);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const columns = [
    {
      id: 'file',
      label: 'All Files',
      minWidth: matchesXs ? 170 : 250,
    },
    {
      id: 'created_at',
      label: 'Upload Date',
      minWidth: matchesXs ? 200 : 240,
    },
    {
      id: 'bytes',
      label: 'File Size',
      minWidth: matchesXs ? 200 : 220,
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: matchesXs ? 150 : 150,
    },
  ];

  const [values, setValues] = useState({
    data: {
      file: '',
      description: '',
    },
  });

  const [refresh, setRefresh] = useState(false);
  const [details, setDetails] = useState([]);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };

  const handleUpload = () => {
    setDisabled(true);
    let userData = new FormData();
    values?.data?.description &&
      userData.append('description', values?.data?.description);
    values?.data?.file && userData.append('file', values?.data?.file);
    authClient
      .post(
        `/api/v1/employee/file/upload?employeeId=${match?.params?.id}`,
        userData,
      )
      .then((res) => {
        if (res.status == 200 || 201) {
          setDisabled(false);
          setRefresh(!refresh);
          setValues({
            ...values,
            data: { ...values.data, description: '', file: '' },
          });
        }
      })
      .catch((e) => {
        setDisabled(false);
        console.log(e);
      });
  };

  const handleDownload = (id, name) => () => {
    fetch(
      `https://jureb-backend.herokuapp.com/api/v1/employee/file/download?employeeUploadId=${id}`,
    )
      .then((res) => res.blob())
      .then((blob) => {
        // 2. Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', name);
        // 3. Append to html page
        document.body.appendChild(link);
        // 4. Force download
        link.click();
        // 5. Clean up and remove the link
        link.parentNode.removeChild(link);
      })
      .catch((e) => console.error(e));
  };

  const handleDelete = () => {
    setDisabled(true);
    authClient
      .delete(
        `/api/v1/employee/file/delete?employeeUploadId=${employeeUploadId}`,
      )
      .then((res) => {
        if (res.status == 200 || 201) {
          setRefresh(!refresh);
          setDisabled(false);
          setDialogOpen(false);
        }
      })
      .catch((e) => {
        setDisabled(false);
        console.log(e);
      });
  };

  const handleInputChange = (name) => (e) => {
    let { value } = e.target;
    let { files } = e.target;
    switch (name) {
      case 'file':
        files[0].size >= 20000000
          ? (setSnackOpen(true),
            setValues({
              ...values,
              error: 'File exceeds limit',
              data: { ...values.data, file: '' },
            }))
          : setValues({
              ...values,
              data: { ...values.data, [name]: files[0] },
            });
        break;
      case 'description':
        setValues({ ...values, data: { ...values.data, [name]: value } });
    }
  };

  function bytesToSize(bytes) {
    var sizes = ['bytes', 'kb', 'mb', 'gb', 'tb'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }

  useEffect(() => {
    authClient
      .get(`/api/v1/employee/file/fetch?employeeId=${match?.params?.id}`)
      .then(({ data }) => setDetails(data?.data))
      .catch((e) => console.log(e));
  }, [refresh]);

  const fileInput = useRef();

  return (
    <>
      <section>
        <Paper
          style={{
            height: 'auto',
            backgroundColor: '#FCFFFF',
            padding: '1rem',
            border: '0.5px solid #DFDFDF',
          }}>
          <Typography variant="h3" className={classes.title}>
            Upload your employee's documents such as contracts, forms, and
            emails.
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Typography variant="h6" className={classes.formTitle}>
              File Name:
              <span className={classes.required}>*</span>
            </Typography>
            <div style={{ padding: '1rem 0 0', marginLeft: '1rem' }}>
              <input
                accept=".pdf"
                type="file"
                style={{ display: 'none' }}
                ref={fileInput}
                onChange={handleInputChange('file')}
              />
              <Button
                variant="contained"
                size="small"
                disableElevation
                onClick={() => fileInput.current.click()}
                className={classes.fileBtn}>
                Choose file
              </Button>
              <Typography variant="h6" className={classes.fileSize}>
                <b>20MB</b> file limit size
              </Typography>
            </div>
            <div style={matchesXs ? { display: 'none' } : {}}>
              <Typography variant="h6" className={classes.chosenFile}>
                {values?.data?.file ? values.data.file.name : 'No file chosen'}
              </Typography>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              margin: '3rem 0',
              flexDirection: matchesXs ? 'column' : 'row',
            }}>
            <Typography variant="h6" className={classes.formTitle}>
              Description:
              <span className={classes.required}>*</span>
            </Typography>
            <div>
              <TextField
                placeholder={'Enter description...'}
                value={values.data?.description}
                multiline
                variant="outlined"
                onChange={handleInputChange('description')}
                rows={10}
                className={classes.textArea}
                inputProps={{ maxLength: 350 }}
              />
              <div>
                <Button
                  variant="contained"
                  style={{
                    fontFamily: 'Rubik',
                    textTransform: 'none',
                    backgroundColor: '#2f49d0',
                    color: '#fff',
                    marginTop: '2rem',
                  }}
                  disableElevation
                  disabled={disabled}
                  onClick={handleUpload}>
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </Paper>
      </section>
      <Typography variant="h3" className={classes.title_2}>
        Uploaded Documents
      </Typography>
      {details?.length > 0 ? (
        <div
          style={{
            backgroundColor: '#FCFFFF',
            border: '1px solid #DFDFDF',
            borderRadius: 5,
          }}>
          <TableContainer>
            <Table
              stickyHeader
              aria-label="sticky table"
              style={{
                padding: '.6rem 1.5rem',
                marginTop: '1rem',
              }}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        fontFamily: 'Rubik, sans-serif',
                        backgroundColor: '#FCFFFF',
                        fontWeight: 500,
                        fontSize: matchesSm ? '0.875rem' : '16px',
                        color: '#000',
                        borderBottom: '2px solid #DFDFDF',
                        // cursor: 'pointer',
                      }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {details?.map((row, i) => (
                  <TableRow hover key={i} className={classes.tableRow}>
                    {columns.map((column, i) => {
                      const value = row.meta[column.id];
                      const name = row.fileName.fileName;
                      return (
                        <TableCell
                          key={i}
                          align={column.align}
                          style={{
                            fontFamily: 'Rubik, sans-serif',
                            backgroundColor: '#FCFFFF',
                            fontWeight: 400,
                            fontSize: matchesSm ? '0.875rem' : '16px',
                            padding: '2px 5px',
                            // borderBottom: '1px solid #C4C4C4',
                            textTransform: 'capitalize',
                          }}>
                          {column.id == 'action' ? (
                            <div>
                              <IconButton
                                onClick={handleDownload(
                                  row.employeeUploadId,
                                  name,
                                )}>
                                <GetAppOutlined />
                              </IconButton>
                              <IconButton
                                onClick={() =>
                                  handleClickOpen(row?.employeeUploadId)
                                }>
                                <DeleteForeverOutlined />
                              </IconButton>
                            </div>
                          ) : column.id == 'file' ? (
                            name
                          ) : column.id == 'created_at' ? (
                            new Date(value).toLocaleDateString('en-GB')
                          ) : column.id == 'bytes' ? (
                            bytesToSize(value)
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
      ) : (
        <div style={{ textAlign: 'center' }}>
          <TypographyBold>No uploaded documents found</TypographyBold>
        </div>
      )}
      <Dialog
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={dialogOpen}
        classes={{
          paper: classes.dialog,
        }}
        disableBackdropClick>
        <DialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
          Delete File
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom className={classes.dialogContent}>
            Are you sure you want to delete this File?
          </Typography>
          <div
            style={{
              display: 'flex',
              flexDirection: matchesXs ? 'column' : 'row',
              justifyContent: 'flex-end',
              margin: '2rem',
            }}>
            <Button
              variant="contained"
              className={classes.deleteBtn}
              disableElevation
              style={{ marginRight: matchesXs ? '.5rem' : '1.5rem' }}
              disabled={disabled}
              classes={{
                root: classes.btnRoot,
              }}
              onClick={handleDelete}>
              Delete
            </Button>
            <Button
              variant="contained"
              disableElevation
              className={classes.cancelBtn}
              disabled={disabled}
              style={{ marginLeft: matchesXs ? '.5rem' : '1.5rem' }}
              onClick={handleDialogClose}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity="error">
          {values.error}
        </Alert>
      </Snackbar>
    </>
  );
}
