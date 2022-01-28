import {
  InputAdornment,
  ListSubheader,
  MenuItem,
  Popover,
  TextField,
  useMediaQuery,
  withStyles,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ExpandMore, SearchOutlined } from '@material-ui/icons';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  popOver: {
    width: '19rem',
    height: 'auto',
    padding: '.5rem',
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

export default function AccountSelect({
  handleItemClose,
  menuItem,
  value,
  width,
  account,
  header,
  ...props
}) {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  console.log({ menuItem });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const popOpen = Boolean(anchorEl);

  const handleSearch = (e) => {
    let { value } = e.target;
    setSearchTerm(value);
  };

  // const searchedItems = menuItem.filter((item) => {
  //   let title = `${item.title}`;
  //   const titleMatch = title
  //     .trim()
  //     .toLowerCase()
  //     .includes(searchTerm.trim().toLowerCase());
  //   const itemMatch = item.data.some((item) =>
  //     item.accountName.toLowerCase().includes(searchTerm.toLowerCase()),
  //   );
  //   return titleMatch || itemMatch;
  // });

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
        {...props}
      />
      <Popover
        open={popOpen}
        anchorEl={anchorEl}
        classes={{
          paper: classes.popOver,
        }}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <div
          style={{
            textAlign: 'center',
            borderBottom: '1px solid #eee',
            padding: '0 0 .5rem',
          }}>
          <TypographyBold>{header ? header : 'Accounts'}</TypographyBold>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '.5rem',
          }}>
          <CssTextField
            placeholder="Search"
            variant="outlined"
            onChange={handleSearch}
            size="small"
            style={{
              width: matchesXs ? '100%' : '17rem',
              margin: matchesXs ? '1rem 0' : 0,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined style={{ color: '#878181' }} />
                </InputAdornment>
              ),
            }}
          />
        </div>
        {menuItem?.map((item, i) => [
          <ListSubheader key={i} disableSticky>
            <TypographyBold
              style={{ color: '#000', textTransform: 'capitalize' }}>
              {item.title}
            </TypographyBold>
          </ListSubheader>,
          item.data.map((content, idx) => (
            <MenuItem
              onClick={(e) => (handleItemClose(content), setAnchorEl(null))}
              style={{ padding: '.2rem 2rem' }}
              key={idx}
              value={content.accountName}>
              <TypographyH5 style={{ fontSize: 15 }}>
                {content.accountName}
              </TypographyH5>
            </MenuItem>
          )),
        ])}
      </Popover>
    </>
  );
}
