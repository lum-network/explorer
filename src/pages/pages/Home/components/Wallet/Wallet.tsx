import React, { PureComponent } from 'react';
import { Button, Card } from 'components';
import './Wallet.scss';
import { i18n } from 'utils';

class Wallet extends PureComponent {
    render(): JSX.Element {
        return (
            <Card withoutPadding className="h-100">
                <div className="p-3 py-4 p-sm-4 p-xl-5 wallet-background h-100">
                    <h3 className="wallet-title mb-2">{i18n.t('lumWallet')}</h3>
                    <p className="mb-3" dangerouslySetInnerHTML={{ __html: i18n.t('walletDescription') }} />
                    <Button className="wallet-button" onPress={() => null}>
                        {i18n.t('accessLumWallet')}
                    </Button>
                </div>
            </Card>
        );
    }
}

export default Wallet;
