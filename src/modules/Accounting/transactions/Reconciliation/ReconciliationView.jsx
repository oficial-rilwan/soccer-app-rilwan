import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Header from 'modules/SiteLayout/Header/Header';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import {
  TypographyBold,
  TypographyH5,
} from 'modules/components/Typography/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import LockOpen from '@material-ui/icons/LockOpen';
import Visibility from '@material-ui/icons/Visibility';
import TransactionDetails from './components/TransactionDetails';
import TransactionCreation from './components/TransactionCreation';
import { authClient } from 'modules/authentication/requestClient';
import { useSelector, useDispatch } from 'react-redux';
import Button from './components/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '2%',
  },
  match: {
    background: '#27AE60',
    borderRadius: '2.57px',
    color: '#fff',
    padding: '1rem',
    cursor: 'pointer',
  },
  balContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  balActionBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-end',
      marginTop: '1rem',
    },
  },

  reviewLine: {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '15px',
    color: '#1F53D7',
  },
  btn: {
    background: '#E0E0E0',
    border: '0.5px solid rgba(40, 40, 40, 0.72)',
    boxSizing: 'border-box',
    borderRadius: '2.12121px',
    padding: '.7rem',
    cursor: 'pointer',
    marginRight: '.5rem',
  },
  balanceCard: {
    background: '#EEF5FC',
    border: '1.19064px solid #DFDFDF',
    boxSizing: 'border-box',
    borderRadius: '5.95318px',
    display: 'flex',
    padding: '1rem',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: '1rem',
  },
}));

export default function ReconciliationView() {
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();
  const classes = useStyles();
  const [state, setState] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [accountJureb, setAccountJureb] = useState([]);
  const file = useSelector(({ statementUpload }) => statementUpload.file);

  const handleRowSelect = (e) => {
    const id = e.target.id;
    setAccountJureb((prevState) => {
      return prevState.map((li) => {
        return li.transactionId === id ? { ...li, value: !li.value } : li;
      });
    });
  };

  useEffect(() => {
    const newSubTotal = accountJureb.reduce((acc, cur) => {
      if (cur.value) return acc + (cur.Credit || 0) + (cur.Debit || 0);
      else return acc + 0;
    }, 0);
    setSubTotal(newSubTotal);
  }, [accountJureb]);

  const handleMatch = () =>
    setAccountJureb((prevState) => prevState.filter((li) => !li.value));

  function reconciledArr(o, copy) {
    let original = [...o];
    original.pop();

    let newArr = [];

    original.forEach((e) => {
      const bMatch = bestMatch(copy, e);

      if (copy.length == 0 || Object.keys(e).length < 4) {
        newArr.push([e, {}]);
      } else if (Number(e.Debit) + Number(e.Credit) == 0) {
      } else if (
        !(Number(bMatch.Credit) == Number(e.Debit) + Number(e.Credit))
      ) {
        newArr.push([e, {}]);
      } else {
        newArr.push([e, bMatch]);
        if (!(Object.keys(bMatch).length === 0)) {
          const foundIndex = copy.findIndex(
            (e) =>
              e.Date == bMatch.Date &&
              e.Reference == bMatch.Reference &&
              e.Description == bMatch.Description &&
              e.Debit == bMatch.Debit &&
              e.Credit == bMatch.Credit,
          );
          copy.splice(foundIndex, 1);
        }
      }
    });

    function bestMatch(oh, n) {
      var h = [...oh];
      const sorted = h.sort(function (a, b) {
        var c = 0,
          d = 0,
          p;
        for (p in n) {
          if (n.hasOwnProperty(p)) {
            c += Number((a[p] || 0) && a[p] === n[p]);
            d += Number((b[p] || 0) && b[p] === n[p]);
          }
        }
        return d < c ? -1 : 1;
      });

      return sorted[0];
    }

    return newArr;
  }

  useEffect(() => {
    authClient
      .get(
        `https://jureb-pr-57.herokuapp.com/api/v1/accounting/transaction/account/unreconciled?accountIdOrCode=1000-1`,
      )
      .then((res) => {
        if (res.status == 200) {
          const filterAcc = res.data.data.map((item) => ({
            Debit: item.transactionType == 'inflow' ? item.amount : '',
            Credit: item.transactionType == 'outflow' ? item.amount : '',
            Date: new Date(item.date).toISOString().substring(0, 10),
            Description:
              item.debitAccountType.name || item.creditAccountType.name,
            transactionId: item.transactionId,
            value: false,
            Name: item?.recipient.name || '',
          }));
          var result = reconciledArr(file, filterAcc);
          setState(result);
          setAccountJureb(filterAcc);
        }
      })
      .catch((e) => setState([]));
  }, []);

  return (
    <Fragment>
      <Header path={path} url={'/dashboard/transactions'} pathname={pathname} />
      <ReturnBtn />

      <div className={classes.root}>
        <TypographyBold style={{ marginRight: '1rem', fontSize: 20 }}>
          Reconciliation for First Bank
        </TypographyBold>
        <div className={classes.balContainer}>
          <div className={classes.balanceCard}>
            <div>
              <TypographyH5 style={{ marginRight: '1rem', fontSize: '.8rem' }}>
                Bank Account Balance
              </TypographyH5>
              <TypographyBold style={{ marginRight: '1rem', fontSize: '1rem' }}>
                NGN5,000,000.00
              </TypographyBold>
            </div>
            <div>
              <TypographyH5 style={{ marginRight: '1rem', fontSize: '.8rem' }}>
                Jureb Balance
              </TypographyH5>
              <TypographyBold style={{ marginRight: '1rem', fontSize: '1rem' }}>
                NGN5,000,000.00
              </TypographyBold>
            </div>
          </div>
          <div className={classes.balActionBtn}>
            <div className={classes.btn}>Delete</div>
            <div className={classes.btn}>Merge</div>
            <Checkbox
              defaultChecked
              color="primary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </div>
        </div>
        <Divider component="li" />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            margin: '0rem 7rem 1rem 1rem',
          }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <LockOpen style={{ color: '#1F53D7', marginRight: '.5rem' }} />
            <p className={classes.reviewLine}>Review Bank Line</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Visibility style={{ color: '#1F53D7', marginRight: '.5rem' }} />
            <p
              style={{
                fontFamily: 'Rubik',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '15px',
                color: '#1F53D7',
              }}>
              Find and Match Transactions on Jureb
            </p>
          </div>
        </div>

        {state.map(([{ Credit, Debit, Description, Date }, other], key) => {
          const lengthLedger = Object.keys(other).length == 0;
          return (
            <div key={key} className={classes.row}>
              <TransactionDetails
                amount={{ Credit, Debit }}
                date={Date}
                vendor={''}
                description={Description}
                isRight
                isCreated={lengthLedger}
              />
              {lengthLedger ? (
                <>
                  <div style={{ padding: '1rem' }}>
                    <div style={{ minWidth: '65px' }}>
                      <p>&nbsp;</p>
                    </div>
                  </div>
                  <TransactionCreation
                    amount={{ Credit, Debit }}
                    handleRowSelect={handleRowSelect}
                    accountJureb={accountJureb}
                    handleMatch={handleMatch}
                    newSubTotal={subTotal}
                  />
                </>
              ) : (
                <>
                  <Button transactionId={other.transactionId} />
                  <TransactionDetails
                    amount={{ Credit: other.Credit, Debit: other.Debit }}
                    date={other.Date}
                    vendor={''}
                    description={other.Description}
                    editable
                  />
                </>
              )}

              <Checkbox
                defaultChecked
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
            </div>
          );
        })}
      </div>
    </Fragment>
  );
}
