import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import LeftArrow from '@material-ui/icons/KeyboardBackspace';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  backBtn: {
    background: 'rgb(238, 245, 252)',
    [theme.breakpoints.down('xs')]: {
      width: '2.5rem',
      height: '2.5rem',
    },
  },
}));

export default function ReturnBtn({ location }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <IconButton
        className={classes.backBtn}
        onClick={() => (location ? history.push(location) : history.goBack())}>
        <LeftArrow style={{ color: '#323232', fontSize: '1.2rem' }} />
      </IconButton>
    </>
  );
}
