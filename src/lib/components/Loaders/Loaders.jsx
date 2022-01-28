import './loader.scss';
import Loader from 'react-loaders';

export const LoaderComponent = () => (
  <div className={'loaderWrapperFullscreen'}>
    <Loader type="line-scale" color="#2F49D0" />
  </div>
);
