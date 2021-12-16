import 'frontend-elements/styles/main.scss';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import store, { persistor } from './redux/store';
import { AnalyticsUtils } from 'utils';
import Core from 'core';

const App = (): JSX.Element => {
    useEffect(() => {
        AnalyticsUtils.initialize().finally(() => null);
    }, []);
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Core />
            </PersistGate>
        </Provider>
    );
};

export default App;
