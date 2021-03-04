import React, { PureComponent } from 'react';
import { TextInput } from 'design-components';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import searchLogo from 'assets/images/searchDark.svg';
import './Search.scss';
import { NavigationConstants } from 'constant';
import { i18n } from 'utils';

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

        if (!text) {
            return;
        }

        push(`${NavigationConstants.SEARCH}/${text}`);
    };

    render(): JSX.Element {
        const { text } = this.state;

        return (
            <div className="search-container">
                <TextInput
                    placeholder={i18n.t('searchPlaceholder')}
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
