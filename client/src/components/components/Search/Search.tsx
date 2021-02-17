import React, { PureComponent } from 'react';
import { TextInput } from 'components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import searchLogo from 'assets/images/searchDark.svg';
import './Search.scss';
import { NavigationConstants } from 'constant';

interface IProps extends RouteComponentProps {}

interface IState {
    text: string;
}

class Search extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            text: '',
        };
    }

    onChangeText = (text: string): void => {
        this.setState({ text });
    };

    onSubmit = (): void => {
        const { push } = this.props.history;
        const { text } = this.state;

        push(`${NavigationConstants.SEARCH}/${text}`);
    };

    render(): JSX.Element {
        const { text } = this.state;

        return (
            <div className="search-container">
                <TextInput
                    placeholder="Search by address / height / tx hash / etc"
                    icon={searchLogo}
                    value={text}
                    onSubmit={this.onSubmit}
                    onChangeText={this.onChangeText}
                />
            </div>
        );
    }
}

export default withRouter(Search);
