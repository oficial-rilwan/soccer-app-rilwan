import PropTypes from 'prop-types';
import ChartHeader from '../CashFlow/components/ChartHeader';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  bankContainer: {
    background: '#FCFFFF',
    border: '0.5px solid #DFDFDF',
    // height: '100%',
  },
}));

export default function BankAndCards({ data }) {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.bankContainer} elevation={0}>
        <ChartHeader heading="Bank accounts and Credit Cards" />
        <Grid container>
          {data &&
            data.map(({ bankName, savings, current }, i) => (
              <Grid item xs={12} lg={6} key={i}>
                <Paper
                  elevation={0}
                  style={{
                    background: '#F7FEFD',
                    // padding: '1rem',
                    margin: '1rem 1.5rem',
                  }}>
                  <TypographyBold component="h5" style={{ padding: '.5rem' }}>
                    {bankName}
                  </TypographyBold>
                  <div
                    style={{
                      width: '100%',
                      overflowX: 'auto',
                    }}>
                    <div
                      style={{
                        minWidth: 238,
                        justifyContent: 'space-between',
                        display: 'flex',
                        padding: '0 .5rem',
                      }}>
                      <TypographyH5>Savings</TypographyH5>
                      <TypographyBold>{`N${savings}.00`}</TypographyBold>
                    </div>
                  </div>
                  <div
                    style={{ border: '1px solid #DFDFDF', margin: '.5rem' }}
                  />
                  <div
                    style={{
                      width: '100%',
                      overflowX: 'auto',
                    }}>
                    <div
                      style={{
                        minWidth: 238,
                        justifyContent: 'space-between',
                        display: 'flex',
                        padding: '0 .5rem',
                      }}>
                      <TypographyH5>Current</TypographyH5>
                      <TypographyBold>{`N${current}.00`}</TypographyBold>
                    </div>
                  </div>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Paper>
    </>
  );
}

// BankAndCards.propTypes = {};
