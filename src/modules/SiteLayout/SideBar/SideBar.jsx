import { useEffect, useState } from 'react';
import { ReactComponent as Reports } from '../../../lib/assets/icons/reports.svg';
import { ReactComponent as CompanySelect } from '../../../lib/assets/icons/company_select.svg';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Accounting } from '../../../lib/assets/icons/accounting.svg';
import Invoice from '../../components/Icons/invoice';
import { ReactComponent as Humanresource } from '../../../lib/assets/icons/hr.svg';
import { ReactComponent as Bank } from '../../../lib/assets/icons/banking.svg';
import { ReactComponent as Tax } from '../../../lib/assets/icons/tax.svg';
import { getSidebarContent, getDrawerSidebar } from '@mui-treasury/layout';
import { Paper, makeStyles, Typography, SvgIcon } from '@material-ui/core';
import { DashboardOutlined } from '@material-ui/icons';
import BrandLogo from 'lib/assets/icons/brand_logo.png';
import { authClient } from 'modules/authentication/requestClient';
import { useSelector } from 'react-redux';

const SidebarContent = getSidebarContent(styled);
const DrawerSidebar = getDrawerSidebar(styled);

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: '#F5F5F5',
  },
  sideBar: {
    padding: '1rem',
  },
  sideBarTitle: {
    fontFamily: 'Rubik, sans-serif',
    textAlign: 'center',
    color: '#2F49D0',
  },
  sideBarLine: {
    border: '1px solid #EBEBEB',
    margin: '1rem',
  },
  sidebarLinks: {
    textDecoration: 'none',
    color: '#282828b8',
    fontFamily: 'Rubik, sans-serif',
    fontStyle: 'normal',
    fontSize: '13px',
    lineHeight: '17px',
  },
  sideBarCompanies: {
    fontFamily: 'Rubik, sans-serif',
    flex: 1,
    padding: '0rem .4rem',
  },
  sideBarList: {
    padding: '0 0 .6rem',
  },
  companiesContent1: {
    fontFamily: 'inherit',
    fontSize: '13px',
    fontWeight: '500',
  },
  companiesContent2: {
    fontFamily: 'inherit',
    fontSize: '13px',
    fontWeight: '400',
    color: '#6C6B6B',
    lineHeight: '15.41px',
  },
  nameCard: {
    height: '43px',
    width: '43px',
    background: '#251F47',
    borderRadius: '50%',
    marginRight: '.7rem',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
  name: {
    margin: 0,
    textAlign: 'center',
    color: '#00DC7D',
    fontSize: '1.2rem',
    marginTop: '0.55rem',
  },
  sidebarItems: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
    cursor: 'pointer',
    tapHighlightColor: 'transparent',
    webkitTapHighlightColor: 'transparent',
    mozTapHighlightColor: 'transparent',
    oTapHighlightColor: 'transparent',
  },
  sidebarItemTitle: {
    fontFamily: 'Rubik, sans-serif',
    color: '#878181',
    fontSize: '13px',
    flex: 1,
    lineHeight: '17px',
    '&:hover': {
      color: '#464646',
    },
    marginLeft: '.7rem',
  },
  storage: {
    background: '#1F53D7',
    borderRadius: '3px',
    height: '104px',
    marginTop: '8rem',
    padding: '.7rem',
    color: '#fff',
  },
  progressColor: {
    backgroundColor: '#fff',
  },
  progressPrimary: {
    backgroundColor: '#C4C4C4',
  },
  linearLabel: {
    fontSize: '11px',
    textAlign: 'end',
  },
  active: {
    fontFamily: 'Rubik, sans-serif',
    fontSize: '13px',
    flex: 1,
    lineHeight: '17px',
    color: '#000',
    marginLeft: '.7rem',
  },
  dashboardLink: {
    fontFamily: 'Rubik, sans-serif',
    fontSize: '13px',
    flex: 1,
    lineHeight: '17px',
    marginLeft: '.7rem',
  },
}));

export default function SideBar({ path, url, setOpen }) {
  const classes = useStyles();
  const { pathname } = useLocation();

  const [values, setValues] = useState({
    accounting: {
      title: '',
      active: false,
    },
    human_resource: {
      title: '',
      active: false,
    },
    invoice: {
      title: '',
      active: false,
    },
    tax: {
      title: '',
      active: false,
    },
    bank: {
      title: '',
      active: false,
    },
  });
  const handleSideBarContents = (name) => () => {
    setValues({
      ...values,
      [name]: { ...values[name], title: name, active: !values[name].active },
    });
  };

  const hrLinks = [
    {
      title: 'Employees',
      path: 'employees',
    },
    {
      title: 'Leave Management',
      path: 'leave',
    },
    {
      title: 'Payroll Management',
      path: 'payroll',
    },
    {
      title: 'Payslip Management',
      path: 'payslip',
    },
    {
      title: 'Query Management',
      path: 'query',
    },
    {
      title: 'Transfer Management',
      path: 'transfer',
    },
    {
      title: 'Suspension Management',
      path: 'suspension',
    },
    {
      title: 'Promotion Management',
      path: 'promotions',
    },
    {
      title: 'Termination/Retirement',
      path: 'termination',
    },
    {
      title: 'Performance Evaluation',
      path: 'performance-evaluation',
    },
    {
      title: 'Internal Memo',
      path: 'memo',
    },
  ];

  const accountLinks = [
    {
      title: 'Customers',
      path: 'customers',
    },
    {
      title: 'Inflow',
      path: 'inflow',
    },
    {
      title: 'Outflow',
      path: 'outflow',
    },
    {
      title: 'Quotation',
      path: 'quotation',
    },
    {
      title: 'Transactions',
      path: 'transactions',
    },
    {
      title: 'Vendors',
      path: 'vendors',
    },
    {
      title: 'Product and Services',
      path: 'product-and-services',
    },
    {
      title: 'Charts of Accounts',
      path: 'charts-of-accounts',
    },
    {
      title: 'Fixed Assets',
      path: 'fixed-assets/draft',
    },
    {
      title: 'Budget',
      path: 'budget',
    },
  ];

  const bankLinks = [
    {
      title: 'Connected Banks',
      path: 'connected-banks',
    },
  ];

  const taxLinks = [
    {
      title: 'Tax Info',
      path: 'tax_info',
    },
    {
      title: 'Tax Calendar',
      path: 'tax-calendar',
    },
    {
      title: 'Tax Calculation',
      path: 'tax-calculation',
    },
    {
      title: 'Tax Payments',
      path: 'tax-payments',
    },
    {
      title: 'Tax Filing Returns',
      path: 'tax-returns',
    },
    {
      title: 'Tax Clearance Certificate',
      path: 'tax-certificate',
    },
    {
      title: 'Tax Accountant',
      path: 'tax-accountant',
    },
  ];

  const [dashboard, setDashboard] = useState({
    meta: '',
    businessName: '',
    businessSector: '',
  });
  const { user } = useSelector((state) => state?.auth);
  const loginState = useSelector((state) => state?.loginStats);
  useEffect(() => {
    authClient
      .get(
        `/api/v1/sub-admin/profile?subAdminId=${
          user?.subAdminId ||
          loginState?.user?.profile?.subAdminId ||
          loginState?.googleUser?.userId
        }`,
      )
      .then(({ data }) => {
        let { meta, businessSector, businessName } = data?.data;
        setDashboard({ ...dashboard, meta, businessSector, businessName });
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <DrawerSidebar sidebarId={'unique_id'} classes={{ paper: classes.paper }}>
      <SidebarContent className={classes.sideBar}>
        <section>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={BrandLogo}
              alt="brand"
              style={{ width: '7rem', height: '3rem' }}
            />
          </div>
          <div className={classes.sideBarLine}></div>
          <Paper
            elevation={4}
            style={{
              borderRadius: '7px',
              height: '3.5rem',
              margin: '2rem 0rem 3.4rem 0rem',
              cursor: 'pointer',
            }}>
            <section
              style={{
                display: 'flex',
                alignItems: 'center',
                height: 'inherit',
                padding: '.2rem',
              }}>
              {dashboard?.meta ? (
                <img
                  src={dashboard?.meta.secure_url}
                  alt="company_logo"
                  style={{
                    width: '2rem',
                    height: '2rem',
                    margin: '.5rem',
                    borderRadius: '50% ',
                  }}
                />
              ) : (
                <div className={classes.nameCard}>
                  <Typography variant="h4" className={classes.name}>
                    {dashboard?.businessName
                      ? dashboard.businessName.substring(0, 1).toUpperCase()
                      : 'A'}
                  </Typography>
                </div>
              )}

              <div className={classes.sideBarCompanies}>
                <Typography variant="h4" className={classes.companiesContent1}>
                  {`${
                    dashboard?.businessName ? dashboard.businessName : 'Admin'
                  }`}
                </Typography>
                <Typography component="p" className={classes.companiesContent2}>
                  {`${dashboard?.businessSector}`}
                </Typography>
              </div>
              <div style={{ padding: '3px 2px 0px 0px' }}>
                <CompanySelect />
              </div>
            </section>
          </Paper>
          <div>
            <Link
              to="/dashboard"
              onClick={() => setOpen('unique_id', false)}
              replace={pathname == '/dashboard'}
              style={{
                textDecoration: 'none',
                color: pathname.substr(10) == '' ? '#1F53D7' : '#878181',
                WebkitTapHighlightColor: 'transparent',
              }}>
              <div
                className={classes.sidebarItems}
                onClick={handleSideBarContents}>
                <DashboardOutlined
                  style={{
                    color: pathname.substr(10) == '' ? '#1F53D7' : '#878181',
                  }}
                />
                <Typography variant="h5" className={classes.dashboardLink}>
                  Dashboard
                </Typography>
              </div>
            </Link>
            <Link
              to={`/dashboard/invoice`}
              onClick={() => setOpen('unique_id', false)}
              replace={false}
              style={{
                textDecoration: 'none',
                color:
                  pathname.substr(10) == '/invoice' ? '#1F53D7' : '#878181',
                WebkitTapHighlightColor: 'transparent',
              }}>
              <div
                className={classes.sidebarItems}
                onClick={handleSideBarContents}>
                <Invoice
                  style={{
                    fill: '#878181',
                  }}
                />
                <Typography variant="h5" className={classes.dashboardLink}>
                  Invoice
                </Typography>
              </div>
            </Link>
            <div
              className={classes.sidebarItems}
              style={values.accounting.active ? { marginBottom: 0 } : {}}
              onClick={handleSideBarContents('accounting')}>
              <Accounting />
              <Typography
                variant="h5"
                className={
                  values.accounting.active
                    ? classes.active
                    : classes.sidebarItemTitle
                }>
                Accounting
              </Typography>
              {values.accounting.active ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </div>
            {values.accounting.active && (
              <ul style={{ listStyle: 'none' }}>
                {accountLinks.map((links, i) => (
                  <Link
                    key={i}
                    to={`${url}/${links.path}`}
                    replace={pathname == `${url}/${links.path}`}
                    className={classes.sidebarLinks}
                    onClick={() => setOpen('unique_id', false)}
                    style={{
                      color:
                        (pathname == '/dashboard/reconciliation/import' &&
                          'transactions' == links.path) ||
                        pathname.includes(`${links.path}`)
                          ? '#2F49D0'
                          : '#282828b8',
                    }}>
                    <li className={classes.sideBarList} key={i}>
                      {links.title}
                      {/* {`${pathname} ---- ${links.path}`} */}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
            <div
              className={classes.sidebarItems}
              style={values.human_resource.active ? { marginBottom: 0 } : {}}
              onClick={handleSideBarContents('human_resource')}>
              <Humanresource />

              <Typography
                variant="h5"
                className={
                  values.human_resource.active
                    ? classes.active
                    : classes.sidebarItemTitle
                }>
                Human Resource
              </Typography>
              {values.human_resource.active ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </div>
            {values.human_resource.active && (
              <ul style={{ listStyle: 'none' }}>
                {hrLinks.map((links, i) => (
                  <Link
                    key={i}
                    to={`${url}/${links.path}`}
                    replace={pathname == `${url}/${links.path}`}
                    className={classes.sidebarLinks}
                    onClick={() => setOpen('unique_id', false)}
                    style={{
                      color: pathname.includes(`${links.path}`)
                        ? '#2F49D0'
                        : '#282828b8',
                    }}>
                    <li className={classes.sideBarList} key={i}>
                      {links.title}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
            <div
              className={classes.sidebarItems}
              style={values.tax.active ? { marginBottom: 0 } : {}}
              onClick={handleSideBarContents('tax')}>
              <SvgIcon style={{ color: 'red' }}>
                <Tax />
              </SvgIcon>
              <Typography
                variant="h5"
                className={
                  values.tax.active ? classes.active : classes.sidebarItemTitle
                }>
                Tax
              </Typography>
              {values.tax.active ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </div>
            {values.tax.active && (
              <ul style={{ listStyle: 'none' }}>
                {taxLinks.map((links, i) => (
                  <Link
                    key={i}
                    to={`${url}/${links.path}`}
                    replace={pathname == `${url}/${links.path}`}
                    className={classes.sidebarLinks}
                    onClick={() => setOpen('unique_id', false)}
                    style={{
                      color: pathname.includes(`${links.path}`)
                        ? '#2F49D0'
                        : '#282828b8',
                    }}>
                    <li className={classes.sideBarList} key={i}>
                      {links.title}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
            <div
              className={classes.sidebarItems}
              style={values.bank.active ? { marginBottom: 0 } : {}}
              onClick={handleSideBarContents('bank')}>
              <Bank />
              <Typography
                variant="h5"
                className={
                  values.bank.active ? classes.active : classes.sidebarItemTitle
                }>
                Banking
              </Typography>
              {values.bank.active ? (
                <KeyboardArrowDownIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </div>
            {values.bank.active && (
              <ul style={{ listStyle: 'none' }}>
                {bankLinks.map((links, i) => (
                  <Link
                    key={i}
                    to={`${url}/${links.path}`}
                    replace={pathname == `${url}/${links.path}`}
                    className={classes.sidebarLinks}
                    onClick={() => setOpen('unique_id', false)}
                    style={{
                      color: pathname.includes(`${links.path}`)
                        ? '#2F49D0'
                        : '#282828b8',
                    }}>
                    <li className={classes.sideBarList} key={i}>
                      {links.title}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
            <div
              className={classes.sidebarItems}
              onClick={handleSideBarContents}>
              <Reports />
              <Typography variant="h5" className={classes.sidebarItemTitle}>
                Reports
              </Typography>
            </div>
          </div>
        </section>
      </SidebarContent>
    </DrawerSidebar>
  );
}
