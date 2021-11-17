import React from 'react';
import { DelegatorsList } from 'components';
import { i18n } from 'utils';

const DelegatorsSubpage = (): JSX.Element => {
    return (
        <>
            <h2 className="mt-3 mb-4">{i18n.t('delegators')}</h2>
            <DelegatorsList delegators={[]} validatorTokens={15} />
        </>
    );
};

export default DelegatorsSubpage;
