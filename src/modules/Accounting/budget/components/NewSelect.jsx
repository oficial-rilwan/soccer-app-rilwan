import {
  InputAdornment,
  Popover,
  TextField,
  useMediaQuery,
  withStyles,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ExpandMore } from '@material-ui/icons';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { useState } from 'react';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  popOver: {
    width: '19rem',
    height: 'auto',
    padding: '.5rem',
  },
  popOverShort: {
    width: '13rem',
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

export default function NewSelect({
  handleItemClose,
  menuItem,
  value,
  width,
  account,
  popOverShort,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const popOpen = Boolean(anchorEl);

  return (
    <>
      <CssTextField
        placeholder=""
        variant="outlined"
        onClick={handleClick}
        value={value}
        disabled
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
      />
      <Popover
        open={popOpen}
        anchorEl={anchorEl}
        classes={{ paper: classes.popOver }}
        className={classNames({ [classes.popOverShort]: popOverShort })}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        {menuItem?.map((item, i) => (
          <TypographyH5
            style={{ padding: '.3rem 0', cursor: 'pointer' }}
            onClick={() => (
              handleItemClose(account ? item.accountName : item),
              setAnchorEl(null)
            )}
            key={i}>
            {account ? item.accountName : item}
          </TypographyH5>
        ))}
      </Popover>
    </>
  );
}
