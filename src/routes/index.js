import React from "react";
import { Route, Switch } from "react-router-dom";

import routes from "./routes";
import ReactDynamicImport from "react-dynamic-import";
import Layout from "../layout";

const Routes = () => (
  <Switch>
    {routes.map((route, index) => {
      const loader = (file) => import(`../pages/${file}/index.js`);

      const Component = ReactDynamicImport({ name: route.component, loader });

      return (
        <Route exact={route.exact} path={route.path} key={index.toString()}>
          <Layout>
            <Component />
          </Layout>
        </Route>
      );
    })}
  </Switch>
);

export default Routes;
