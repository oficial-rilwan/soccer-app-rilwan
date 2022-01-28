import {
  InputAdornment,
  makeStyles,
  TextField,
  useMediaQuery,
  useTheme,
  withStyles,
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { LoaderComponent } from 'lib/components/Loaders/Loaders';
import HeaderComp from 'modules/SiteLayout/Header/Header';
import { lazy, Suspense } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from 'react-router';
import AssetsHeader from './AssetsHeader';

const Draft = lazy(() => import('./components/Drafts'));
const Registered = lazy(() => import('./components/Registered'));
const NewAsset = lazy(() => import('./NewAsset'));

const useStyles = makeStyles((theme) => ({}));

const CssTextField = withStyles({
  root: {
    fontStyle: 'italic',
    fontFamily: 'Rubik,sans-serif',
    backgroundColor: '#F5F9F7',
    '& input + fieldset': {
      borderRadius: '3px',
      border: '0.5px solid #DFDFDF',
    },
  },
})(TextField);

export default function FixedAssets() {
  const classes = useStyles();
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();

  const handleSearch = () => {};

  const routes = [
    {
      title: 'Assets Draft',
      path: `${url}/draft`,
      component: Draft,
    },
    {
      title: 'Assets Registered',
      path: `${url}/registered`,
      component: Registered,
    },
    {
      title: 'Assets Disposed',
      path: `${url}/disposed`,
      component: Draft,
    },
  ];

  return (
    <>
      <HeaderComp url="/dashboard/fixed-assets" />

      <div>
        <Suspense fallback={<LoaderComponent />}>
          <Switch>
            <Route
              path="/dashboard/fixed-assets/add"
              // exact
              render={(props) => <NewAsset {...props} />}
            />

            <>
              <CssTextField
                placeholder="Search Assets by: name, number, description or type"
                variant="outlined"
                onChange={handleSearch}
                style={{
                  width: matchesXs ? '100%' : '28rem',
                  margin: matchesXs ? '1rem 0' : 0,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlined style={{ color: '#8D8D8D' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <div style={{ margin: '2.5rem 0' }}>
                <AssetsHeader url={url} pathname={pathname} />
              </div>
              {routes.map(({ component: Component, ...route }, i) => (
                <Route
                  key={i}
                  {...route}
                  render={(props) => <Component {...props} />}
                />
              ))}
              {/* <Redirect
              from="/dashboard/fixed-assets"
              to="/dashboard/fixed-assets/draft"
            /> */}
            </>
          </Switch>
        </Suspense>
      </div>
    </>
  );
}
