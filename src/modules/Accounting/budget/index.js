import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import { Add } from '@material-ui/icons';
import { TypographyBold } from 'modules/components/Typography/Typography';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import Loader from 'react-loaders';
import BudgetReport from './BudgetReport';

const useStyles = makeStyles((theme) => ({
  btnPrimary: {
    margin: '1.1rem 0 0',
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
    },
  },
  addBudget: {
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
    },
  },
}));

export default function Budget() {
  const classes = useStyles();
  const history = useHistory();
  const [values, setValues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    authClient
      .get(
        `/api/v1/accounting/budget/overview?transactionType=Expense&fiscalYear=2021-2022`,
      )
      .then(({ data }) => {
        setIsLoading(false);
        setValues(data?.data);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, []);

  console.log(values);

  return (
    <>
      <HeaderComp url="/dashboard/budget" />
      {isLoading ? (
        <div className={classes.loader}>
          <Loader type="ball-pulse" color="#2F49D0" />
        </div>
      ) : values?.budgetCategoryPerFiscalYear?.length > 0 ? (
        <BudgetReport values={values} />
      ) : (
        <section>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <PrimaryButton
              classes={{ root: classes.addBudget }}
              endIcon={<Add />}
              onClick={() => history.push('/dashboard/budget/add')}>
              New Budget
            </PrimaryButton>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              margin: '10rem 0',
            }}>
            <TypographyBold style={{ margin: '.1rem 0', fontSize: 24 }}>
              Stay ontop of your expenses. Create a budget for your business.
            </TypographyBold>
            <TypographyH5
              style={{ margin: '.1rem 0', fontSize: 19, color: '#878181' }}>
              Create Budget for your business activities to manage your finances
              and see how your business is doing.
            </TypographyH5>
            <PrimaryButton
              classes={{ root: classes.btnPrimary }}
              fullWidth={false}
              onClick={() => history.push('/dashboard/budget/add')}>
              Create New Budget
            </PrimaryButton>
          </div>
        </section>
      )}
    </>
  );
}
