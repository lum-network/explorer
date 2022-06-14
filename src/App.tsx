import 'frontend-elements/styles/main.scss';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import { AnalyticsUtils } from 'utils';
import Core from 'core';

const App = (): JSX.Element => {
    useEffect(() => {
        AnalyticsUtils.initialize().finally(() => null);
    }, []);
    return (
        <Provider store={store}>
            <Core />
        </Provider>
    );
};

export default App;
