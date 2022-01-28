import { makeStyles } from '@material-ui/core';
import {
  Select,
  FormHelperText,
  FormControl,
  MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  selectInput: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#F5F6F8',
    },
    '& :focus': {
      backgroundColor: 'transparent',
    },
  },
}));

export default function SelectComp({
  value,
  label,
  handleSelectChange,
  menuItem,
  ...props
}) {
  const classes = useStyles();
  return (
    <>
      <Select
        labelId="country-label"
        variant="outlined"
        onChange={handleSelectChange}
        value={value}
        className={classes.selectInput}
        displayEmpty
        fullWidth
        {...props}>
        <MenuItem disabled value="" style={{ padding: '.5rem' }}>
          <em>Select {label.toLowerCase()}</em>
        </MenuItem>
        {menuItem &&
          menuItem.map((item, i) => (
            <MenuItem value={item.value} key={i} style={{ padding: '.5rem' }}>
              {item.label}
            </MenuItem>
          ))}
      </Select>
    </>
  );
}
