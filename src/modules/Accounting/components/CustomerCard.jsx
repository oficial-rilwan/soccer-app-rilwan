import { Paper } from '@material-ui/core';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '15rem',
    height: '20rem',
    padding: '.8rem',
  },
}));

const COLORS = ['#FFF', '#4400B2', '#00DC7D', '#F2994A', '#200E32'];
const RANK = ['st', 'nd', 'rd', 'th', 'th'];

export default function CustomerCard({
  name,
  email,
  invoice,
  amount,
  topCustomer,
  badge,
}) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Paper
      className={classes.paper}
      style={{
        backgroundColor: topCustomer ? '#336666' : '#F2F2F2',
        color: topCustomer ? '#fff' : '#000',
      }}>
      {
        <>
          {badge === 0 && (
            <div
              style={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                width: '6rem',
                color: '#000',
                padding: '.2rem .5rem .2rem .8rem',
              }}>
              <TypographyH5 variant="h4" style={{ fontSize: 10 }}>
                Top Customer
              </TypographyH5>
            </div>
          )}
          <TypographyBold
            style={{
              fontSize: 40,
              position: 'relative',
              left: 170,
              bottom: badge === 0 ? 30 : 14,
              width: 'min-content',
              color: COLORS[badge],
            }}>
            {badge + 1}
          </TypographyBold>
          <TypographyBold
            style={{
              fontSize: 25,
              position: 'relative',
              left: badge === 0 ? 192 : 195,
              bottom: badge === 0 ? 86 : 69,
              width: 'min-content',
              color: COLORS[badge],
            }}>
            {RANK[badge]}
          </TypographyBold>
        </>
      }
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          bottom: badge === 0 ? 50 : 32,
        }}>
        <div>
          <TypographyBold style={{ fontSize: 20 }}>{name}</TypographyBold>
          <TypographyH5 style={{ fontSize: 11 }}>{email}</TypographyH5>
        </div>
        <div style={{ margin: '2rem 0 4rem 0' }}>
          <TypographyH5
            style={{ fontSize: 16 }}>{`${invoice} Invoices Sent`}</TypographyH5>
          <TypographyH5
            style={{ fontSize: 16 }}>{`NGN ${amount}`}</TypographyH5>
        </div>
        <DefaultButton
          onClick={() => history.push('/dashboard/invoice/new')}
          style={{
            backgroundColor: topCustomer ? '#fff' : '#1F53D7',
            color: topCustomer ? '#1F53D7' : '#fff',
            border: 0,
          }}>
          <TypographyBold style={{ fontSize: 13 }}>
            Create Invoice
          </TypographyBold>
        </DefaultButton>
      </div>
    </Paper>
  );
}
