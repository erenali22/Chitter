
import { createElement, Fragment } from 'react';
import { runClientApp, getAppConfig } from '@ice/runtime';
import { commons, statics } from './runtimeModules';
import * as app from '@/app';
import routes from './routes';

const getRouterBasename = () => {
  const appConfig = getAppConfig(app);
  return appConfig?.router?.basename ?? "/" ?? '';
}
// Add react fragment for split chunks of app.
// Otherwise chunk of route component will pack @ice/jsx-runtime and depend on framework bundle.
const App = <></>;

const render = (customOptions = {}) => {
  const appProps = {
    app,
    runtimeModules: {
      commons,
      statics,
    },
    routes,
    basename: getRouterBasename(),
    hydrate: true,
    memoryRouter: false,
        ...customOptions,
      };
  return runClientApp(appProps);
};

render();

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
