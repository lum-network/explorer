import React, { PureComponent } from 'react';
import { Button, Card } from 'components';
import './Wallet.scss';

class Wallet extends PureComponent {
    render(): JSX.Element {
        return (
            <Card withoutPadding className="h-100">
                <div className="p-3 py-4 p-sm-4 p-xl-5 wallet-background h-100">
                    <h3 className="wallet-title mb-2">Lum Wallet</h3>
                    <p className="mb-3">
                        Acces the Lum from the web
                        <br /> or from the Lumki app
                    </p>
                    <Button className="wallet-button" onPress={() => null}>
                        Access Lum wallet
                    </Button>
                </div>
            </Card>
        );
    }
}

export default Wallet;
