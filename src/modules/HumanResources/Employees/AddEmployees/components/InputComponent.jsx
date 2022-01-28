import {
  InputAdornment,
  TextField,
  useMediaQuery,
  withStyles,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ExpandMore } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  noOptions: {
    color: '#1F53D7',
    backgroundColor: '#fff',
    fontFamily: 'Rubik',
    fontSize: 14,
  },
}));

const CssTextField = withStyles({
  root: {
    fontStyle: 'italic',
    fontFamily: 'Rubik,sans-serif',
    backgroundColor: '#fff',
    color: '#000',
    '& input + fieldset': {
      borderColor: '#ced4da',
    },
    '& .Mui-disabled': {
      color: '#000',
      cursor: 'pointer',
    },
  },
})(TextField);

export default function InputComponent({
  handleItemClose,
  menuItem,
  value,
  width,
  account,
  anchorEl,
  setAnchorEl,
  handlePopClose,
  handleChange,
  onHandleSelect,
  ...props
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));

  const location = [{ title: 'Abuja' }, { title: 'Lagos' }];

  return (
    <>
      <Autocomplete
        id="combo-box-demo"
        options={location}
        getOptionLabel={(option) => option.title}
        classes={{
          noOptions: classes.noOptions,
        }}
        onChange={onHandleSelect}
        size="small"
        clearOnBlur={false}
        noOptionsText={`Add "${value}" to work location`}
        {...props}
        renderInput={(params) => (
          <CssTextField
            variant="outlined"
            fullWidth
            onChange={handleChange}
            value={value}
            style={{
              width: matchesXs ? '100%' : width,
              margin: matchesXs ? '1rem 0' : 0,
              fontStyle: 'normal',
              fontFamily: 'Rubik',
            }}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <ExpandMore />
                </InputAdornment>
              ),
            }}
            {...params}
          />
        )}
      />
    </>
  );
}
