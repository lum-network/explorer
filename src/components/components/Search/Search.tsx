import React, { useState } from 'react';
import { TextInput } from 'frontend-elements';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import searchLogo from 'assets/images/searchDark.svg';
import './Search.scss';
import { NavigationConstants } from 'constant';
import { i18n } from 'utils';

interface IProps extends RouteComponentProps {}

const Search = (props: IProps): JSX.Element => {
    const [text, setText] = useState('');

    const onChangeText = (text: string): void => {
        setText(text);
    };

    const onSubmit = (): void => {
        const { push } = props.history;

        if (!text) {
            return;
        }

        push(`${NavigationConstants.SEARCH}/${text}`);
    };

    return (
        <div className="search-container">
            <TextInput
                placeholder={i18n.t('searchPlaceholder')}
                icon={searchLogo}
                value={text}
                onSubmit={onSubmit}
                onChangeText={onChangeText}
            />
        </div>
    );
};

export default withRouter(Search);
