import { Button, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrimaryButton } from 'modules/components/Buttons/Defaults';
import { Add, KeyboardArrowDownSharp } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { authClient } from 'modules/authentication/requestClient';
import { useSelector } from 'react-redux';
import { DefaultButton } from 'modules/components/Buttons/Defaults';
import NewSelect from '../budget/components/NewSelect';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  maxWidth: {
    maxWidth: '500px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 300,
    },
    backgroundColor: '#394452',
    fontFamily: 'Rubik',
    fontSize: 12,
    lineHeight: 1.5,
    padding: '.9rem',
    fontWeight: 'normal',
    color: '#fff',
    borderRadius: '11.8483px',
    boxShadow: '0px 1.8513px 5.92417px rgba(0, 0, 0, 0.25)',
  },
  tooltipArrow: {
    color: '#394452',
  },
  linkWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  inactiveTab: {
    backgroundColor: '#fff',
    color: '#828282',
  },
  active: {
    backgroundColor: '#EEF5FC',
    color: '#000',
  },
  link: {
    margin: '0 1.5rem 0 0',
  },
}));

const AssetsButton = withStyles({
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

export default function AssetsHeader({ url, pathname, reload }) {
  const history = useHistory();
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();
  const [values, setValues] = useState({
    approvedLength: '',
    rejectedLength: '',
    pendingLength: '',
  });

  function handleItemClose() {}

  // const googleUser = useSelector((state) => state?.loginStats?.googleUser);
  // const user = useSelector((state) => state?.auth?.user);
  // const authUserId = useSelector((state) => state?.loginStats.user?.userId);

  //   useEffect(() => {
  //     authClient
  //       .get(
  //         `/api/v1/employee/leave/management/fetch?issuersId=${
  //           user?.subAdminId || googleUser?.userId || authUserId
  //         }`,
  //       )
  //       .then(({ data }) => {
  //         const approvedLength = data?.data?.filter(
  //           (item) => item.leaveStatus == 'APPROVED',
  //         );
  //         const pendingLength = data?.data?.filter(
  //           (item) => item.leaveStatus == 'PENDING',
  //         );

  //         const rejectedLength = data?.data?.filter(
  //           (item) => item.leaveStatus == 'REJECT',
  //         );
  //         setValues({
  //           ...values,
  //           pendingLength: pendingLength.length,
  //           approvedLength: approvedLength.length,
  //           rejectedLength: rejectedLength.length,
  //         });
  //       })
  //       .catch((e) => console.log(e));
  //   }, [reload]);

  return (
    <>
      <div className={classes.linkWrapper}>
        <div className={classes.link}>
          <Link
            to={`${url}/draft`}
            style={{
              textDecoration: 'none',
            }}>
            <AssetsButton
              variant="contained"
              disableElevation
              className={
                pathname.substring(23) == `/draft`
                  ? classes.active
                  : classes.inactiveTab
              }>
              {`Draft (${values?.pendingLength || 0})`}
            </AssetsButton>
          </Link>
        </div>
        <div className={classes.link}>
          <Link
            to={`${url}/registered`}
            style={{
              textDecoration: 'none',
            }}>
            <AssetsButton
              variant="contained"
              className={
                pathname.substring(23) == `/registered`
                  ? classes.active
                  : classes.inactiveTab
              }>
              {`Registered (${values?.approvedLength || 0})`}
            </AssetsButton>
          </Link>
        </div>
        <div className={classes.link}>
          <Link
            to={`${url}/disposed`}
            style={{
              textDecoration: 'none',
            }}>
            <AssetsButton
              variant="contained"
              className={
                pathname.substring(23) == `/disposed`
                  ? classes.active
                  : classes.inactiveTab
              }>
              {`Sold and Disposed (${values?.rejectedLength || 0})`}
            </AssetsButton>
          </Link>
        </div>
        <div style={{ padding: matchesXs ? 0 : '0 10px', marginLeft: 'auto' }}>
          {/* <DefaultButton
            endIcon={<KeyboardArrowDownSharp />}
            style={{ margin: '0 10px' }}>
            More
          </DefaultButton> */}
          <NewSelect
            handleItemClose={() => {
              handleItemClose('More');
            }}
            menuItem={['Run Depreciation', 'Export', 'Settings']}
            value={'More'}
            width="13rem"
            popOverShort
          />
          <DefaultButton style={{ margin: '0 18px' }}>Import</DefaultButton>
          <PrimaryButton
            endIcon={<Add />}
            onClick={() => history.push('/dashboard/fixed-assets/add')}>
            Add New Asset
          </PrimaryButton>
        </div>
      </div>
    </>
  );
}

AssetsHeader.propTypes = {
  url: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};
