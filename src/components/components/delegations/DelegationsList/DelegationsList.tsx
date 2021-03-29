import React from 'react';
import { Card, Table } from 'frontend-elements';
import { Link } from 'react-router-dom';
import { DelegationsModel } from 'models';
import { i18n, StringsUtils } from 'utils';
import { NavigationConstants, NumberConstants } from 'constant';
import numeral from 'numeral';
import { RewardModel } from 'models/models/account';

interface IProps {
    delegations: DelegationsModel[];
    rewards: RewardModel[];
    title?: boolean;
}

const DelegationsList = (props: IProps): JSX.Element => {
    const getReward = (validatorAddress?: string): number => {
        const { rewards } = props;

        if (!validatorAddress) {
            return 0;
        }

        console.log(rewards);

        const result = rewards.find((reward) => reward.validatorAddress === validatorAddress);

        console.log(result);

        if (!result || !result.reward || !result.reward.length) {
            return 0;
        }

        return parseFloat(result.reward[0].amount || '0') / NumberConstants.CLIENT_PRECISION;
    };

    const renderRow = (delegation: DelegationsModel, index: number, head: string[]) => {
        return (
            <tr key={index}>
                <td data-label={head[0]}>
                    <Link
                        title={delegation.delegation.delegatorAddress}
                        to={`${NavigationConstants.VALIDATORS}/${delegation.delegation.validatorAddress}`}
                    >
                        {StringsUtils.trunc(delegation.delegation.validatorAddress || '', 10)}
                    </Link>
                </td>
                <td data-lable={head[1]}>
                    {numeral(parseFloat(delegation.delegation.shares || '0') / NumberConstants.CLIENT_PRECISION).format(
                        '0,0.00',
                    )}
                    <span className="ms-1 color-type">LUM</span>
                </td>
                <td data-label={head[2]} className="text-end">
                    {numeral(getReward(delegation.delegation.validatorAddress)).format('0,0.000000')}
                    <span className="ms-1 color-type">LUM</span>
                </td>
            </tr>
        );
    };

    const { delegations, title } = props;
    const head = [i18n.t('validatorAddress'), i18n.t('amount'), i18n.t('reward')];

    return (
        <Card withoutPadding className="mb-5 h-100">
            <div className="d-flex justify-content-between">
                {title && <h3 className="mx-xl-5 mt-xl-5 mb-xl-2 mx-3 mt-3">{i18n.t('delegations')}</h3>}
            </div>
            <Table head={head}>{delegations.map((delegation, index) => renderRow(delegation, index, head))}</Table>
        </Card>
    );
};

export default DelegationsList;
