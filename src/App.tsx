import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import store, { persistor } from './redux/store';
import Core from 'core';
import 'design-components/styles/main.scss';

class App extends PureComponent {
    render(): JSX.Element {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Core />
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
