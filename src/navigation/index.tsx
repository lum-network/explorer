import React, { useEffect } from 'react';
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
    ValidatorPage,
    SearchPage,
    ProposalsPage,
    ProposalPage,
} from 'pages';
import { DelegatorsSubpage } from 'pages/subpages';
import { Route, BrowserRouter as Router, Switch, Redirect, useLocation } from 'react-router-dom';
import { NavigationConstants } from 'constant';
import { AnalyticsUtils } from 'utils';

const RouteListener = (): JSX.Element => {
    const location = useLocation();
    useEffect(() => {
        AnalyticsUtils.setCurrentScreen(location.pathname);
        AnalyticsUtils.logEvent('screen_view', { screen_name: location.pathname });
    }, [location]);

    return <div />;
};

const RootNavigator = (): JSX.Element => {
    return (
        <Router>
            <RouteListener />
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
                    <Route
                        path={`${NavigationConstants.VALIDATORS}/:id${NavigationConstants.DELEGATORS}`}
                        component={DelegatorsSubpage}
                    />
                    <Route path={`${NavigationConstants.VALIDATORS}/:id`} component={ValidatorPage} />
                    <Route path={NavigationConstants.VALIDATORS}>
                        <ValidatorsPage />
                    </Route>
                    <Route path={`${NavigationConstants.ACCOUNT}/:id`} component={AccountPage} />
                    <Route path={`${NavigationConstants.PROPOSALS}/:id`} component={ProposalPage} />
                    <Route path={NavigationConstants.PROPOSALS}>
                        <ProposalsPage />
                    </Route>
                    <Route path={`${NavigationConstants.SEARCH}/:text`} component={SearchPage} />
                    <Route path="/">
                        <NotFoundPage />
                    </Route>
                </Switch>
            </MainLayout>
        </Router>
    );
};

export default RootNavigator;
