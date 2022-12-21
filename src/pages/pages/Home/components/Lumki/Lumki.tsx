import React from 'react';
import { Card } from 'frontend-elements';
import './Lumki.scss';
import { i18n } from 'utils';
import { NavigationConstants } from 'constant';
import skrLogo from 'assets/images/skrLogo.svg';

const Lumki = (): JSX.Element => {
    return (
        <Card withoutPadding className="h-100">
            <div className="p-3 py-4 p-sm-4 p-xl-5 d-flex justify-content-between h-100">
                <div>
                    <h3 className="wallet-title mb-2">{i18n.t('lumWallet')}</h3>
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: i18n.t('walletDescription') }} />
                    <a className="wallet-button app-btn app-btn-plain" href={NavigationConstants.LUMKI} target="_blank" rel="noreferrer">
                        {i18n.t('discover')}
                    </a>
                </div>
                <div className="lumki-phone-image">
                    <img src={skrLogo} alt="Skeepers Rewards" />
                </div>
            </div>
        </Card>
    );
};

export default Lumki;
