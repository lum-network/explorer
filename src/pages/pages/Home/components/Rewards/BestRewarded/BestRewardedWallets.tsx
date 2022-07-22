import React from 'react';
import { Card } from 'frontend-elements';
import { CoinModel } from 'models';
import { i18n, NumbersUtils } from 'utils';
import { NavigationConstants } from 'constant';
import { Link } from 'react-router-dom';

import './BestRewardedWallets.scss';

const wallets: {
    address: string;
    reward: CoinModel;
}[] = [
    { address: 'lum16hceakg4q4dxveygdxwz36wuwy7ak6xmc0yyt2', reward: { amount: '291291992', denom: 'ulum' } },
    { address: 'lum16hceakg4q4dxveygdxwz36wucsdinspionpse0', reward: { amount: '291291992', denom: 'ulum' } },
    { address: 'lum02ecodsindsi0cdspindsins9cpsinsdkocdns9', reward: { amount: '291291992', denom: 'ulum' } },
    { address: 'lum19cidsondsi92oincdso2incdosin0pcdsnp02i', reward: { amount: '291291992', denom: 'ulum' } },
    { address: 'lum80opcsdds19dspindscip92msdmdincsi92npc2', reward: { amount: '291291992', denom: 'ulum' } },
];

const BestRewardedWallet = (): JSX.Element => {
    const renderRow = (wallet: { address: string; reward: CoinModel }, index: number) => {
        return (
            <div key={'best-rewarded-wallet-' + index} className={`d-flex flex-row align-items-center justify-content-between ${index < 4 ? 'mb-4' : ''}`}>
                <div className="d-flex flex-row align-items-center">
                    <div className="rank">{index + 1}</div>
                    <Link to={`${NavigationConstants.ACCOUNT}/${wallet.address}`}>{wallet.address}</Link>
                </div>
                <div className="reward">
                    {NumbersUtils.formatNumber(wallet.reward)} <span className="fw-normal">lum</span>
                </div>
            </div>
        );
    };

    return (
        <Card className="best-rewarded-wallets">
            <h1 className="mb-4">{i18n.t('bestRewardedWallet')}</h1>
            {wallets.map((wallet, index) => renderRow(wallet, index))}
        </Card>
    );
};

export default BestRewardedWallet;
