import React from 'react';
import { Card, Table } from 'frontend-elements';
import { ChartDataModel } from 'models';
import { i18n, NumbersUtils } from 'utils';
import { trunc } from 'utils/utils/strings';
import { Link } from 'react-router-dom';
import { NavigationConstants } from 'constant';
//import moment from 'moment';

interface Props {
    data: ChartDataModel[];
}

const LastRewards = ({ data }: Props): JSX.Element | null => {
    const head = [i18n.t('wallet'), /* i18n.t('time'), */ i18n.t('amount')];

    const renderRow = (wallet: ChartDataModel, index: number, head: string[]) => {
        return (
            <tr key={index}>
                <td data-label={head[0]}>
                    <Link to={`${NavigationConstants.ACCOUNT}/${wallet.key}`}>{trunc(wallet.key)}</Link>
                </td>
                {/* <td data-label={head[1]}>
                    <small>{moment.unix(wallet.timestamp).fromNow()}</small>
                </td> */}
                <td data-label={head[2]} className="text-end">
                    {NumbersUtils.convertUnitNumber(wallet.value)} lum
                </td>
            </tr>
        );
    };

    return (
        <Card className="last-rewards pt-4 pt-xl-5 pb-3" withoutPadding>
            <h1 className="px-3 px-xl-5 mb-4">{i18n.t('lastRewards')}</h1>
            <Table head={head}>{data.map((wallet, index) => renderRow(wallet, index, head))}</Table>
        </Card>
    );
};

export default LastRewards;
