import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Loading, Card } from 'frontend-elements';
import searchLogo from 'assets/images/searchDark.svg';
import { Dispatch, RootState } from 'redux/store';
import placeholderTx from 'assets/images/placeholderTx.svg';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationConstants } from 'constant';
import { i18n } from 'utils';

interface IProps extends RouteComponentProps<{ text: string }> {}

const SearchPage = (props: IProps): JSX.Element => {
    const dispatch = useDispatch<Dispatch>();
    const loading = useSelector((state: RootState) => state.loading.models.search);
    const data = useSelector((state: RootState) => state.search.data);
    const type = useSelector((state: RootState) => state.search.type);
    const searchText = useSelector((state: RootState) => state.search.searchText);

    const { text } = props.match.params;

    useEffect(() => {
        search();
    }, [searchText, text]);

    const search = () => {
        if (!text) {
            return;
        }

        dispatch.search.getSearch(text).then((res) => {
            if (!res) {
                return;
            }

            const { data, type } = res;
            const { history } = props;

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
    };

    const renderContent = (): JSX.Element | null => {
        if (loading) {
            return (
                <Card className="mb-5">
                    <Loading />
                </Card>
            );
        }

        if (!data || !type) {
            return (
                <Card className="mb-5 d-flex justify-content-center align-items-center flex-column">
                    <img className="mb-2 placeholder-image" alt="placeholder" src={placeholderTx} />
                    {i18n.t('noResultFound')}
                </Card>
            );
        }

        return null;
    };

    return (
        <>
            <h2 className="mt-3 mb-4">
                <img alt="block" src={searchLogo} /> {i18n.t('search')}
            </h2>
            {renderContent()}
        </>
    );
};

export default SearchPage;
