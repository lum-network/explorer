import React from 'react';
import { Card } from 'frontend-elements';
import './Lumki.scss';
import { i18n } from 'utils';
import { NavigationConstants } from 'constant';
import phoneEn from 'assets/images/Lumki_iphone_EN.png';
import backgroundEn from 'assets/images/lumkiBackgroundPhone.png';

const Lumki = (): JSX.Element => {
    return (
        <Card withoutPadding className="h-100">
            <img className="background-phone-version" src={backgroundEn} alt="Phone" />
            <div className="p-3 py-4 p-sm-4 p-xl-5 wallet-background h-100">
                <div className="lumki-phone-image">
                    <img src={phoneEn} alt="Phone" />
                </div>
                <h3 className="wallet-title mb-2">{i18n.t('lumWallet')}</h3>
                <p className="mb-3" dangerouslySetInnerHTML={{ __html: i18n.t('walletDescription') }} />
                <a
                    className="wallet-button app-btn app-btn-plain"
                    href={NavigationConstants.LUMKI}
                    target="_blank"
                    rel="noreferrer"
                >
                    {i18n.t('accessLumWallet')}
                </a>
            </div>
        </Card>
    );
};

export default Lumki;
