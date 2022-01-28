import { makeStyles } from '@material-ui/core';
import { Select, MenuItem } from '@material-ui/core';

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
    <Select
      labelId="country-label"
      variant="outlined"
      onChange={handleSelectChange}
      displayEmpty
      value={value?.name}
      className={classes.selectInput}
      fullWidth
      {...props}>
      <MenuItem
        disabled
        value={`Select ${label.toLowerCase()}`}
        style={{ padding: '.5rem' }}>
        <em style={{ color: '#ababab' }}>Select {label.toLowerCase()}</em>
      </MenuItem>
      {value ? (
        <MenuItem value={value.name} style={{ padding: '.5rem' }}>
          {value.name}
        </MenuItem>
      ) : (
        menuItem &&
        menuItem.map((item, i) => (
          <MenuItem value={item.value} key={i} style={{ padding: '.5rem' }}>
            {item.name || item.label}
          </MenuItem>
        ))
      )}
    </Select>
  );
}
