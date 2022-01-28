import { useState } from 'react';
import {
  Typography,
  Grid,
  TextField,
  useMediaQuery,
  Select,
  DialogActions,
  Checkbox,
  FormHelperText,
  FormControl,
} from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { v4 as uuidv4 } from 'uuid';
import Lottie from 'react-lottie';
import successAnimation from 'modules/animations/sucessful.json';
import QuestionCard from './QuestionCard';
import { Fade } from 'react-reveal';
import { DeleteOutline, Edit } from '@material-ui/icons';
import { DialogTypography } from 'modules/components/Typography/Typography';
import { authClient } from 'modules/authentication/requestClient';
import { Redirect } from 'react-router';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(3),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1.5),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  typo_h5: {
    color: '#1F53D7',
    fontSize: '18px',
  },
  dialogPaper: {
    width: '36rem',
    height: '41rem',
    maxWidth: 'inherit',
  },
  paragraph: {
    fontSize: 15,
    padding: '.6rem 0',
    color: '#404040',
  },
  progress: {
    borderRadius: '2px',
    height: '4px',
    width: '47px',
    background: '#1f53d7',
    margin: '1rem 0 2.5rem',
  },
  tableWrapper: {
    border: '1px solid #DFDFDF',
    backgroundColor: '#FCFFFF',
    padding: '2rem',
    borderRadius: '5px',
    marginBottom: '2rem',
    [theme.breakpoints.down('xs')]: {
      padding: '1.5rem',
    },
  },
  primaryBtn: {
    margin: '0 0 2rem',
  },
  grid_2_wrapper: {
    height: '30rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    padding: '0 .5rem 0 0',
  },
  selectPaper: {
    borderRadius: '8px',
  },
  checked: {
    color: '#1F53D7 !important',
  },
  questionCard: {
    display: 'flex',
    flexDirection: 'column',
  },
  popOver: {
    boxShadow:
      '0px 0px 0px rgba(89, 88, 97, 0.14), 0px 6px 13px rgba(97, 97, 97, 0.14)',
    borderRadius: '12px',
    width: '8rem',
    cursor: 'pointer',
  },
  list_1: {
    color: '#000000ad',
    backgroundColor: '#56CCF2',
    borderRadius: 8,
  },
  list_2: {
    color: '#EB5757',
  },
  typography_1: {
    padding: theme.spacing(2),
    fontFamily: 'Rubik',
    fontSize: 14,
  },
  fieldTypeWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '.5rem 3rem',
    margin: '3rem 0',
    alignItems: 'center',
  },
  typography_2: {
    padding: theme.spacing(2),
    fontFamily: 'Rubik',
    fontSize: 14,
  },
  dialogSuccess: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    height: '25rem',
  },
  questionWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '3rem 0',
  },
  selectItem: {
    '&:hover': {
      backgroundColor: '#56CCF2',
      borderRadius: 5,
    },
  },
}));

const DialogButtonActions = withStyles({
  root: {
    padding: '1rem',
  },
})(DialogActions);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography
        variant="h6"
        style={{
          fontFamily: 'Rubik',
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
    padding: '1.2rem 2rem',
    [theme.breakpoints.down('xs')]: {
      padding: '8px 24px',
    },
  },
}))(MuiDialogContent);

const SelectItem = withStyles((theme) => ({
  root: {
    fontFamily: 'Rubik',
    fontSize: 15,
    padding: '.7rem',
  },
}))(MenuItem);

export default function Questions({ employeeRecord }) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const [success, setSuccess] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [values, setValues] = useState({
    questions: [],
    fieldType: '',
    mandatory: false,
    question: '',
    data: [],
    options: [],
    surveyUsers: employeeRecord?.employeesData,
    startDate: employeeRecord?.startDate,
    endDate: employeeRecord?.endDate,
    name: employeeRecord?.name,
    periodicity: employeeRecord?.periodicity,
    showCard: false,
    isEditing: false,
  });
  const anchorOpen = Boolean(anchorEl);

  const handleInputChange = (e, idx) => {
    const value = e.target.value;
    console.log(values.data);
    // values.options.length < 1 && setValues({ ...values, data: [value] });
    // const updatedForms = values.data.map((form, i) =>
    //   i == idx ? value : form,
    // );
    // setValues((data) => ({ ...data, data: updatedForms }));
  };

  const newForm = {
    options: '',
  };

  const addNewForm = () => {
    const createdForm = { ...newForm };
    setValues({
      ...values,
      data: [...values.data, createdForm],
    });
  };

  const removeForm = (index) => {
    const updatedForm = values.data.filter((_, idx) => {
      return index != idx;
    });
    setValues({ ...values, data: updatedForm });
  };

  const handleClickOpen = () => {
    setSuccess(false);
    setOpen(true);
    setValues({
      ...values,
      fieldType: '',
      mandatory: false,
      question: '',
      isEditing: false,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setValues({
      ...values,
      question: value,
    });
  };

  const handleCheckBox = () => {
    setValues({
      ...values,
      mandatory: !values.mandatory,
    });
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setValues({ ...values, fieldType: value });
  };

  const handleQuestion = () => {
    console.log(values);
    let newState = {
      fieldType: values.fieldType,
      mandatory: values.mandatory,
      question: values.question,
      options: values.data,
      id: uuidv4(),
    };

    newState?.fieldType && newState?.question && newState?.id
      ? (setValues({
          ...values,
          questions: [...values.questions, newState],
          data: [...values.data, newState],
          ...newState,
          showCard: true,
        }),
        setOpen(false))
      : setOpen(false);
  };

  const handleAnchorOpen = (id) => {
    let newData = values.data.filter((item, i) => item.id !== id);
    setValues({ ...values, data: newData });
    setAnchorEl(null);
  };

  const handleAnchorClick = (data) => (event) => {
    setValues({ ...values, id: data.id, currentData: data });
    setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (data) => {
    setValues({ ...values, ...data, isEditing: true });
    setOpen(true);
    setAnchorEl(null);
  };

  const handleEditing = () => {
    const elementIndex = values.data.findIndex((item) => item.id == values?.id);
    let newArray = [...values.data];
    newArray[elementIndex] = {
      ...newArray[elementIndex],
      fieldType: values.fieldType,
      mandatory: values.mandatory,
      question: values.question,
      id: values?.id,
    };
    newArray[elementIndex]?.fieldType &&
    newArray[elementIndex]?.question &&
    newArray[elementIndex]?.id
      ? (setValues({
          ...values,
          data: newArray,
          showCard: true,
        }),
        setOpen(false))
      : setOpen(false);
  };

  const handleSuccess = () => {
    let {
      questions,
      surveyUsers,
      startDate,
      endDate,
      name,
      periodicity,
    } = values;
    questions.map((item) => delete item.id);
    values?.data?.length
      ? authClient
          .post(`/api/v1/employee/performance/management/create`, {
            questions,
            surveyUsers,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            name,
            periodicity,
          })
          .then((res) => {
            if (res.status === 201) {
              setOpen(true),
                setSuccess(true),
                setValues({ ...values, data: [], isEditing: false });
              setTimeout(() => {
                handleClose();
                setRedirect(true);
              }, 6500);
            }
          })
          .catch((e) => console.log(e))
      : null;
  };

  if (redirect) {
    return <Redirect to="/dashboard/performance-evaluation" />;
  }

  return (
    <div>
      <section className={classes.tableWrapper}>
        <Grid container spacing={10}>
          <Grid item xs={12} md={4}>
            <TypographyH5 className={classes.typo_h5}>Questions</TypographyH5>
            <Typography component="p" className={classes.paragraph}>
              Add the questions that the participants will answer.
            </Typography>
            <div className={classes.progress} />
            <PrimaryButton onClick={handleClickOpen}>
              Add Question
            </PrimaryButton>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            className={
              values?.showCard && values.data.length > 0
                ? classes.questionCard
                : classes.grid_2_wrapper
            }>
            {values?.showCard && values?.data?.length > 0 ? (
              values.data.map((item) => {
                let idText = values.data.findIndex((v) => v == item);
                idText++;
                return (
                  <div key={item.id}>
                    <Fade>
                      <QuestionCard
                        data={item}
                        handleClick={handleAnchorClick}
                        idText={idText}
                      />
                    </Fade>
                  </div>
                );
              })
            ) : (
              <TypographyH5
                style={{ color: '#878181', fontSize: 15, textAlign: 'center' }}>
                You have not added any question yet
              </TypographyH5>
            )}
          </Grid>
        </Grid>
        <Popover
          elevation={0}
          open={anchorOpen}
          anchorEl={anchorEl}
          onClose={handleAnchorClose}
          classes={{
            paper: classes.popOver,
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}>
            <li className={classes.list_1}>
              <Typography
                className={classes.typography_1}
                onClick={() => handleEdit(values?.currentData)}>
                Edit
              </Typography>
            </li>
            <li
              className={classes.list_2}
              onClick={() => handleAnchorOpen(values?.id)}>
              <Typography className={classes.typography_2}>Delete</Typography>
            </li>
          </ul>
        </Popover>
      </section>
      <PrimaryButton className={classes.primaryBtn} onClick={handleSuccess}>
        Send Survey
      </PrimaryButton>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        disableBackdropClick
        classes={{
          paper: classes.dialogPaper,
        }}
        open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {values?.isEditing
            ? 'Edit Question'
            : success
            ? 'Send Survey'
            : 'Add Question'}
        </DialogTitle>
        {success ? (
          <DialogContent dividers>
            <div className={classes.dialogSuccess}>
              <Lottie
                options={defaultOptions}
                height={300}
                width={300}
                isClickToPauseDisabled={true}
              />
              <DialogTypography>Survey Sent</DialogTypography>
            </div>
          </DialogContent>
        ) : (
          <>
            <DialogContent dividers>
              <section>
                <TypographyH5>
                  {values?.isEditing
                    ? 'Edit Question to the feedback form'
                    : 'Add question to the feedback form '}
                </TypographyH5>
                <div>
                  <div className={classes.questionWrapper}>
                    <TypographyH5>Question:</TypographyH5>
                    <div
                      style={{
                        width: matchesXs ? '100%' : '78%',
                        margin: matchesXs ? '10px 0 ' : '0 0 0 35px',
                      }}>
                      <TextField
                        onChange={handleChange}
                        variant="outlined"
                        value={values.question}
                        fullWidth
                        multiline
                        rows={5}
                      />
                      <label
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          margin: '2rem 0',
                        }}>
                        <Checkbox
                          classes={{
                            root: classes.checkbox,
                            checked: classes.checked,
                          }}
                          checked={values.mandatory}
                          onClick={handleCheckBox}
                          color="primary"
                          disableRipple
                        />
                        <TypographyH5>Make mandatory</TypographyH5>
                      </label>
                    </div>
                  </div>
                  <FormControl
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}>
                    <TypographyH5>Field Type:</TypographyH5>
                    <div
                      style={{
                        margin: matchesXs ? '10px 0' : '0 0 0 35px',
                        width: matchesXs ? '100%' : '76.5%',
                      }}>
                      <Select
                        variant="outlined"
                        value={values.fieldType}
                        onChange={handleSelectChange}
                        MenuProps={{
                          PaperProps: {
                            classes: {
                              rounded: classes.selectPaper,
                            },
                          },
                        }}
                        fullWidth
                        displayEmpty>
                        <SelectItem value="" disabled>
                          <em>Select</em>
                        </SelectItem>
                        <SelectItem className={classes.selectItem} value="text">
                          Text
                        </SelectItem>
                        <SelectItem
                          className={classes.selectItem}
                          value="single option">
                          Single Option
                        </SelectItem>
                      </Select>
                      {values?.fieldType.includes('option') && (
                        <FormHelperText style={{ margin: '5px 0' }}>
                          Single choice allows you to select a single option
                          from predefined options in a dropdown.
                        </FormHelperText>
                      )}
                    </div>
                  </FormControl>
                  {values.fieldType.includes('option') &&
                    values.data.map((_, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          margin: '15px 0',
                        }}>
                        <TextField
                          variant="outlined"
                          style={{ width: matchesXs ? '100%' : 'auto' }}
                          onChange={(e) => handleInputChange(e, idx)}
                        />
                        <IconButton onClick={() => removeForm(idx)}>
                          <DeleteOutline />
                        </IconButton>
                      </div>
                    ))}
                </div>
                <div
                  style={{
                    marginRight: matchesXs ? 0 : '10rem',
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                  {values.fieldType.includes('option') && (
                    <PrimaryButton
                      onClick={addNewForm}
                      style={{
                        backgroundColor: '#fff',
                        color: '#878181',
                        fontWeight: 'normal',
                        border: '1px solid #878181',
                        margin: '10px 0',
                      }}>
                      Add Option
                    </PrimaryButton>
                  )}
                </div>
              </section>
            </DialogContent>
            <DialogButtonActions>
              <PrimaryButton
                onClick={values?.isEditing ? handleEditing : handleQuestion}
                endIcon={values?.isEditing ? <Edit /> : ''}>
                {values?.isEditing ? 'Edit Question' : 'Add Question'}
              </PrimaryButton>
            </DialogButtonActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
