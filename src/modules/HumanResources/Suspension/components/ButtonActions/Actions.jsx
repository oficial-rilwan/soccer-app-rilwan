import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const SuspendButton = withStyles((theme) => ({
  root: {
    borderRadius: 3,
    border: 0,
    background: '#1F53D7',
    color: 'white',
    width: '40%',
    fontWeight: 500,
    fontFamily: 'Rubik',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    '&:hover': {
      background: '#1F53D7',
      color: 'white',
    },
  },
  label: {
    textTransform: 'capitalize',
  },
}))(Button);
const CancelButton = withStyles((theme) => ({
  root: {
    borderRadius: '3px',
    border: '1px solid #00000033',
    background: 'transparent',
    fontWeight: 500,
    fontFamily: 'Rubik',
    width: '40%',
    boxShadow: 'none',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  label: {
    textTransform: 'capitalize',
  },
}))(Button);

export { SuspendButton, CancelButton };
