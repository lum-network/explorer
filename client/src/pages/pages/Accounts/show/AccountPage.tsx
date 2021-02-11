import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps<{ id: string }> {}

type Props = IProps;

class AccountPage extends PureComponent<Props> {
    render(): JSX.Element {
        return <div>Account!</div>;
    }
}

export default AccountPage;
