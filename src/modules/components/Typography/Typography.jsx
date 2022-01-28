import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const TypographyH5 = withStyles((theme) => ({
  root: {
    fontFamily: 'Rubik',
    fontWeight: 400,
    fontSize: 16,
  },
}))(Typography);

const TypographyBold = withStyles((theme) => ({
  root: {
    fontFamily: 'Rubik',
    fontWeight: 500,
    fontSize: 16,
  },
}))(Typography);

const DialogTypography = withStyles((theme) => ({
  root: {
    fontFamily: 'Rubik',
    fontSize: '22.2621px',
    lineHeight: '32px',
    marginTop: '2rem',
  },
}))(Typography);

export { TypographyBold, TypographyH5, DialogTypography };
