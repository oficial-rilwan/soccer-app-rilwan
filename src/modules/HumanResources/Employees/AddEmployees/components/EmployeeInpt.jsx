import { InputAdornment, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  outlineText: {
    borderColor: '#E7E8E8',
  },
  inputField: {
    backgroundColor: '#fff',
    margin: '0rem 0 .5rem',
  },
  noBorder: {
    borderRadius: 0,
  },
  input: {
    paddingLeft: 5,
    backgroundColor: '#fff',
  },
  adornedStart: {
    backgroundColor: '#E0E0E0',
    color: '#000',
  },
  noMargin: {
    margin: 0,
    backgroundColor: '#fff',
  },
  naira: {
    color: '#878181',
  },
}));

export default function InputForEmployeePage({
  noBorder,
  naira,
  percentage,
  noMargin,
  ...props
}) {
  const classes = useStyles();
  return (
    <>
      <TextField
        className={noMargin ? classes.noMargin : classes.inputField}
        id={naira ? 'input' : percentage ? 'percentage' : null}
        InputProps={{
          classes: {
            notchedOutline: classes.outlineText,
            root: noBorder ? classes.noBorder : '',
            adornedStart: classes.adornedStart,
            inputAdornedStart: classes.input,
          },
          startAdornment: naira && (
            <InputAdornment position="start" classes={{ root: classes.naira }}>
              <label htmlFor="input">{naira}</label>
            </InputAdornment>
          ),
          endAdornment: percentage && (
            <InputAdornment position="end">
              <label htmlFor="percentage">%</label>
            </InputAdornment>
          ),
        }}
        style={{ color: '#6C6B6B' }}
        variant="outlined"
        {...props}
      />
    </>
  );
}
