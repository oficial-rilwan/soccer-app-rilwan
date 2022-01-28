import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  withStyles,
} from '@material-ui/core';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import Products from './Products';
import Services from './Services';
import { ReactComponent as Box } from 'lib/assets/icons/box.svg';
import { ReactComponent as HandShake } from 'lib/assets/icons/handshake.svg';
import { ReactComponent as Product } from 'lib/assets/icons/product.svg';
import AddInventoryProduct from 'modules/Accounting/inventory/addInventory/SingleInventory';
import VariableInventory from 'modules/Accounting/inventory/addInventory/VariableInventory';
import ValuationMethods from 'modules/Accounting/inventory/ValuationMethods';
import ReturnBtn from 'modules/HumanResources/Employees/AddEmployees/components/ReturnBtn';
import ServicesInventory from 'modules/Accounting/inventory/addInventory/ServicesIventory';
import { Close } from '@material-ui/icons';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { TypographyH5 } from 'modules/components/Typography/Typography';
import { authClient } from 'modules/authentication/requestClient';
import { instance } from 'modules/authentication/requestClient/authClient';
import VariableAjustment from './addInventory/VariableAjustment';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  rootWrapper: {
    padding: '0 0 1.5rem',
  },
  inactiveTab: {
    backgroundColor: '#fff',
    color: '#828282',
  },
  active: {
    backgroundColor: '#EEF5FC',
    color: '#000',
  },
  navWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '2rem',
  },
  btnRoot: {
    backgroundColor: '#EEF5FC',
    border: '1px solid #DFDFDF',
    borderRadius: 2,
    margin: '0 15px',
    '&:hover': {
      backgroundColor: '#EEF5FC',
    },
    [theme.breakpoints.down('xs')]: {
      margin: '20px 0 15px',
    },
  },
  dialogContainer: {
    backgroundColor: '#f7fbfe61',
  },
  dialogPaper: {
    width: '48rem',
    height: '30rem',
    borderRadius: 10,
    border: '0.5px solid #878181',
    maxWidth: 1000,
    [theme.breakpoints.down('xs')]: {
      height: '100%',
    },
  },
  card: {
    height: '13rem',
    border: '1px solid #DFDFDF',
    boxShadow: '0px 8px 24px 0.694947px rgba(51, 63, 81, 0.15)',
    borderRadius: 3,
    cursor: 'pointer',
    padding: '10px 18px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '12rem',
  },
  gridWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography
        variant="h6"
        style={{
          fontFamily: 'Rubik',
          fontWeight: 500,
          fontSize: '19.6787px',
          lineHeight: '20px',
          marginTop: '1rem',
        }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <Close />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: '45px 24px 16px 24px',
  },
}))(MuiDialogContent);

const LeaveButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    borderRadius: '10px',
    fontFamily: 'Rubik',
    '&:hover': {
      backgroundColor: '#EEF5FC',
      boxShadow: 'none',
    },
  },
})(Button);

export default function Inventory() {
  const classes = useStyles();
  const { url } = useRouteMatch();

  const history = useHistory();

  const [open, setOpen] = useState(false);

  const handleDialogClose = () => {
    setOpen(!open);
  };

  const routes = [
    {
      title: 'Products',
      path: `${url}/products`,
      component: Products,
      exact: true,
    },
    {
      title: 'Services',
      path: `${url}/services`,
      component: Services,
    },
    {
      title: 'Inventory management',
      path: `${url}/products/single`,
      component: AddInventoryProduct,
      exact: true,
    },
    {
      title: 'Inventory management',
      path: `${url}/products/single/:id`,
      component: AddInventoryProduct,
      exact: true,
    },
    {
      title: 'Inventory management',
      path: `${url}/products/variables`,
      component: VariableInventory,
      exact: true,
    },
    {
      title: 'Inventory management',
      path: `${url}/valuations`,
      component: ValuationMethods,
      exact: true,
    },
    {
      title: 'Inventory management',
      path: `${url}/products/variables/:id`,
      component: VariableInventory,
      exact: true,
    },
    {
      title: 'Stock Value Adjustment',
      path: `${url}/products/variables/:productId/adjustment/:stockId`,
      component: VariableAjustment,
      exact: true,
    },
    {
      title: 'Inventory management',
      path: `${url}/products/services`,
      component: ServicesInventory,
      exact: true,
    },
    {
      title: 'Inventory management',
      path: `${url}/products/services/:id`,
      component: ServicesInventory,
      exact: true,
    },
    {
      title: 'Inventory management',
      path: `${url}`,
      component: () => <ContainerPage setOpen={setOpen} />,
      exact: true,
    },
  ];

  return (
    <>
      <HeaderComp url="/dashboard/product-and-services" />

      <div className={classes.rootWrapper}>
        <Switch>
          {routes.map(({ component: Component, ...route }, i) => (
            <Route
              key={i}
              {...route}
              render={(props) => <Component {...props} />}
            />
          ))}
        </Switch>
      </div>
      <Dialog
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{
          container: classes.dialogContainer,
          paper: classes.dialogPaper,
        }}
        disableBackdropClick>
        <DialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
          Add New
        </DialogTitle>
        <DialogContent dividers>
          <Grid container justify="space-around" spacing={6}>
            <Grid
              onClick={() => {
                history.push('/dashboard/product-and-services/products/single');
                setOpen(false);
              }}
              item
              xs={12}
              sm={3}
              md={4}
              className={classes.gridWrapper}>
              <Card className={classes.card}>
                <Box />
                <TypographyH5 style={{ margin: '1rem 0', fontSize: 18 }}>
                  Single Products
                </TypographyH5>
              </Card>
              <TypographyH5
                style={{
                  fontSize: 12.5,
                  margin: '1.2rem 0',
                  textAlign: 'center',
                }}>
                Create standalone items that you buy and sell.
              </TypographyH5>
            </Grid>
            <Grid
              onClick={() => {
                history.push(
                  '/dashboard/product-and-services/products/variables',
                );
                setOpen(false);
              }}
              item
              xs={12}
              sm={3}
              md={4}
              className={classes.gridWrapper}>
              <Card className={classes.card}>
                <Product />
                <TypographyH5 style={{ margin: '1rem 0', fontSize: 18 }}>
                  Variable Products
                </TypographyH5>
              </Card>
              <TypographyH5
                style={{
                  fontSize: 12.5,
                  margin: '1.2rem 0',
                  textAlign: 'center',
                }}>
                Create multiple variants of the same item.
              </TypographyH5>
            </Grid>
            <Grid
              onClick={() => {
                history.push(
                  '/dashboard/product-and-services/products/services',
                );
                setOpen(false);
              }}
              item
              xs={12}
              sm={3}
              md={4}
              className={classes.gridWrapper}>
              <Card className={classes.card}>
                <HandShake />
                <TypographyH5 style={{ margin: '1rem 0', fontSize: 18 }}>
                  Services
                </TypographyH5>
              </Card>
              <TypographyH5
                style={{
                  fontSize: 12.5,
                  margin: '1.2rem 0',
                  textAlign: 'center',
                }}>
                Create services you render to customers.
              </TypographyH5>
            </Grid>
          </Grid>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <DefaultButton
              style={{ borderRadius: 7, padding: '5px 10px' }}
              onClick={() => setOpen(!open)}>
              Close
            </DefaultButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ContainerPage({ setOpen }) {
  const classes = useStyles();
  const [showProduct, setPage] = useState(true);
  const [product, setProduct] = useState([]);
  const [service, setService] = useState([]);
  const history = useHistory();

  useEffect(() => {
    //Fetching products and services
    const products = instance.get(`/api/v1/accounting/products`);
    const services = instance.get(
      `/api/v1/accounting/services`,
      //`/api/v1/accounting/services?populateKeys=account`,
    );

    authClient
      .all([products, services])
      .then(
        ([
          {
            data: { data: products },
          },
          {
            data: { data: services },
          },
        ]) => {
          setProduct(products);
          setService(services);
        },
      )
      .catch((e) => console.log(e));
  }, []);

  const RenderComponent = showProduct ? (
    <Products values={product} />
  ) : (
    <Services values={service} />
  );

  return (
    <>
      <ReturnBtn />
      <div className={classes.navWrapper}>
        <div style={{ margin: '0 10px 0 0' }}>
          <LeaveButton
            onClick={() => setPage(true)}
            variant="contained"
            className={showProduct ? classes.active : classes.inactiveTab}>
            Products ({product.length})
          </LeaveButton>
        </div>
        <div style={{ flex: 1 }}>
          <LeaveButton
            onClick={() => setPage(false)}
            variant="contained"
            className={!showProduct ? classes.active : classes.inactiveTab}>
            Services ({service.length})
          </LeaveButton>
        </div>
        {showProduct && (
          <DefaultButton
            onClick={() => {
              history.push('/dashboard/product-and-services/valuations');
              setOpen(false);
            }}
            classes={{ root: classes.btnRoot }}
            endIcon={<SettingsOutlinedIcon />}>
            Valuation Method Settings
          </DefaultButton>
        )}
        <PrimaryButton onClick={() => setOpen(true)}>Add New</PrimaryButton>
      </div>
      {RenderComponent}
    </>
  );
}
