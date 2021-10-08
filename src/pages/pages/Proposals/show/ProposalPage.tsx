import React, { useEffect } from 'react';
import proposalLogo from 'assets/images/proposalDark.svg';
import { i18n, NumbersUtils } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from 'redux/store';
import { RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps<{ id: string }> {}

const ProposalPage = ({ match }: IProps): JSX.Element => {
    const proposal = useSelector((state: RootState) => state.governance.proposal);
    const dispatch = useDispatch<Dispatch>();
    const loading = useSelector((state: RootState) => state.loading.effects.governance.getProposal);

    const { id } = match.params;

    useEffect(() => {
        dispatch.governance.getProposal(id).finally(() => null);
    }, []);

    return (
        <h2 className="mt-3 mb-4">
            <img alt="proposal" src={proposalLogo} /> {i18n.t('proposal')} #{proposal?.proposalId || id}
        </h2>
    );
};

export default ProposalPage;
