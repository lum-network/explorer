import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Card, Loading } from 'components';
import searchLogo from 'assets/images/searchDark.svg';
import { Dispatch, RootState } from 'redux/store';
import placeholderTx from 'assets/images/placeholderTx.svg';
import { connect } from 'react-redux';
import { NavigationConstants } from 'constant';
import { i18n } from '../../../utils';

interface IProps extends RouteComponentProps<{ text: string }> {}

const mapState = (state: RootState) => ({
    loading: state.loading.models.search,
    data: state.search.data,
    type: state.search.type,
    searchText: state.search.searchText,
});

const mapDispatch = (dispatch: Dispatch) => ({
    getSearch: (text: string) => dispatch.search.getSearch(text),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
type Props = IProps & StateProps & DispatchProps;

class SearchPage extends PureComponent<Props> {
    componentDidMount() {
        this.search();
    }

    componentDidUpdate() {
        const { searchText } = this.props;
        const { text } = this.props.match.params;

        if (searchText !== text) {
            this.search();
        }
    }

    search() {
        const { text } = this.props.match.params;
        const { getSearch } = this.props;

        if (!text) {
            return;
        }

        getSearch(text).then(() => {
            const { type, data, history } = this.props;

            switch (type) {
                case 'block':
                    history.replace(`${NavigationConstants.BLOCKS}/${data}`);
                    break;

                case 'transaction':
                    history.replace(`${NavigationConstants.TRANSACTIONS}/${data}`);
                    break;

                case 'account':
                    history.replace(`${NavigationConstants.ACCOUNT}/${data}`);
                    break;

                case 'validator':
                    history.replace(`${NavigationConstants.VALIDATORS}/${data}`);
            }
        });
    }

    renderContent(): JSX.Element | null {
        const { loading, data, type } = this.props;

        if (loading) {
            return (
                <Card className="mb-5">
                    <Loading />
                </Card>
            );
        }

        if (!data || !type) {
            return (
                <Card className="d-flex justify-content-center align-items-center flex-column">
                    <img className="mb-2 placeholder-image" alt="placeholder" src={placeholderTx} />
                    {i18n.t('noResultFound')}
                </Card>
            );
        }

        return null;
    }

    render(): JSX.Element {
        return (
            <>
                <h2 className="mt-3 mb-4">
                    <img alt="block" src={searchLogo} /> {i18n.t('search')}
                </h2>
                {this.renderContent()}
            </>
        );
    }
}

export default connect(mapState, mapDispatch)(SearchPage);
