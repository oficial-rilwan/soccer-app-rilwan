import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { InputAdornment } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  borderColor: {
    borderColor: '#ccc',
    '& :focus': {
      outline: 'none',
    },
  },
  input: {
    borderLeft: '2px solid #eee',
    paddingLeft: 5,
  },
  formHelper: {
    margin: 0,
  },
}));

export default function InputComp({
  label,
  required,
  style,
  fullWidth,
  placeholder,
  labelStyle,
  registration,
  ...props
}) {
  const classes = useStyles();
  return (
    <div style={style ? style : { padding: '.4rem 0rem' }}>
      <Typography variant="h6" style={labelStyle ? labelStyle : {}}>
        {label}
        {required ? (
          <span
            style={{
              color: '#ed1818',
              top: '2px',
              position: 'relative',
              left: '4px',
            }}>
            *
          </span>
        ) : (
          ''
        )}
      </Typography>
      <TextField
        variant="outlined"
        placeholder={placeholder ? placeholder : `Enter ${label.toLowerCase()}`}
        InputProps={{
          classes: {
            notchedOutline: classes.borderColor,
            input: registration && classes.input,
          },
          startAdornment: registration && (
            <InputAdornment position="start">{registration}</InputAdornment>
          ),
        }}
        FormHelperTextProps={{
          classes: { contained: classes.formHelper },
        }}
        {...props}
        fullWidth={fullWidth ? true : false}
      />
    </div>
  );
}
