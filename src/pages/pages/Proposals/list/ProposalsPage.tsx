import React, { useEffect } from 'react';
import proposalLogo from 'assets/images/proposalDark.svg';
import { i18n } from 'utils';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from 'redux/store';

const ProposalsPage = (): JSX.Element => {
    const dispatch = useDispatch<Dispatch>();
    const proposals = useSelector((state: RootState) => state.proposals.proposals);

    useEffect(() => {
        dispatch.proposals.fetchProposals().finally(() => null);
    }, []);

    return (
        <h2 className="mt-3 mb-4">
            <img alt="proposal" src={proposalLogo} /> {i18n.t('proposals')}
        </h2>
    );
};

export default ProposalsPage;
