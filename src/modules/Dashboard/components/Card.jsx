import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
  taxContainer: {
    background: '#FCFFFF',
    border: '0.5px solid #DFDFDF',
    padding: '20px 18px 8px',
    height: '100%',
  },
  taxHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  taxLink: {
    color: '#1F53D7',
    fontSize: 15,
    padding: '0 10px 0 10px',
    textTransform: 'none',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  taxHeading: {
    fontSize: 19,
  },
}));

export default function Card({
  title,
  subText,
  linkText,
  status,
  children,
  link,
  ...props
}) {
  const history = useHistory();
  const classes = useStyles();
  const handleLink = () => {
    history.push(link);
  };
  return (
    <>
      <Paper className={classes.taxContainer} elevation={0} {...props}>
        <div className={classes.taxHeader}>
          <div>
            <TypographyBold variant="h2" className={classes.taxHeading}>
              {title}
            </TypographyBold>
            {subText && (
              <TypographyH5 component="p" style={{ fontSize: 14 }}>
                {subText}
              </TypographyH5>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
            <Button
              variant="contained"
              disableElevation
              size="small"
              className={classes.taxLink}
              onClick={link && handleLink}
              style={{ fontSize: status && 13 }}>
              {linkText}
            </Button>
            {status && (
              <TypographyBold style={{ fontSize: 14, color: '#404040' }}>
                Status
              </TypographyBold>
            )}
          </div>
        </div>
        {children}
      </Paper>
    </>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  subText: PropTypes.string,
  linkText: PropTypes.string,
};
