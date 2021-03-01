import React, { PureComponent } from 'react';
import { Card } from 'components';
import './Wallet.scss';
import { i18n } from 'utils';
import { NavigationConstants } from 'constant';

class Wallet extends PureComponent {
    render(): JSX.Element {
        return (
            <Card withoutPadding className="h-100">
                <div className="p-3 py-4 p-sm-4 p-xl-5 wallet-background h-100">
                    <h3 className="wallet-title mb-2">{i18n.t('lumWallet')}</h3>
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: i18n.t('walletDescription') }} />
                    <a
                        className="wallet-button app-btn app-btn-plain"
                        href={NavigationConstants.WALLET}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {i18n.t('accessLumWallet')}
                    </a>
                </div>
            </Card>
        );
    }
}

export default Wallet;
