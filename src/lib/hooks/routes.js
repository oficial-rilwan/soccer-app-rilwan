import { useLocation, useRouteMatch, useHistory } from 'react-router-dom';

export default function routes() {
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();

  return [path, url, pathname];
}
