import React, { PureComponent } from 'react';
import RootNavigator from 'navigation';

class Core extends PureComponent {
    render(): JSX.Element {
        return <RootNavigator />;
    }
}

export default Core;
