import React, { useEffect } from 'react';
import { DelegatorsList } from 'components';
import { i18n } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from 'redux/store';
import { RouteComponentProps } from 'react-router-dom';
import { Card, Loading } from 'frontend-elements';

interface IProps extends RouteComponentProps<{ id: string }> {}

const DelegatorsSubpage = ({ match }: IProps): JSX.Element => {
    const dispatch = useDispatch<Dispatch>();
    const validator = useSelector((state: RootState) => state.validators.validator);
    const loading = useSelector((state: RootState) => state.loading.models.validators);

    const { id } = match.params;

    useEffect(() => {
        dispatch.validators.getValidator(id).finally(() => null);
    }, []);

    const renderInformation = () => {
        if (!validator || loading) {
            return (
                <Card className="mb-5">
                    <Loading />
                </Card>
            );
        }

        const { delegations, tokens } = validator;

        return <DelegatorsList delegators={delegations} validatorTokens={parseFloat(tokens || '0')} />;
    };

    return (
        <>
            <h2 className="mt-3 mb-4">{i18n.t('delegators')}</h2>
            {renderInformation()}
        </>
    );
};

export default DelegatorsSubpage;
