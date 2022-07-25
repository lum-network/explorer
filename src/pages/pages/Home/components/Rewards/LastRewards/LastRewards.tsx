import React from 'react';
import { Card, Table } from 'frontend-elements';
import { CoinModel } from 'models';
import { i18n, NumbersUtils } from 'utils';
import { trunc } from 'utils/utils/strings';
import { Link } from 'react-router-dom';
import { NavigationConstants } from 'constant';
import moment from 'moment';

const wallets: {
    address: string;
    reward: CoinModel;
    timestamp: number;
}[] = [
    { address: 'lum16hceakg4q4dxveygdxwz36wuwy7ak6xmc0yyt2', reward: { amount: '291291992', denom: 'ulum' }, timestamp: 1658400631 },
    { address: 'lum16hceakg4q4dxveygdxwz36wucsdinspionpse0', reward: { amount: '291291992', denom: 'ulum' }, timestamp: 1658400331 },
    { address: 'lum19cidsondsi92oincdso2incdosin0pcdsnp02i', reward: { amount: '291291992', denom: 'ulum' }, timestamp: 1658399631 },
    { address: 'lum02ecodsindsi0cdspindsins9cpsinsdkocdns9', reward: { amount: '291291992', denom: 'ulum' }, timestamp: 1658299931 },
    { address: 'lum80opcsdds19dspindscip92msdmdincsi92npc2', reward: { amount: '291291992', denom: 'ulum' }, timestamp: 1658200631 },
];

const LastRewards = (): JSX.Element => {
    const head = [i18n.t('wallet'), i18n.t('time'), i18n.t('amount')];

    const renderRow = (wallet: { address: string; reward: CoinModel; timestamp: number }, index: number, head: string[]) => {
        return (
            <tr key={index}>
                <td data-label={head[0]}>
                    <Link to={`${NavigationConstants.ACCOUNT}/${wallet.address}`}>{trunc(wallet.address)}</Link>
                </td>
                <td data-label={head[1]}>
                    <small>{moment.unix(wallet.timestamp).fromNow()}</small>
                </td>
                <td data-label={head[2]} className="text-end">
                    {NumbersUtils.formatNumber(wallet.reward)} lum
                </td>
            </tr>
        );
    };

    return (
        <Card className="last-rewards pt-4 pt-xl-5 pb-3" withoutPadding>
            <h1 className="px-3 px-xl-5 mb-4">{i18n.t('lastRewards')}</h1>
            <Table head={head}>{wallets.map((wallet, index) => renderRow(wallet, index, head))}</Table>
        </Card>
    );
};

export default LastRewards;
