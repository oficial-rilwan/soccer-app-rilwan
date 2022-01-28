import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import ToolBar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import BrandLogo from 'lib/assets/icons/brand_logo.png';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textTransform: 'uppercase',
    color: theme.palette.primary.main,
  },
  appBar: {
    backgroundColor: '#fbfbfe',
  },
}));
export default function Menu() {
  const classes = useStyles();
  return (
    <AppBar position="static" elevation={0} className={classes.appBar}>
      <ToolBar>
        <Link to="/">
          <img src={BrandLogo} style={{ width: '7rem' }} alt="brand_logo" />
        </Link>
      </ToolBar>
    </AppBar>
  );
}
