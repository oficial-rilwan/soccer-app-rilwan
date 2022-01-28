import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { TypographyH5 } from 'modules/components/Typography/Typography';

const useStyles = makeStyles(() => ({
  expenseContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1.8rem 0',
    gap: '1rem',
    width: '100%',
    overflowX: 'auto',
  },
  wrapper: {
    minWidth: 148,
  },
  heading: {
    fontSize: 14,
  },
  subHeading: {
    fontSize: 13,
  },
}));

export default function ExpenseContainer({ title, company, amount, date }) {
  const classes = useStyles();
  return (
    <div className={classes.expenseContainer}>
      <div className={classes.wrapper}>
        <TypographyBold variant="h4" className={classes.heading}>
          {title}
        </TypographyBold>
        <TypographyH5 component="p" className={classes.subHeading}>
          {company}
        </TypographyH5>
      </div>
      <div style={{ minWidth: 95 }}>
        <TypographyBold variant="h4" className={classes.heading}>
          {`N${amount}`}
        </TypographyBold>
        <TypographyH5 component="p" className={classes.subHeading}>
          {date}
        </TypographyH5>
      </div>
    </div>
  );
}

ExpenseContainer.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
