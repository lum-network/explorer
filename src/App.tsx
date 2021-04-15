import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from './redux/store';
import Core from 'core';
import 'frontend-elements/styles/main.scss';

const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Core />
            </PersistGate>
        </Provider>
    );
};

export default App;
