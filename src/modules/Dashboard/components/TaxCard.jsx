import { IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { CalendarTodayOutlined } from '@material-ui/icons';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import { makeStyles } from '@material-ui/core/styles';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    backgroundColor: '#EEF5FC',
    border: '0.170277px solid #8781814d',
    borderRadius: '2.5px',
    padding: '.5rem',
    margin: '1rem 0',
  },
  taxType: {
    color: '#828282',
    fontSize: 12,
  },
  actionBtns: {
    fontSize: 12,
    margin: '0 .2rem',
  },
  actionBtns_pay: {
    backgroundColor: '#007DFF',
    fontSize: 12,
    margin: '0 .2rem',
  },
  taxDuration: {
    color: 'rgba(40, 40, 40, 0.72)',
    fontSize: 11,
  },
  taxAmount: {
    color: '#282828',
    fontSize: 19,
    padding: '7px 0',
    overflow: 'overlay',
  },
  subContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  taxDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: '0 2px',
  },
  calendar: {
    width: 20,
    height: 20,
    color: '#00DC7D',
  },
  calendar_2: {
    color: '#EB5757',
    width: 20,
    height: 20,
  },
  month: {
    fontSize: 11,
    color: '#00DC7D',
  },
  month_2: {
    color: '#EB5757',
    fontSize: 11,
  },
  btnWrapper: {
    display: 'flex',
    gap: '0 7px',
    [theme.breakpoints.down('sm')]: { width: '100%', padding: '0.5rem 0 0' },
  },
}));

export default function TaxCard({
  taxType,
  taxDuration,
  taxAmount,
  month,
  status,
}) {
  const classes = useStyles();
  return (
    <>
      <div>
        <Paper className={classes.paperContainer} elevation={0}>
          <TypographyH5 className={classes.taxType}>{taxType}</TypographyH5>
          <TypographyH5 className={classes.taxDuration}>
            {`For the Month of ${taxDuration}`}
          </TypographyH5>
          <TypographyBold className={classes.taxAmount}>
            {`NGN ${taxAmount}.00`}
          </TypographyBold>
          <div className={classes.subContainer}>
            <div className={classes.taxDetails}>
              <IconButton size="small" disableRipple>
                <CalendarTodayOutlined
                  className={
                    taxType == 'PAYE'
                      ? classes.calendar
                      : taxType == 'Withholding Tax'
                      ? classes.calendar_2
                      : ''
                  }
                />
              </IconButton>
              <TypographyH5
                className={
                  taxType == 'PAYE'
                    ? classes.month
                    : taxType == 'Withholding Tax'
                    ? classes.month_2
                    : ''
                }>
                {status == 'paid' ? `${month} * paid` : `${month}`}
              </TypographyH5>
            </div>
            <div className={classes.btnWrapper}>
              {status == 'paid' ? (
                <DefaultButton className={classes.actionBtns}>
                  Summary
                </DefaultButton>
              ) : (
                <PrimaryButton className={classes.actionBtns_pay}>
                  Pay now
                </PrimaryButton>
              )}
              <DefaultButton className={classes.actionBtns}>
                Details
              </DefaultButton>
            </div>
          </div>
        </Paper>
      </div>
    </>
  );
}
