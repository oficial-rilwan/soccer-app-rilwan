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

export default function SelectCompNew({
  value,
  label,
  handleSelectChange,
  menuItem,
  onChange,
  ...props
}) {
  const classes = useStyles();
  return (
    <Select
      labelId="country-label"
      variant="outlined"
      onChange={(el) => el.target.value}
      displayEmpty
      value={'Inventory'}
      className={classes.selectInput}
      fullWidth
      {...props}>
      <MenuItem
        disabled
        value={`Select ${label.toLowerCase()}`}
        style={{ padding: '.5rem' }}>
        <em style={{ color: '#ababab' }}>Select {label.toLowerCase()}</em>
      </MenuItem>
      {menuItem &&
        menuItem.map((item, i) => (
          <MenuItem value={item.id} key={i} style={{ padding: '.5rem' }}>
            {item.name}
          </MenuItem>
        ))}
    </Select>
  );
}
