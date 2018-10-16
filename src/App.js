import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import * as actions from './store/actions';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './components/containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './components/containers/Checkout/Checkout';
// import Orders from './components/containers/Orders/Orders';
// import Auth from  './components/containers/Auth/Auth';
import Logout from './components/containers/Auth/Logout/Logout';

const asyncCheckout = asyncComponent(() => {
    return import('./components/containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('./components/containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
    return import('./components/containers/Auth/Auth');
});

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignUp();
    }


    render() {

        let routes = (
            <Switch>
                <Route path='/auth' component={asyncAuth} />
                <Route path='/' component={BurgerBuilder} />
                <Redirect to='/'/>
            </Switch>
        );

        if (this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path='/auth' component={asyncAuth} />
                    <Route path='/checkout' component={asyncCheckout} />
                    <Route path='/orders' component={asyncOrders} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/' component={BurgerBuilder} />
                    <Redirect to='/'/>
                </Switch>
            );
        }


        return (
            <div >
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token != null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

