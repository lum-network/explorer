import React from 'react';
import proposalLogo from 'assets/images/proposalDark.svg';
import { i18n } from 'utils';

const ProposalsPage = (): JSX.Element => {
    return (
        <h2 className="mt-3 mb-4">
            <img alt="proposal" src={proposalLogo} /> {i18n.t('proposals')}
        </h2>
    );
};

export default ProposalsPage;
