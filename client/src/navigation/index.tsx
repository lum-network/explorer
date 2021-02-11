import React, { PureComponent } from 'react';
import { MainLayout } from 'layout';
import {
    BlockPage,
    BlocksPage,
    HomePage,
    NotFoundPage,
    TransactionsPage,
    TransactionPage,
    ValidatorsPage,
    AccountPage,
} from 'pages';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { NavigationConstants } from 'constant';

class RootNavigator extends PureComponent {
    render(): JSX.Element {
        return (
            <Router>
                <MainLayout>
                    <Switch>
                        <Redirect path="/" exact to={NavigationConstants.HOME} />
                        <Route path={NavigationConstants.HOME}>
                            <HomePage />
                        </Route>
                        <Route path={`${NavigationConstants.BLOCKS}/:id`} component={BlockPage} />
                        <Route path={NavigationConstants.BLOCKS}>
                            <BlocksPage />
                        </Route>
                        <Route path={`${NavigationConstants.TRANSACTIONS}/:id`} component={TransactionPage} />
                        <Route path={NavigationConstants.TRANSACTIONS}>
                            <TransactionsPage />
                        </Route>
                        <Route path={NavigationConstants.VALIDATORS}>
                            <ValidatorsPage />
                        </Route>
                        <Route path={`${NavigationConstants.ACCOUNT}/:id`} component={AccountPage} />
                        <Route path="/">
                            <NotFoundPage />
                        </Route>
                    </Switch>
                </MainLayout>
            </Router>
        );
    }
}

export default RootNavigator;
