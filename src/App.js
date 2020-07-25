import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Logout from './containers/Auth/Logout/Logout';
import * as actionTypes from './store/actions';

const Polls = React.lazy(() => {
  return import('./containers/Polls/Polls');
});

const Stats = React.lazy(() => {
  return import('./containers/Stats/Stats');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const app = props => {
  const { onTryAutoSignUp } = props;

  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);

  let routes = (
    <Switch>
      <Route path="/polls" render={(props) => <Polls {...props}/>} />
      <Route path="/auth" render={(props) => <Auth {...props}/>} />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  )

  if ( props.isAuth ) {
    routes = (
      <Switch>
          <Route path="/polls" render={(props) => <Polls {...props} />} />
          <Route path="/stats" render={(props) => <Stats {...props} />} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={Home} />
          <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <div>
      <Layout email={props.email}>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
};

export default app;
