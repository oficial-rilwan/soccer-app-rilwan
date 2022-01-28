import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const PrimaryButton = withStyles((theme) => ({
  root: {
    borderRadius: 5,
    border: 0,
    background: '#1F53D7',
    color: '#fff',
    fontWeight: 500,
    padding: '.5rem 1rem',
    fontFamily: 'Rubik',
    padding: '6px 20px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    '&:hover': {
      background: '#1F53D7',
      color: '#fff',
    },
  },
  label: {
    textTransform: 'capitalize',
  },
}))(Button);

const DefaultButton = withStyles((theme) => ({
  root: {
    borderRadius: '3px',
    border: '1px solid #00000033',
    background: 'transparent',
    fontWeight: 500,
    fontFamily: 'Rubik',
    padding: '6px 20px',
    boxShadow: 'none',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  label: {
    textTransform: 'capitalize',
  },
}))(Button);

export { PrimaryButton, DefaultButton };
