import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoaderComponent } from './lib/components';
import routes from './routes';
import store from './store';
import { PrivateRoute } from 'lib/components/PrivateRoute/PrivateRoute';
import 'loaders.css';

// function saveToLocalStorage(state) {
//   const newState = { ...state };
//   try {
//     const serializedState = JSON.stringify(newState);
//     localStorage.setItem('jureb_redux_state', serializedState);
//   } catch (e) {
//     console.log(e);
//   }
// }

// store.subscribe(() => saveToLocalStorage(store.getState()));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<LoaderComponent />}>
          <Switch>
            {routes.map((route, i) =>
              route.private ? (
                <PrivateRoute key={i} component={route.component} {...route} />
              ) : (
                <Route key={i} {...route} />
              ),
            )}
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
